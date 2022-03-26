import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { configureStore } from "@reduxjs/toolkit";

// pages
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AllTransactions from './screens/AllTransactions'
import ReportsScreen from './screens/ReportsScreen'

import { COLORS } from './assets/constants';
import { ROUTES } from './utils/constants';

import { reducer } from "./reducer";

const Stack = createStackNavigator();

export const store = configureStore({
  reducer: reducer(),
});

export default function App() {
  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: COLORS.mainOpacityColor,
      opacity: 0.8,
    },
    headerTintColor: COLORS.secondaryColor,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={globalScreenOptions}>
          {/* LOGIN */}
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* HOME */}
          <Stack.Screen name="Home" component={HomeScreen} />

          {/* ALL TRANSACTIONS */}
          <Stack.Screen name="All" component={AllTransactions} />

          {/* REPORTS */}
          <Stack.Screen name={ROUTES.reports} component={ReportsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
