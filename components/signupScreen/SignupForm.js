import { useNavigation } from '@react-navigation/native';
import validator from 'email-validator';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { auth, db } from '../../firebase';

const SignupValidationSchema = Yup.object().shape({
  //! En az 2 karakter olması lazım. olmazsa yanına yazdığımız mesajı
  email: Yup.string().email('Invalid Email').required('Email is required'),
  username: Yup.string().min(2, 'Username must be at least 2 characters').required('Username is required'),
  password: Yup.string().required('No password provided').min(8, 'Password is too short - should be 8 chars minimum')
});

const SignupForm = () => {
  const navigation = useNavigation();

  const getRandomProfilePicture = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignup = async (email, username, password) => {
    const displayName = username;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(auth, { displayName: displayName });
      // console.log('Firebase Signup Successful', email, password);

      //! kullanıcı id'si olarak user email'ini kullanmak için bu şekilde kaydediyoruz.
      await setDoc(doc(db, 'users', user.user.email), {
        owner_uid: user.user.uid,
        username: displayName,
        email: user.user.email,
        profile_picture: await getRandomProfilePicture()
      });
    } catch (error) {
      Alert.alert('Dear Client...', error.message);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', username: '', password: '' }}
      onSubmit={values => onSignup(values.email, values.username, values.password)}
      //! Yup ile hazırladığımız validationu buraya gönderiyoruz.
      validationSchema={SignupValidationSchema}
      validateOnMount={true}
    >
      {({
        //!Parametre olarak tanımladığımız (values) değişkenleri TextField içerisinde value değişkenlerine atıyoruz.
        values,
        handleChange,
        //! handleSubmit önce burada, daha sonra Formik içerisinde tanımlıyoruz. Müteakiben fonksiyonu yukarıda oluşturuyoruz.
        handleSubmit,
        //! touched and errors and handleBlur--> validation hatasını almak için eklememiz gerekiyor.
        isValid,
        //! handleBlur --> focustan yani inputtan çıktığımızda blur oluyor.
        handleBlur
      }) => (
        <View style={styles.wrapper}>
          <View
            style={[
              styles.inputField,
              {
                borderColor: values.email.length < 1 || validator.validate(values.email) ? '#ccc' : 'red'
              }
            ]}
          >
            <TextInput placeholder='Email' placeholderTextColor='#444' autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress' autoFocus={true} onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
          </View>
          <View
            style={[
              styles.inputField,
              {
                borderColor: values.username.length < 1 || values.username.length > 2 ? '#ccc' : 'red'
              }
            ]}
          >
            <TextInput placeholder='Username' placeholderTextColor='#444' autoCapitalize='none' textContentType='username' autoFocus={true} onChangeText={handleChange('username')} onBlur={handleBlur('username')} value={values.username} />
          </View>
          <View
            style={[
              styles.inputField,
              {
                borderColor: 1 > values.password.length || values.password.length >= 8 ? '#ccc' : 'red'
              }
            ]}
          >
            <TextInput placeholder='Password' placeholderTextColor='#444' autoCapitalize='none' secureTextEntry={true} textContentType='password' autoCorrect={false} onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
          </View>
          <View style={{ alignItems: 'flex-end', marginBottom: 30 }}></View>
          <Pressable titleSize={20} style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: '#6BB0F5' }}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1
  },
  button: isValid => ({
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4
  }),
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50
  }
});

export default SignupForm;
