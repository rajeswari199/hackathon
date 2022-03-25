import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Amplify from '@aws-amplify/core';
import { Authenticator } from 'aws-amplify-react-native';
import awsmobile from '../src/aws-exports';
import AmplifyTheme from '../components/AmplifyTheme'

Amplify.configure({
  ...awsmobile,
  Analytics: {
    disabled: true,
  },
})

const LoginScreen = ({ navigation }) => {
  const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password',
      },
    ],
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Authenticator onStateChange={(authState) => { if (authState === 'signedIn') navigation.navigate('Home') }} usernameAttributes="email" signUpConfig={signUpConfig} theme={AmplifyTheme} />
    </>
  )
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
});
