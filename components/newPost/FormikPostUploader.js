import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url';
import * as Yup from 'yup';

const PLACEHOLDER_IMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0mPJIxvYiTXwFhUEUFkvHrM3ZT9ywgh32v7pUwKNQYguUXUdHXczKjLgr_HxHv8kcANQ&usqp=CAU';

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached the maximum length of 2200 characters')
});

const FormikPostUploader = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const navigation = useNavigation();

  return (
    <Formik initialValues={{ caption: '', imageUrl: '' }} onSubmit={values => navigation.goBack()} validationSchema={uploadPostSchema} validateOnMount={true}>
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
