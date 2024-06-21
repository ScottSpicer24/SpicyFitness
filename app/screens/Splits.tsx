import { View, Text, ActivityIndicator, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles'
import { getSplitsAll, Return, SplitData } from '../functions/ExerciseFunctions'

const Splits = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [splitData, setSplitData] = useState<SplitData[]>([])

    useEffect(() => {
        async function initializeInfo() {
            const resp = await getSplitsAll()
            const parsedBody = await JSON.parse(resp.body)

            if(splitData[0] === undefined){
                await fillSplitsArray(parsedBody)
            }
            setIsLoading(false);
          }
          initializeInfo()
           
    }, [])
    
    async function fillSplitsArray(parsedBody : any) {
        /* DO NOT setState for each component. Causes issues 
            because of the asynchronous nature or react native*/
        const newEntries: SplitData[] = [];
        for (let i = 0; i < parsedBody.length; i++) {
            const newEntry: SplitData = parsedBody[i];
            newEntries.push(newEntry);
        }
        
        setSplitData(splitData.concat(newEntries));
    }

    const showSplits = (item : SplitData) => {
        return (
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.splitName}</Text>
                <Text style={{marginBottom: 10}}>{item.description}</Text>
            </View>
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
        else{
          return (
          <View style={styles.form}>
            <Text style={styles.heading}>Your Splits</Text>
            <FlatList data={splitData} renderItem={({item}) => showSplits(item)} />
            <Pressable style={styles.button} onPress={() => console.log("Pressed")}>
              <Text style={styles.text}>Add New New</Text>
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

export default Splits