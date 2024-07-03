import { View, Text, ActivityIndicator, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Return, SplitData, getSplitDay, SplitDayData } from '../functions/ExerciseFunctions'
import { styles } from '../Styles'

const EditSplit = ({navigation, route} : any) => {
    const split : SplitData = route.params.Split
    const [isLoading, setIsLoading] = useState(true)
    const [splitDays, setSplitDays] = useState<SplitDayData[]>([])

    useEffect(() => {
        //todo
        
        async function initializeInfo(){
            let arr : SplitDayData[] = []
            const len = split.splitDayID.length
            for (let i = 0; i < len; i++){
                const cleanedID = split.splitDayID[i].replace(/^"|"$/g, '')
                //console.log(cleanedID)
                const resp : Return = await getSplitDay(cleanedID)
                //console.log(resp)
                if(resp.statusCode === 200){
                    const newEntry: SplitDayData = await JSON.parse(resp.body)
                    arr.push(newEntry)
                }
            }
            setSplitDays(arr)
            console.log(splitDays)
        }
        initializeInfo()
        setIsLoading(false)
    }, [])


    const showSplitDays = (item : SplitDayData, index : number) => {
        return (
        <Pressable key={index} style={styles.splitRadioSelected}>
            <Text style={styles.mainTextSplitsSelected}>{item.splitDayName}</Text>
        </Pressable>
        )
    }

    const visualComponents = () => {
        if(isLoading){
            return(
                <View style={styles.form}>
                    <ActivityIndicator style={{ padding: 100 }} size="large" color="blue"/>
                </View>
            )
            
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