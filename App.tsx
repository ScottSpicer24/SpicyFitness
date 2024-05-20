import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/Login';
import Register from './app/Register';
import { Amplify } from 'aws-amplify';
import config from './src/amplifyconfiguration.json';
import Confirm from './app/Confirm';
import ForgotPW from './app/ForgotPW';
Amplify.configure(config);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Confirm" component={Confirm} initialParams={{email : 'scott@email.com'}} />
          <Stack.Screen name="ForgotPW" component={ForgotPW} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


