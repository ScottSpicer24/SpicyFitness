import { Text, TextInput, View, Pressable, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import * as EmailValidator from 'email-validator'
import { signUp } from 'aws-amplify/auth';
import { styles } from '../Styles';


type SignUpParameters = {
    name: string;
    password: string;
    email: string;
    phone_number: string;
  };

const Register = ({ navigation } : any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');
  
    const validateData = (nm: string, em:string, pn:string, pw:string, cp:string) => {
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
            handleSignUp({name: nm, password: pw, email: em, phone_number: pn})
            console.log("sent to handleSignUp")
        } 
    }

    const handleSignUp = async ({ name, password, email, phone_number}: SignUpParameters) => {
        try{
            const { isSignUpComplete, userId, nextStep} = await signUp({
                username : email,
                password : password,
                options : {
                    userAttributes: {
                        email : email,
                        phone_number : "+" + phone_number,
                        name : name 
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
        catch (error : any) {
            // Check if error message is available
            const errorMessage = error.message || 'An error occurred during sign up';

            Alert.alert('Error', errorMessage, [{ text: 'Close', onPress: () => console.log('Cancel Pressed') }]);
            console.log('error signing up:', error);
        }
    }

    return (
    <View style={styles.container}>
        <View style={styles.form}>
            <Text>Name</Text>
            <TextInput style={styles.textIn} placeholder='Name' onChangeText={(input: string) => setName(input)} value={name} />
            
            <Text>Email</Text>
            <TextInput style={styles.textIn} placeholder='Email' onChangeText={(input: string) => setEmail(input)} value={email} />
            
            <Text>Phone Number</Text>
            <TextInput style={styles.textIn} placeholder='Phone Number' onChangeText={(input: string) => setPhoneNum(input)} value={phoneNum} />

            <Text>Password</Text>
            <TextInput style={styles.textIn} secureTextEntry={true} placeholder='Password' onChangeText={(input: string) => setPassword(input)} value={password} />
            
            <Text>Confirm Password</Text>
            <TextInput style={styles.textIn} secureTextEntry={true} placeholder='Confirm' onChangeText={(input: string) => setConfirmPassword(input)} value={confirmPassword} />
            
            <Pressable style={styles.button} onPress={() => {validateData(name, email, phoneNum, password, confirmPassword)}}>
                <Text style={styles.text}>Register</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default Register