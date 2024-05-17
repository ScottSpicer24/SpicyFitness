import { Button, StyleSheet, Text, TextInput, View, Pressable, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import * as EmailValidator from 'email-validator'
import { autoSignIn, confirmSignUp, signUp } from 'aws-amplify/auth';


type SignUpParameters = {
    password: string;
    email: string;
    phone_number: string;
  };

const Register = ({ navigation } : any) => {
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');
  
    const test = (em:string, pn:string, pw:string, cp:string) => {
        let isError = false
        
        const validEmail = EmailValidator.validate(em);
        if(validEmail === false){
            setEmail('')
            isError = true
            Alert.alert('Error', 'Email is invalid.', [{text: 'Close', onPress: () => console.log('Cancel Pressed')}])
        }

        const regex = /^\d{10}$/
        const validPN = regex.test(pn);
        if(validPN === false){
            setPhoneNum('')
            isError = true
            Alert.alert('Error', 'Phone Number is invalid.', [{text: 'Close', onPress: () => console.log('Cancel Pressed')}])
        }
        const pwMatch = pw === cp
        if(pwMatch === false){
            setPassword('')
            setConfirmPassword('')
            isError = true
            Alert.alert('Error', 'Passwords do not match.', [{text: 'Close', onPress: () => console.log('Cancel Pressed')}])
        }

        console.log("error: ", isError)
        if(isError === false){
            // register user in the AWS pool using the aws-amplify/auth module.
            handleSignUp({password: pw, email: em, phone_number: pn})
            console.log("sent to handleSignUp")
        } 
    }

    const handleSignUp = async ({ password, email, phone_number}: SignUpParameters) => {
        try{
            const { isSignUpComplete, userId, nextStep} = await signUp({
                username : email,
                password : password,
                options : {
                    userAttributes: {
                        email : email,
                        phone_number : "+" + phone_number
                    },
                    autoSignIn: true
                }
            });

            console.log(isSignUpComplete)
            console.log(userId)
            console.log(nextStep)

            if(nextStep.signUpStep === 'CONFIRM_SIGN_UP'){
                navigation.navigate('Confirm', {email: email, password : password}) 
            }
            
        }
        catch (error) {
            Alert.alert('Error', 'Please make sure password is of length 8, has an uppercase and a lowercase letter, as well as a number.', [{text: 'Close', onPress: () => console.log('Cancel Pressed')}])
            console.log('error signing up:', error);
        }
    }

    return (
    <View style={styles.container}>
        <View style={styles.form}>
            <Text>Email</Text>
            <TextInput style={styles.textIn} placeholder='Email' onChangeText={(input: string) => setEmail(input)} value={email} />
            
            <Text>Phone Number</Text>
            <TextInput style={styles.textIn} placeholder='Phone Number' onChangeText={(input: string) => setPhoneNum(input)} value={phoneNum} />
            
            <Text>Password</Text>
            <TextInput style={styles.textIn} secureTextEntry={true} placeholder='Password' onChangeText={(input: string) => setPassword(input)} value={password} />
            
            <Text>Confirm Password</Text>
            <TextInput style={styles.textIn} secureTextEntry={true} placeholder='Confirm' onChangeText={(input: string) => setConfirmPassword(input)} value={confirmPassword} />
            
            <Pressable style={styles.button} onPress={() => {test(email, phoneNum, password, confirmPassword)}}>
                <Text style={styles.text}>Register</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default Register

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
        margin: 40,
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
})