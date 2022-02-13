import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import BottomTabs from '../components/home/BottomTabs';
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import Stories from '../components/home/Stories';
import { POSTS } from '../data/posts';

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
    active: 'https://randomuser.me/api/portraits/men/68.jpg',
    inactive: 'https://randomuser.me/api/portraits/men/68.jpg'
  }
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <ScrollView>
        {POSTS?.map((post, index) => (
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
