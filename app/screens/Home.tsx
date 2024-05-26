import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect } from 'react'
import { signOut, fetchAuthSession } from 'aws-amplify/auth';

const Home = () => {

    const HandleSignOut = async () => {
        const { tokens, credentials, identityId, userSub } = await fetchAuthSession();
        await signOut();
        console.log("signout called")
    }
  
    return (
    <View style={styles.container}>
        <View style={styles.form}>
            <Text>Landing page!</Text>
            <Button title="signout" onPress={() => HandleSignOut()} />
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