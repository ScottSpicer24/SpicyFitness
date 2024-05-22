import React, { useState, useEffect, useContext, createContext, Children } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
  </MainStack.Navigator>
);

export const updateAuthStatus = async () => {
    const isUserAuth = useContext(AuthContext)
    
    try {
        await fetchAuthSession();
        isUserAuth.setIsAuthenticated(true);
    } 
    catch {
      isUserAuth.setIsAuthenticated(false);
    }

    return isUserAuth.isAuthenticated
};

export default function App() {
  const isUserAuthenticated = useContext(AuthContext)

  useEffect(() => {
    updateAuthStatus();
    console.log(isUserAuthenticated)
  })

  return (
    <AuthContext.Provider value={isUserAuthenticated}>
        <NavigationContainer>
          {isUserAuthenticated.isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    </AuthContext.Provider>
    
  )
}



/*
const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}


/*
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
*/
