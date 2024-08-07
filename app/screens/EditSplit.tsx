import { View, Text, ActivityIndicator, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Return, SplitData, getSplitDay, SplitDayData } from '../functions/ExerciseFunctions'
import { styles } from '../Styles'
import { getIDToken } from "../functions/AuthFunctions";

/**TODO in future
 * Select a split day to edit
 * List exercises for selected 
 * Merge excersises
 * Rename exercises
 * Rename days
 * View prev workouts
 */

const EditSplit = ({navigation, route} : any) => {
    const split : SplitData = route.params.Split
    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState(false)
    const [splitDays, setSplitDays] = useState<SplitDayData[]>([])
    const [indexOfActive, setIndexOfActive] = useState(0)

    useEffect(() => {
        setIsLoading(true)

        async function initializeInfo(){
            let arr : SplitDayData[] = []
            const len = split.splitDays.length
            for (let i = 0; i < len; i++){
                const cleanedID = split.splitDays[i].splitDayID.replace(/^"|"$/g, '')
                if(split.splitDays[i].active){
                    setIndexOfActive(i)
                }
                
                const resp : Return = await getSplitDay(cleanedID)
                
                if(resp.statusCode === 200){
                    const newEntry: SplitDayData = await JSON.parse(resp.body)
                    arr.push(newEntry)
                }
                else{
                    setErr(true)
                }
            }
            setSplitDays(arr)
        }
        initializeInfo()
        setIsLoading(false)
    }, [])

    async function switchActiveSplitDay(index : number) {
        setIsLoading(true)
        
        const oldIndex = indexOfActive
        setIndexOfActive(index)

        const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/toggle-active-splitDay";
        const idToken = await getIDToken()
        const data = {
            "splitID" : split.splitID,
            "index" : index,
            "oldIndex" : oldIndex
        }

        try{
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization' : `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                setErr(true)
                throw new Error('Network response was not ok');

            }
            const resp: Return = await response.json()
            console.log("API call response: ", resp);
            if(resp.statusCode === 200){
                split.splitDays = JSON.parse(resp.body)
            }else{
                setErr(true)
            }

            console.log("split: ", split)
            setIsLoading(false)
            return resp.statusCode
        }
        catch (error){
            setErr(true)
            console.error('Error fetching Splits:', error);
            throw error;
        } 

    }


    const showSplitDays = (item : SplitDayData, index : number) => {
        if(index === indexOfActive){
            return (
                <Pressable key={index} style={styles.splitRadioSelected}>
                    <Text style={styles.mainTextSplitsSelected}>{item.splitDayName}</Text>
                </Pressable>
            )
        }
        else{
            return (
                <Pressable key={index} style={styles.splitRadioNot} onPress={() => switchActiveSplitDay(index)}>
                    <Text style={styles.mainTextSplitsSelected}>{item.splitDayName}</Text>
                </Pressable>
            )
        }
        
    }

    const visualComponents = () => {
        if(isLoading){
            return(
                <View style={styles.form}>
                    <ActivityIndicator style={{ padding: 100 }} size="large" color="blue"/>
                </View>
            )
            
        }
        else if(err){
            <View style={styles.form}>
                <Text style={styles.headingSplits}>Error, please return home then come back.</Text>
            </View>
        }
        else{
            return(
                <ScrollView>
                    <Text style={styles.headingSplits}>Edit Split:  {split.splitName}</Text>
                    {splitDays.map((item, index) => showSplitDays(item, index))}
                </ScrollView>
            )
        }

        
    }
    return (
    <View style={styles.container}>
      {visualComponents()}
    </View>
  )
}

export default EditSplit