import { StyleSheet, Text, View, TextInput, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';
import { handleSignIn } from './functions/AuthFunctions';


type ConfirmParameters = {
    confirmationCode : string;
  };

const Confirm = ({navigation, route} : any) => {
    const [code, setCode] = useState('')
    const email = route.params.email;
    const password = route.params.password

    async function handleSignUpConfirmation({ confirmationCode }: ConfirmParameters) {
        try {
            console.log(route.params.email)
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username : route.params.email,
                confirmationCode : confirmationCode
            });

            if(isSignUpComplete){
                const res = handleSignIn({user : email, password : password})

                if(!res){
                    Alert.alert('Note', 'Email verified but password is incorrect. Return to the sign in page and try again', [{text: 'Close', onPress: () => console.log('Cancel Pressed')}])
                }
            }
        } 
        catch (error : any) {
          // Check if error message is available
          const errorMessage = error.message || 'An error occurred during sign up confirmation';

          Alert.alert('Error', errorMessage, [{ text: 'Close', onPress: () => console.log('Cancel Pressed') }]);
          console.log('error signing up:', error);
        }
    }

    return (
    <View style={styles.container}>
        <View style={styles.form}>
            <Text>Confirm Email</Text>
            <TextInput style={styles.textIn} placeholder='Code' onChangeText={(input: string) => setCode(input)} value={code} />
            <Text style={{textAlign: 'center'}}>A code was sent to your email, please type that code above to confirm your email, {email}</Text>
            
            <Pressable style={styles.button} onPress={() => {handleSignUpConfirmation({confirmationCode : code})}}>
                <Text style={styles.text}>Confirm</Text>
            </Pressable>

            <Pressable style={styles.buttonSmall} onPress={ () => Alert.alert('Rejected', 'No, not later, now.', [{text: 'Close', onPress: () => console.log('Cancel Pressed')}])}>
                <Text>Later</Text>
            </Pressable>
        </View>
      
    </View>
  )
}

export default Confirm

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