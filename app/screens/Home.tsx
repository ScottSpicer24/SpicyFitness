import { Text, View, ActivityIndicator, Pressable, Button, Alert} from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { getIDToken } from '../functions/AuthFunctions';
import { styles, generateBoxShadowStyle } from '../Styles';
import { getCurrentWeight, WeightReturn} from '../functions/WeightFunctions';
import { getActiveSplit, Return, SplitData } from '../functions/ExerciseFunctions';
import { useFocusEffect } from '@react-navigation/native';

/*TODO:
- have sign out button confirm then return to login screen stack. 
- create the quick start split data
- NOT refreshing the bottom right button when acrive split is changed
*/

const Home = ({navigation, route} : any) => {
    const [username, setUsername] = useState("")
    const [weight, setWeight] = useState("")
    const [weightDate, setWeightDate] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [activeSplit, setActiveSplit] = useState<SplitData>()
    const [activeSplitDay, setActiveSplitDay] = useState("")
    const [err, setErr] = useState(false)
    const [refresh, setRefresh] = useState(false)

      useEffect(() => {
        getUsersName();
        generateBoxShadowStyle();
        
        async function initializeInfo() {
          //I*************** WEIGHT *************************************/ 
          const res = await getCurrentWeight();
          console.log("Weight in home: ", res)
          if(res.statusCode !== 200){
            setErr(true)
          }
          else{setErr(false)}
          await setWeight(res.body.weight);
          await setWeightDate(res.body.date);

          //**************** SPLIT SECTION **************************** */

          const splitRes: Return = await getActiveSplit()
          if(splitRes.statusCode === 200){
            const parsedBody : SplitData = JSON.parse(splitRes.body)
            await setActiveSplit(parsedBody)
          }

          setIsLoading(false);
          console.log("Home useEffect finished.")
        }
        initializeInfo();
      }, [refresh])

      //updates the active split day when the active split first loads.
      useEffect(() => {
        if(activeSplitDay === "" && activeSplit !== undefined){
          const len = activeSplit.splitDays.length
          for (let i = 0; i < len; i++){
            if(activeSplit.splitDays[i].active){
              setActiveSplitDay(activeSplit.splitDays[i].splitDayID.replace(/^"|"$/g, '')) // removes extra "'s
              break
            }
          }
        }
      }, [activeSplit]);

      //After this page is returned to need to update the activesplit or active split day
      useFocusEffect(
        useCallback(() => {
          resetSplit()
        }, [])
      )

      async function resetSplit(){
        // get the active split from the DB
        const splitRes: Return = await getActiveSplit()
        // if the response was valid set the new active day and new split
        if(splitRes.statusCode === 200){
          const parsedBody : SplitData = JSON.parse(splitRes.body)
          resetSplitDay(parsedBody) // DO NOT wait for it setActiveSplit
          await setActiveSplit(parsedBody)

        }
      }

      //after the split is reset loop through the days 
      async function resetSplitDay(newSplitData : SplitData){
        if(newSplitData !== undefined){
          //go through each of the days in the split
          const len = newSplitData.splitDays.length
          for (let i = 0; i < len; i++){
            // if the active day is hit.
            if(newSplitData.splitDays[i].active){
              setActiveSplitDay(newSplitData.splitDays[i].splitDayID.replace(/^"|"$/g, '')) // removes extra "'s
              break
            }
          }
        }
      }

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

        
      const visualComponents = () => {
        if(isLoading){
          return (
            <View style={styles.form}>
              <ActivityIndicator style={{ padding: 100 }} size="large" color="blue"/>
            </View>
          )
        }
        else if(err){
          return(
            <View style={styles.form}>
              <Text style={styles.heading}>Error loading page.</Text>
              <Pressable style={styles.button} onPress={() => setRefresh(!refresh)}>
                <Text style={styles.text}>Refresh</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => signOut()}>
                <Text style={styles.text}>Sign Out</Text>
              </Pressable>
            </View>
          )
        }
        else{
          return (
          <View style={styles.form}>
            <Text style={styles.heading}>{username}</Text>
            
            <View style={styles.smallCardHolder}>
              <Pressable style={[styles.cardHalf, styles.boxShadow]} onPress={() => navigation.navigate("Weight")}>
                <Text style={styles.text}>{weight} lbs</Text>
              </Pressable>

              <Pressable style={[styles.cardHalf, styles.boxShadow]} onPress={() => /*navigation.navigate("Workout")*/Alert.alert('Sorry', 'feature pending, please use start workout instead.', [{text: 'Close', onPress: () => console.log('Closed Pressed')}])}>
                <Text style={styles.text}>Quick Start</Text>
              </Pressable>
            </View>
            
            <Pressable style={[styles.card, styles.boxShadow]} onPress={() => navigation.navigate("Workout", {SplitDay: activeSplitDay})}>
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
