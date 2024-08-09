import { Text, View, TextInput, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';
import { handleSignIn } from '../functions/AuthFunctions';
import { styles } from '../Styles';


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
          const errorMessage = 'An error occurred during sign up confirmation';

          Alert.alert('Error', errorMessage, [{ text: 'Close', onPress: () => console.log('Cancel Pressed') }]);
          console.log('error signing up:', error);
        }
    }

    return (
    <View style={styles.container}>
        <View style={styles.form}>
            <Text style={styles.heading}>Confirm Email</Text>
                <TextInput style={styles.textIn} placeholder='Code' keyboardType="numeric" onChangeText={(input: string) => setCode(input)} value={code} />
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

