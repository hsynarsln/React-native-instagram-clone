import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LoginForm from '../components/loginScreen/LoginForm';

const INSTAGRAM_LOGO = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhQQjU1qfX7aVH4FNAJpBHfGkzgPWs83DpeQ&usqp=CAU';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: INSTAGRAM_LOGO, height: 100, width: 100 }} />
      </View>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingHorizontal: 12
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60
  }
});

export default LoginScreen;
