import { View, Text, ActivityIndicator, FlatList, Pressable, TextInput, ScrollView, SectionList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles'
import { getSplitsAll, Return, SplitData, addSplitData } from '../functions/ExerciseFunctions'

const Splits = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [splitData, setSplitData] = useState<SplitData[]>([])
    const [showAddSplit, setShowAddSplit] = useState(false)
    const [newSplitName, setNewSplitName] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newSplitDays, setNewSplitDays] = useState<string[]>([])
    const [newDayInSplit, setNewDayInSplit] = useState("")

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

    const showSplits = (item : SplitData) => {
        return (
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.splitName}</Text>
                <Text style={{marginBottom: 10}}>{item.description}</Text>
            </View>
        )
    }

    const showNewSplitDays = (item : string) => {
      return (
          <View>
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
            <View style={styles.form}>
                <Text style={styles.heading}>Your Splits</Text>
                <FlatList data={splitData} renderItem={({item}) => showSplits(item)} />
                <Pressable style={styles.button} onPress={() => setShowAddSplit(true)}>
                  <Text style={styles.text}>Add New</Text>
                </Pressable>
            </View>
          )
        }
        /* 
          DOES NOT SCROLLL IF GOES OFF SCREEN: FIX
          <ScrollView> is not supposed to be used with <FlatList> 
          Find a different solution.
        */
        else{
            return(
                <View style={styles.form}>
                    <Text style={styles.heading}>Your Splits</Text>
                    <FlatList data={splitData} renderItem={({item}) => showSplits(item)} />
                    
                    <TextInput style={styles.textIn} placeholder='New Split Name' onChangeText={(input: string) => setNewSplitName(input)} value={newSplitName} />
                    <TextInput style={styles.textInDesc} multiline={true} placeholder='New Split Decsription' onChangeText={(input: string) => setNewDescription(input)} value={newDescription} />
                    
                    <TextInput style={styles.textIn} placeholder='New Split Day' onChangeText={(input: string) => setNewDayInSplit(input)} value={newDayInSplit} />
                    <FlatList data={newSplitDays} renderItem={({item}) => showNewSplitDays(item)} />
                    <Pressable style={styles.button} onPress={() => setNewSplitDays(newSplitDays.concat(newDayInSplit))}>
                      <Text style={styles.text}>Add Day</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={() => console.log("Create pressed")}>
                      <Text style={styles.text}>Create Split</Text>
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