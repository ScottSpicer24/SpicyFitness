import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const Register = ({ navigation } : any) => {
  const [email, setEmail] = useState('')
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');
  
    const test = (em:string, pn:string, pw:string, cp:string) => {
        console.log(em);// make sure valid email.
        console.log(pn);// make sure valid phone number.
        console.log(pw);// make sure these are the same.
        console.log(cp); 

        // register user in the AWS pool using the aws-amplify/auth module.
    }

    return (
    <View style={styles.container}>
        <View style={styles.form}>
            <Text>Register</Text>
            <Text>Email</Text>
            <TextInput placeholder='Email' onChangeText={(input: string) => setEmail(input)} value={email} />
            <Text>Phone Number</Text>
            <TextInput placeholder='Phone Number' onChangeText={(input: string) => setPhoneNum(input)} value={phoneNum} />
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder='Password' onChangeText={(input: string) => setPassword(input)} value={password} />
            <Text>Confirm Password</Text>
            <TextInput secureTextEntry={true} placeholder='Confirm' onChangeText={(input: string) => setConfirmPassword(input)} value={confirmPassword} />
            <Button onPress={() => {test(email, phoneNum, password, confirmPassword)}} title='Register' />
        </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        marginHorizontal : 20, 
      },
      form: {
        marginVertical: 20,
        flexDirection : 'column',
        alignItems: 'center',
      },
})