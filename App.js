import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// pages
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AllTransactions from './screens/AllTransactions'
import ReportsScreen from './screens/ReportsScreen'

import { COLORS } from './assets/constants';
import { ROUTES } from './utils/constants';

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
        {/* LOGIN */}
        <Stack.Screen name={ROUTES.login} component={LoginScreen} />

        {/* HOME */}
        <Stack.Screen name={ROUTES.home} component={HomeScreen} />

        {/* ALL TRANSACTIONS */}
        <Stack.Screen name={ROUTES.allTransactions} component={AllTransactions} />

        {/* REPORTS */}
        <Stack.Screen name={ROUTES.reports} component={ReportsScreen} />
      </Stack.Navigator >
    </NavigationContainer >
  );
}
