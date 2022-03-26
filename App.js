import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// pages
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen';
import AllTransactions from './screens/AllTransactions'

import { COLORS } from './assets/constants';

const Stack = createStackNavigator();

export default function App() {
  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: COLORS.mainOpacityColor,
      opacity: 0.8,
    },
    headerTintColor: COLORS.secondaryColor,
  };
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <Stack.Navigator screenOptions={globalScreenOptions}>
        {/* HOME */}
        <Stack.Screen name='Home' component={HomeScreen} />

        {/* LOGIN */}
        <Stack.Screen name='Login' component={LoginScreen} />

        {/* ALL TRANSACTIONS */}
        <Stack.Screen name='All' component={AllTransactions} />
      </Stack.Navigator >
    </NavigationContainer >
  );
}
