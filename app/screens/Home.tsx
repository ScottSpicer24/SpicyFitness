import { Text, View, ActivityIndicator, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { getIDToken } from '../functions/AuthFunctions';
import { styles, generateBoxShadowStyle } from '../Styles';
import { getCurrentWeight, WeightReturn} from '../functions/WeightFunctions';
import { getActiveSplit, Return, SplitData } from '../functions/ExerciseFunctions';

/*TODO:
- display the active split name on the edit day and add lift pressable,
- have sign out button confirm then return to login screen stack. 

*/

const Home = ({navigation, route} : any) => {
    const [username, setUsername] = useState("")
    const [weight, setWeight] = useState("")
    const [weightDate, setWeightDate] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [activeSplit, setActiveSplit] = useState<SplitData>()
    //const [err, setErr] = useState(false)

      useEffect(() => {
        getUsersName();
        generateBoxShadowStyle();
        
        async function initializeInfo() {
          //Iniitalize weight info
          const res = await getCurrentWeight();
          await setWeight(res.body.weight);
          await setWeightDate(res.body.date);


          const splitRes: Return = await getActiveSplit()
          if(splitRes.statusCode === 200){
            const parsedBody : SplitData = JSON.parse(splitRes.body)
            setActiveSplit(parsedBody)
          }
          setIsLoading(false);
        }
        initializeInfo();
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

              <Pressable style={[styles.cardHalf, styles.boxShadow]} onPress={() => navigation.navigate("Workout")}>
                <Text style={styles.text}>Quick Start</Text>
              </Pressable>
            </View>
            
            <Pressable style={[styles.card, styles.boxShadow]} onPress={() => navigation.navigate("Workout")}>
              <Text style={styles.text}>Start Workout</Text>
            </Pressable>
            
            <View style={styles.smallCardHolder}>
              <Pressable style={[styles.cardHalf, styles.boxShadow]} onPress={() => navigation.navigate("Splits")}>
                <Text style={styles.text}>Manage Splits</Text>
              </Pressable>

              <Pressable style={[styles.cardHalf, styles.boxShadow]} onPress={() => navigation.navigate("EditSplit", {Split: activeSplit})}>
                <Text style={styles.text}>Edit {activeSplit?.splitName}</Text>
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
