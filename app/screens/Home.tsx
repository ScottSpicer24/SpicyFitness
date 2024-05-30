import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect } from 'react'
import { signOut, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

const Home = () => {

    useEffect(() => {
        checkAuthStatus();
      }, []);

      const checkAuthStatus = async () => {
        try {
          const { tokens } = await fetchAuthSession();
          console.log("Users tokens: ", tokens);
          console.log("Users tokens ID: ", tokens?.idToken);
          const response = getCurrentUser()
          console.log("curr user: ", (await response).userId)
        } 
        catch {
          console.log("Error with fetchAuthSession().")
        }
      };

      async function getCurrentUserID() {
        try {
          const {  userId } = await getCurrentUser();
          console.log(`userId: ${userId}`);
          return userId;
        } catch (err) {
          console.log(err);
        }
      }

      async function getIDToken(){
        try{
          const { tokens } = await fetchAuthSession();
          console.log(`ID token: ${tokens?.idToken}`);
          //console.log(`Access token: ${tokens?.accessToken}`);
          return tokens?.idToken;
          //return tokens?.accessToken;
        }
        catch (err) {
          console.log(err);
        }
      }

    const HandleSignOut = async () => {
        const { tokens, credentials, identityId, userSub } = await fetchAuthSession();
        await signOut();
        console.log("signout called")
    }

    const addSplit = async () => {
      console.log("--------------------");
      console.log("addSplit called");

      const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/splits";

      const data = {
        "username" : getCurrentUserID(),
        "splitName" : "placeholder",
        "description" : "the description of the split goes here, maybe cap length?",
        "workouts" : []
      }

      let response = await fetch(url, {
        method: "POST",
        headers: {
          'Authorization' : 'Bearer ' + getIDToken().toString(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      response = await response.json();
      console.log("API call response: ", response);
    }

    
    return (
    <View style={styles.container}>
        <View style={styles.form}>
            <Text>Landing page!</Text>
            <Button title="signout" onPress={() => HandleSignOut()} />
            <Button title="add split" onPress={() => addSplit()} />
        </View>
    </View>
  )
}

export default Home

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