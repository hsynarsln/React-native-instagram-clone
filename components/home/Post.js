import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements/dist';
import { auth, db } from '../../firebase';

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/ios/60/ffffff/like--v1.png',
    likedImageUrl: 'https://img.icons8.com/fluency/48/ffffff/filled-like.png'
    // likedImageUrl: 'https://img.icons8.com/color/60/fa314a/filled-like.png',
  },
  {
    name: 'Comment',
    imageUrl: 'https://img.icons8.com/ios/60/ffffff/speech-bubble--v1.png'
  },
  {
    name: 'Share',
    imageUrl: 'https://img.icons8.com/material-outlined/60/ffffff/gps-device.png'
  },
  {
    name: 'Save',
    imageUrl: 'https://img.icons8.com/external-bearicons-detailed-outline-bearicons/60/ffffff/external-Save-social-media-bearicons-detailed-outline-bearicons.png'
  }
];

const Post = ({ post }) => {
  const handleLike = async post => {
    const currentLikeStatus = !post.likes_by_users.includes(auth.currentUser.email);
    const userRef = doc(db, 'users', post.owner_email);
    const postRef = doc(userRef, 'posts', post.id);
    await updateDoc(postRef, {
      likes_by_users: currentLikeStatus ? arrayUnion(auth.currentUser.email) : arrayRemove(auth.currentUser.email)
    });
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: post.profile_picture }} style={styles.story} />
        <Text style={{ color: 'white', marginLeft: 5, fontWeight: '900' }}>{post.username}</Text>
      </View>
      <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
    </View>
  );
};

const PostImage = ({ post }) => {
  return (
    <View style={{ width: '100%', height: 300 }}>
      <Image source={{ uri: post.imageUrl }} style={{ height: '100%', resizeMode: 'cover' }} />
    </View>
  );
};

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: 'row' }}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image style={styles.footerIcon} source={{ uri: post.likes_by_users.includes(auth.currentUser.email) ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl }} />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={postFooterIcons[2].imageUrl} />
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image source={{ uri: imgUrl }} style={imgStyle} />
  </TouchableOpacity>
);

const Likes = ({ post }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>{post.likes_by_users.length.toLocaleString('en')} likes</Text>
    </View>
  );
};

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
      <Text style={{ color: '#fff' }}>
        <Text style={{ fontWeight: 'bold' }}>{post.username}</Text>
        <Text> {post.caption}</Text>
      </Text>
    </View>
  );
};

const CommentsSection = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
      {!!post.comments.length && (
        <Text style={{ color: 'gray' }}>
          View{post.comments.length > 1 ? ' all' : ''} {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
        </Text>
      )}
    </View>
  );
};

const Comments = ({ post }) => {
  return (
    <>
      {post.comments.map((comment, index) => (
        <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={{ color: '#fff' }}>
            <Text style={{ fontWeight: 'bold' }}>{comment.user}</Text> {comment.comment}
          </Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 11,
    borderWidth: 3,
    borderColor: 'orange'
  },
  footerIcon: {
    width: 33,
    height: 33
  },
  shareIcon: {
    transform: [{ rotate: '40deg' }],
    marginTop: -2
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between'
  }
});

export default Post;
