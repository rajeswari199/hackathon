import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, AsyncStorage } from "react-native";
import { StatusBar } from "expo-status-bar";
import Amplify from "@aws-amplify/core";
import { Authenticator } from "aws-amplify-react-native";
import awsmobile from "../src/aws-exports";
import AmplifyTheme from "../components/AmplifyTheme";
import { PermissionsAndroid } from "react-native";
import BackgroundJob from "react-native-background-job";
import SmsListener from "react-native-android-sms-listener";
import Auth from "@aws-amplify/auth";
import {
  selectTransactionList,
  sendSmsData,
  registerUser,
  setErrorMessage,
  selectErrorMessage,
} from "../slice/LoginScreen.slice";

Amplify.configure({
  ...awsmobile,
  Analytics: {
    disabled: true,
  },
});

async function requestReadSmsPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: "Auto Verification OTP",
        message: "need access to read sms, to verify OTP",
      }
    );
    const receiveGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      {
        title: "Auto Verification OTP",
        message: "need access to read sms, to verify OTP",
      }
    );
    if (
      granted === PermissionsAndroid.RESULTS.GRANTED &&
      receiveGranted === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("sms read permissions granted", granted);
    } else {
      console.log("sms read permissions denied", granted);
    }
  } catch (err) {
    console.warn(err);
  }
}

const LoginScreen = ({ navigation }) => {
  const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
      {
        label: "Email",
        key: "email",
        required: true,
        displayOrder: 1,
        type: "string",
      },
      {
        label: "Password",
        key: "password",
        required: true,
        displayOrder: 2,
        type: "password",
      },
    ],
  };
  const dispatch = useDispatch();
  const [signInState, setSignInState] = useState("");
  const [permissionStatus, setPermissionStatus] = useState("");

  const checkPerm = async () => {
    const permission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );
    setPermissionStatus(permission);
    console.log("permissionStatus", permissionStatus);
  };

  useEffect(() => {
    if (signInState === "signedIn") {
      const getUserDetails = async () => {
        console.log("signedIn registration process");
        const user = await Auth.currentAuthenticatedUser();
        try {
          await AsyncStorage.setItem(
            "userDetails",
            JSON.stringify({
              userPoolId: user.attributes.sub,
              email: user.attributes.email,
            })
          );
          dispatch(registerUser(() => navigation.navigate("Home")));
        } catch (error) {
          console.error("error here", error);
        }
      };
      getUserDetails();
    }
  }, [signInState]);

  useEffect(() => {
    if (signInState === "signedUp" && !permissionStatus) {
      console.log("if signedup ask for permission");
      const fetchData = async () => {
        await requestReadSmsPermission();
        checkPerm();
      };
      fetchData().catch(console.error);
    }

    if (signInState === "signedUp" && permissionStatus) {
      let subscription;

      const backgroundJob = {
        jobKey: "myJob",
        job: () => {
          console.log("inside registered", subscription, !!subscription);
          if (!subscription) {
            subscription = SmsListener.addListener((event) => {
              dispatch(sendSmsData(event));
              console.log("message", event);
            });
          }
        },
      };

      BackgroundJob.register(backgroundJob);

      const backgroundSchedule = {
        jobKey: "myJob",
        period: 2000,
        allowExecutionInForeground: true,
      };

      BackgroundJob.schedule(backgroundSchedule)
        .then((data) => console.log("Success", data))
        .catch((err) => console.err(err));
    }
  }, [signInState, permissionStatus]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Authenticator
        onStateChange={(authState) => {
          console.log("state", authState);
          if (authState) {
            setSignInState(authState);
          }
        }}
        usernameAttributes="email"
        signUpConfig={signUpConfig}
        theme={AmplifyTheme}
      />
    </>
  );
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
