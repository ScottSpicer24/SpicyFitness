import { View, Text, ActivityIndicator, TouchableWithoutFeedback, Pressable, TextInput, ScrollView, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton} from 'react-native-paper';
import { styles } from '../Styles'
import { getSplitsAll, Return, SplitData, addSplitData } from '../functions/ExerciseFunctions'

type KeySplitData = {
  "key" : number,
  "data" : SplitData
}

const Splits = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [splitData, setSplitData] = useState<SplitData[]>([])
    const [showAddSplit, setShowAddSplit] = useState(false)
    const [newSplitName, setNewSplitName] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newSplitDays, setNewSplitDays] = useState<string[]>([])
    const [newDayInSplit, setNewDayInSplit] = useState("")
    const [activeSplit, setActiveSplit] = useState(-1)
    //const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        async function initializeInfo() {
            try{
              const resp = await getSplitsAll()
              const parsedBody = await JSON.parse(resp.body)

              if(splitData[0] === undefined){
                  await fillSplitsArray(parsedBody)
              }
              setIsLoading(false);
            }
            catch{
              console.log("Error loading data in splits page useEffect")
            }
          }
          initializeInfo()
           
    }, [])
    
    async function fillSplitsArray(parsedBody : any) {
        /* DO NOT setState for each component. Causes issues 
            because of the asynchronous nature or react native */
        const newEntries: SplitData[] = [];
        for (let i = 0; i < parsedBody.length; i++) {
          const newEntry: SplitData = parsedBody[i];
          newEntries.push(newEntry);
        } 
        setSplitData(splitData.concat(newEntries));
    }

    const showSplits = (item : SplitData, index : number) => {
        if(item.active){
          setActiveSplit(index)
          return (
            <Pressable key={index} style={styles.splitRadioSelected}>
                <Text style={styles.mainTextSplits}>{item.splitName}</Text>
                <Text style={{marginBottom: 10}}>{item.description}</Text>
            </Pressable>
          )
        }
        return (
            <Pressable key={index} style={styles.splitRadioNot}>
                <Text style={styles.mainTextSplits}>{item.splitName}</Text>
                <Text style={{marginBottom: 10}}>{item.description}</Text>
            </Pressable>
        )
    }

    const updateActiveSplit = async () => {
      //TODO
    }

    const showNewSplitDays = (item : string, index : number) => {
      return (
          <View key={index}>
              <Text>{item}</Text>
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
        else if(!showAddSplit){
          return (
            <ScrollView>
                <Text style={styles.headingSplits}>Your Splits</Text>
                {splitData.map((item, index) => showSplits(item, index))}

                <View style={{alignItems: "center"}}>
                  <Pressable style={styles.button} onPress={() => setShowAddSplit(true)}>
                    <Text style={styles.text}>Add New</Text>
                  </Pressable>
                </View>
                
            </ScrollView>
          )
        }
        else{
            return(
                <ScrollView>
                    <Text style={styles.headingSplits}>Your Splits</Text>
                    {splitData.map((item, index) => showSplits(item, index))}
                    
                    <View style={{alignItems: "center"}}>
                      <TextInput style={styles.mainTextInSplits} autoFocus placeholder='New Split Name' onChangeText={(input: string) => setNewSplitName(input)} value={newSplitName} />
                      <TextInput style={styles.textInDescSplits} multiline={true} placeholder='New Split Decsription' onChangeText={(input: string) => setNewDescription(input)} value={newDescription} />
                      <TextInput style={styles.mainTextInSplits} placeholder='New Split Day' onChangeText={(input: string) => setNewDayInSplit(input)} value={newDayInSplit} />
                      {newSplitDays.map((item, index) => showNewSplitDays(item, index))}

                      <Pressable style={styles.button} onPress={() => {
                        setNewSplitDays(newSplitDays.concat(newDayInSplit))
                        //setRefresh(!refresh)
                      }}>
                        <Text style={styles.text}>Add Day</Text>
                      </Pressable>

                      <Pressable style={styles.button} onPress={() => console.log("Create pressed")}>
                        <Text style={styles.text}>Create Split</Text>
                      </Pressable>
                    </View> 
                </ScrollView>
            )
        }
    }

      return (
        /*<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {visualComponents()}
          </View>
        </TouchableWithoutFeedback>*/
        <View style={styles.container}>
            {visualComponents()}
          </View>
      )
}

export default Splits