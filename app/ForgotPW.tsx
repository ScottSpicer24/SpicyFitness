import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState }from 'react'
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';



const ForgotPW = ({navigation, route} : any) => {
    const [code, setCode] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false)
  
    const sendEmail = async (email : string) => {
        try{
            const res = await resetPassword({ username : email });
            console.log(res)
            setIsEmailSent(true)
        }
        catch(e) {
            console.log("error caught: ", e)
        }
        
    }
    
    const reset = async (code : string, password : string, confirmPassword : string) => {
        if (password !== confirmPassword){
            Alert.alert('Error', 'Passwords do not match.', [{text: 'Close', onPress: () => console.log('Cancel Pressed')}])
            return
        }
        try{
            const res = await confirmResetPassword({
                username: email,
                newPassword : password,
                confirmationCode : code
            })
            console.log(res)

            Alert.alert('Success', 'Your password was reset. Click continue to return to the login page.', [{text: 'Continue', onPress: () => navigation.navigate("Login")}])
        }
        catch(e){
            console.log("error caught: ", e)
        }
    }
    
    if(!isEmailSent){
        return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text>Email</Text>
                <TextInput style={styles.textIn} placeholder='Email' onChangeText={(input: string) => setEmail(input)} value={email} />
                
                <Pressable style={styles.button} onPress={() => {sendEmail(email)}}>
                    <Text style={styles.text}>Send Code</Text>
                </Pressable>
            </View>
        </View>
        )
    }
    
    else{
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text>Code</Text>
                    <TextInput style={styles.textIn} placeholder='Code from email' onChangeText={(input: string) => setCode(input)} value={code} />
                    
                    <Text>Password</Text>
                    <TextInput style={styles.textIn} secureTextEntry={true} placeholder='Password' onChangeText={(input: string) => setPassword(input)} value={password} />
                    
                    <Text>Confirm Password</Text>
                    <TextInput style={styles.textIn} secureTextEntry={true} placeholder='Confirm' onChangeText={(input: string) => setConfirmPassword(input)} value={confirmPassword} />
                    
                    <Pressable style={styles.button} onPress={() => {reset(code, password, confirmPassword)}}>
                        <Text style={styles.text}>Change Password</Text>
                    </Pressable>
                </View>
            </View>
          )
    }
    
}

export default ForgotPW

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
      },
      buttonSmall: { // style={styles.buttonSmall}
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 16,
        margin: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'skyblue',
      }
})