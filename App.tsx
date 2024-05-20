import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, getCurrentUser} from 'aws-amplify/auth';
import config from './src/amplifyconfiguration.json';
import Login from './app/Login';
import Register from './app/Register';
import Confirm from './app/Confirm';
import ForgotPW from './app/ForgotPW';
import Home from './app/Home'; // Make sure to create and import your Home component

Amplify.configure(config);

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="Confirm" component={Confirm} initialParams={{ email: 'scott@email.com' }} />
    <AuthStack.Screen name="ForgotPW" component={ForgotPW} />
  </AuthStack.Navigator>
);

const MainNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={Home} />
    {/* Add other main app screens here */}
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
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}



