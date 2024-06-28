import { Text, View, ActivityIndicator, Pressable} from 'react-native'
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
    //const [err, setErr] = useState(false)

      useEffect(() => {
        getUsersName();
        generateBoxShadowStyle();
        
        async function initializeWeightInfo() {
          const res = await getCurrentWeight();
          await setWeight(res.body.weight);
          await setWeightDate(res.body.date);
          console.log("Initial weight and date: ", res.body);
          setIsLoading(false);
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
              const parsedBody = JSON.parse(result.body)
              setUsername(parsedBody.name)
              //setErr(false)
            }
          )
          .catch(
            (error) => {
              //setErr(true)
              console.log(error)
            }
          )
      }

      async function weightButton(){
        console.log("weight button pressed");
        navigation.navigate("Weight");
      }

      const visualComponents = () => {
        if(isLoading){
          return (
            <View style={styles.form}>
              <ActivityIndicator style={{ padding: 100 }} size="large" color="blue"/>
            </View>
            
          )
        }
        else{
          return (
          <View style={styles.form}>
            <Text style={styles.heading}>{username}</Text>
            
            <View style={styles.smallCardHolder}>
              <Pressable style={[styles.cardHalf, styles.boxShadow]} onPress={() => weightButton()}>
                <Text style={styles.text}>{weight} lbs</Text>
              </Pressable>

              <Pressable style={[styles.cardHalf, styles.boxShadow]} onPress={() => console.log("day")}>
                <Text style={styles.text}>Quick Start</Text>
              </Pressable>
            </View>
            

            <Pressable style={[styles.card, styles.boxShadow]} onPress={() => navigation.navigate("Workout")}>
              <Text style={styles.text}>Add Lift</Text>
            </Pressable>
            
            <View style={styles.smallCardHolder}>
              <Pressable style={[styles.cardHalf, styles.boxShadow]} onPress={() => navigation.navigate("Splits")}>
                <Text style={styles.text}>Edit Splits</Text>
              </Pressable>

              <Pressable style={[styles.cardHalf, styles.boxShadow]} onPress={() => console.log("day")}>
                <Text style={styles.text}>Edit Day</Text>
              </Pressable>
            </View>
            
            
            
            
            <Pressable style={styles.button} onPress={() => signOut()}>
              <Text style={styles.text}>Sign Out</Text>
            </Pressable>
          </View>
          )
        }
      }

      return (
        <View style={styles.container}>
          {visualComponents()}
        </View>
      )
}

export default Home
