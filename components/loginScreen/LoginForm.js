import { useNavigation } from '@react-navigation/native';
import validator from 'email-validator';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { auth } from '../../firebase';

const LoginValidationSchema = Yup.object().shape({
  //! En az 2 karakter olması lazım. olmazsa yanına yazdığımız mesajı
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('No password provided').min(8, 'Password is too short - should be 8 chars minimum')
});

const LoginForm = () => {
  const navigation = useNavigation();

  const onLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Firebase Login Successful', email, password);
    } catch (error) {
      Alert.alert('Dear Client...', error.message + '\n\n ... What do you want to do?', [
        {
          text: 'OK',
          onPress: () => console.log('OK'),
          style: 'cancel'
        },
        {
          text: 'Sign Up',
          onPress: () => navigation.push('SignupScreen')
        }
      ]);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={values => onLogin(values.email, values.password)}
      //! Yup ile hazırladığımız validationu buraya gönderiyoruz.
      validationSchema={LoginValidationSchema}
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
            <TextInput placeholder='Phone number, username, or email' placeholderTextColor='#444' autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress' autoFocus={true} onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
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
          <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
            <Text style={{ color: '#6BB0F5' }}>Forgot Password?</Text>
          </View>
          <Pressable titleSize={20} style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
              <Text style={{ color: '#6BB0F5' }}> Sign Up</Text>
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

export default LoginForm;
