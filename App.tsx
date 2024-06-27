import React, { useState, useEffect, useContext, createContext, Children } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Amplify } from 'aws-amplify';
import { fetchAuthSession, getCurrentUser} from 'aws-amplify/auth';
import config from './src/amplifyconfiguration.json';
import { AuthContext } from './app/context/AuthContext';

import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Confirm from './app/screens/Confirm';
import ForgotPW from './app/screens/ForgotPW';
import Home from './app/screens/Home'; 
import Weight from './app/screens/Weight';
import Splits from './app/screens/Splits';
import Workout from './app/screens/Workout';

Amplify.configure(config);

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF6EB'
    //background: 'white'
  },
};

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="Confirm" component={Confirm} initialParams={{ email: 'scott@email.com' }} />
    <AuthStack.Screen name="ForgotPW" component={ForgotPW} />
  </AuthStack.Navigator>
);

const MainNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#83B4FF' } }}>
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen name="Weight" component={Weight} />
    <MainStack.Screen name="Splits" component={Splits} />
    <MainStack.Screen name="Workout" component={Workout} />
  </MainStack.Navigator>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        //const { tokens, credentials, identityId, userSub } = await fetchAuthSession();
        await fetchAuthSession();
        
        const { username, signInDetails } = await getCurrentUser();
        console.log(username);
        console.log(signInDetails);
        
        setIsAuthenticated(true);
      } 
      catch {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

