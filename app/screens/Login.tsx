import { Button, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState }  from 'react'
import { signIn, signOut } from 'aws-amplify/auth';
import { handleSignOut } from '../functions/AuthFunctions';
import { styles } from '../Styles';

type SigninParameters = {
    user: string,
    password: string
  };

const Login = ({ navigation } : any) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSignIn = async ({ user, password } : SigninParameters) => {
        try {
            const { isSignedIn, nextStep } = await signIn({ 
                username: user, 
                password: password,
                options: {
                    authFlowType : 'USER_PASSWORD_AUTH'
                }
            });
            console.log(isSignedIn)
            console.log(nextStep)  ////

            if(nextStep.signInStep === 'CONFIRM_SIGN_UP'){
                navigation.navigate('Confirm', {email: user, password : password}) 
            }
        } 
        catch (error : any) {
          // Check if error message is available
          const errorMessage = error.message || 'An error occurred during sign in';

          Alert.alert('Error', errorMessage, [{ text: 'Close', onPress: () => console.log('Cancel Pressed') }]);
          console.log('error signing up:', error);
      }
    }

    return (
    <View style = {styles.container}>
        <View style={styles.form}>
            <Text>Email</Text>
            <TextInput style={styles.textIn} placeholder='Email' onChangeText={(input: string) => setUser(input)} value={user} />
            
            <Text>Password</Text>
            <TextInput style={styles.textIn} secureTextEntry={true} placeholder='Password' onChangeText={(input: string) => setPassword(input)} value={password} />

            <Pressable style={styles.button} onPress={() => handleSignIn( {user, password} )}>
                <Text style={styles.text}>Login</Text>
            </Pressable>
            
            <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.text}>Register</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => navigation.navigate('ForgotPW')}>
                <Text style={styles.text}>Forgot Password</Text>
            </Pressable>

            <Button title="signout" onPress={() => handleSignOut()} />
        </View>
    </View>
  )
}

export default Login