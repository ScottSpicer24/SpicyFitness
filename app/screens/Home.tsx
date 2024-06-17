import { Text, View, Button, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { signOut, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { getIDToken, getCurrentUserID } from '../functions/AuthFunctions';
import { styles, generateBoxShadowStyle } from '../Styles';
import { getCurrentWeight, WeightReturn} from '../functions/WeightFunctions';


const Home = ({navigation, route} : any) => {
    const [username, setUsername] = useState("")
    const [weight, setWeight] = useState("")
    const [weightDate, setWeightDate] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState(false)

      useEffect(() => {
        getUsersName();
        generateBoxShadowStyle();
        
        async function initializeWeightInfo() {
          const res = await getCurrentWeight();
          setWeight(res.body.weight);
          setWeightDate(res.body.date);
          console.log("Initial weight and date: ", res.body);
        }
        initializeWeightInfo();

      }, [])

      async function getUsersName(){
          const resp = await getCurrentUser()
          const idToken = await getIDToken()
          const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/userInfo?userID=" +  resp.userId
          fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
          })
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoading(false);
              const parsedBody = JSON.parse(result.body)
              setUsername(parsedBody.name)
              setErr(false)
            }
          )
          .catch(
            (error) => {
              setIsLoading(false)
              setErr(true)
              console.log(error)
            }
          )
      }
  
      const addSplit = async () => {
        const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/splits";

        const data = {
          "username" : await getCurrentUserID(),
          "splitName" : "placeholder",
          "description" : "the description of the split goes here, maybe cap length?",
          "workouts" : []
        }
        
        const idToken = await getIDToken()

        let response = await fetch(url, {
          method: "POST",
          headers: {
            'Authorization' : `Bearer ${idToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        response = await response.json();
        console.log("API call response: ", response);
      }

      async function weightButton(){
        console.log("weight button pressed");
        navigation.navigate("Weight");
      }

    return (
      <View style={styles.container}>
          <View style={styles.form}>
              <Text>{username}</Text>
              
              <Pressable style={[styles.card, styles.boxShadow]} onPress={() => weightButton()}>
                <Text style={styles.text}>{weight} pounds as of {weightDate} </Text>
              </Pressable>

              <Pressable style={[styles.card, styles.boxShadow]} onPress={() => addSplit()}>
                <Text style={styles.text}>Add Lift (text not centered)</Text>
              </Pressable>
              
              <Pressable style={styles.button} onPress={() => signOut()}>
                <Text style={styles.text}>Sign Out</Text>
              </Pressable>
          </View>
      </View>
    )
}

export default Home
