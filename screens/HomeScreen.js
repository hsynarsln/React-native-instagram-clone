import { collection, collectionGroup, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import BottomTabs from '../components/home/BottomTabs';
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import Stories from '../components/home/Stories';
import { auth, db } from '../firebase';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [currentProfilePic, setCurrentProfilePic] = useState(null);
  const bottomTabIcons = [
    {
      name: 'Home',
      active: 'https://img.icons8.com/material/144/ffffff/home--v2.png',
      inactive: 'https://img.icons8.com/material-outlined/48/ffffff/home--v2.png'
    },
    {
      name: 'Search',
      active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
      inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png'
    },
    {
      name: 'Reels',
      active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
      inactive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png'
    },
    {
      name: 'Shop',
      active: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/shop-two.png',
      inactive: 'https://img.icons8.com/windows/48/ffffff/shop-two.png'
    },
    {
      name: 'Profile',
      active: `${currentProfilePic}`,
      inactive: `${currentProfilePic}`
    }
  ];
  // console.log(currentProfilePic);

  const getUserName = async () => {
    const user = auth.currentUser;
    const q = query(collection(db, 'users'), where('owner_uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      setCurrentProfilePic(doc.data().profile_picture);
    });
  };

  useEffect(() => {
    const q = query(collectionGroup(db, 'posts'), orderBy('createdAt', 'desc'));
    onSnapshot(q, querySnapshot => {
      setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    getUserName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <ScrollView>
        {posts?.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
  }
});

export default HomeScreen;
