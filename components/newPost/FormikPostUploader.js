import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url';
import * as Yup from 'yup';
import { auth, db } from '../../firebase';

const PLACEHOLDER_IMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0mPJIxvYiTXwFhUEUFkvHrM3ZT9ywgh32v7pUwKNQYguUXUdHXczKjLgr_HxHv8kcANQ&usqp=CAU';

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached the maximum length of 2200 characters')
});

const FormikPostUploader = () => {
  const navigation = useNavigation();
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const getUserName = async () => {
    const user = auth.currentUser;
    const q = query(collection(db, 'users'), where('owner_uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      setCurrentLoggedInUser({
        username: doc.data().username,
        profilePicture: doc.data().profile_picture
      });
    });
  };

  useEffect(() => {
    getUserName();
  }, []);

  const uploadPostToFire = async (imageUrl, caption) => {
    const newPostRef = doc(db, 'users', auth.currentUser.email);
    await addDoc(collection(newPostRef, 'posts'), {
      imageUrl: imageUrl,
      username: currentLoggedInUser.username,
      profile_picture: currentLoggedInUser.profilePicture,
      owner_uid: auth.currentUser.uid,
      owner_email: auth.currentUser.email,
      caption: caption,
      createdAt: serverTimestamp(),
      likes_by_users: [],
      comments: []
    }).then(() => navigation.goBack());
  };

  return (
    <Formik initialValues={{ caption: '', imageUrl: '' }} onSubmit={values => uploadPostToFire(values.imageUrl, values.caption)} validationSchema={uploadPostSchema} validateOnMount={true}>
      {({ values, handleChange, handleSubmit, isValid, errors, handleBlur }) => (
        <>
          <View style={{ margin: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
            <Image source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }} style={{ width: 100, height: 100 }} />
            <View style={{ flex: 1, marginLeft: 20 }}>
              <TextInput style={{ color: '#fff', fontSize: 20 }} value={values.caption} onChangeText={handleChange('caption')} onBlur={handleBlur('caption')} placeholder='Write a caption...' placeholderTextColor='gray' multiline={true} />
            </View>
          </View>
          <Divider width={0.2} orientation='vertical' />
          <TextInput onChange={e => setThumbnailUrl(e.nativeEvent.text)} style={{ color: '#fff', fontSize: 18 }} placeholder='Enter Image Url' placeholderTextColor='gray' value={values.imageUrl} onChangeText={handleChange('imageUrl')} onBlur={handleBlur('imageUrl')} />
          {errors.imageUrl && <Text style={{ fontSize: 10, color: 'red' }}>{errors.imageUrl}</Text>}
          <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
