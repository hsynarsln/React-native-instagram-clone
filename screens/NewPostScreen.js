import React from 'react';
import { SafeAreaView } from 'react-native';
import AddNewPost from '../components/newPost/AddNewPost';

const NewPostScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30 }}>
      <AddNewPost />
    </SafeAreaView>
  );
};

export default NewPostScreen;
