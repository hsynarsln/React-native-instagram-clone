import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NewPostScreen from './screens/NewPostScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false
};

const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOptions}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='SignupScreen' component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SignedInStack;
