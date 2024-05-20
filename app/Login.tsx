import { Button, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState }  from 'react'
import { signIn, signOut } from 'aws-amplify/auth';
import { handleSignOut } from './functions/AuthFunctions';

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

const styles = StyleSheet.create({
    container: { // style={styles.container}
        marginHorizontal : 20, 
      },
      form: { // style={styles.form}
        marginVertical: 20,
        flexDirection : 'column',
        alignItems: 'center',
      },
      textIn: { //style={styles.textIn}
        height: 40,
        width: 200,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginBottom: 15,
        marginTop: 3,
        backgroundColor: '#fff'
      },
      button: { // style={styles.button}
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        margin: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
      },
      text: { // style={styles.text}
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      }

  });