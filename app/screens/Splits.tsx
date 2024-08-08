import { View, Text, ActivityIndicator, Alert, Pressable, TextInput, ScrollView, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles'
import { getSplitsAll, Return, SplitData, addSplitData, toggleActiveSplit, addSplit } from '../functions/ExerciseFunctions'
import { getCurrentUser } from 'aws-amplify/auth';

/** TODO:
 * need to focus on inputs when pressed so user doesn't have to scroll
 * edit splits feature (+ LAMBDA)

 */

const Splits = () => {
    const [isLoading, setIsLoading] = useState(true) // for showing loading
    const [splitData, setSplitData] = useState<SplitData[]>([]) 
    const [showAddSplit, setShowAddSplit] = useState(false) //bool on weather to sho form or not
    const [newSplitName, setNewSplitName] = useState("")  // Filling in new data
    const [newDescription, setNewDescription] = useState("") //" "
    const [newSplitDays, setNewSplitDays] = useState<string[]>([]) // " "
    const [newDayInSplit, setNewDayInSplit] = useState("") // Filling in new data
    const [activeSplit, setActiveSplit] = useState(-1) // index of active split

    useEffect(() => {
        async function initializeInfo() {
            try{
              console.log("useEffect called")
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
           
    }, [splitData])
    
    async function fillSplitsArray(parsedBody : any) {
        /* DO NOT setState for each component. Causes issues 
            because of the asynchronous nature or react native */
        let newEntries: SplitData[] = []
        let activeVal: number = -1
        for (let i = 0; i < parsedBody.length; i++) {
          const newEntry: SplitData = parsedBody[i];
          if(newEntry.active){
            activeVal = i;
          }
          newEntries.push(newEntry);
        } 
        setSplitData(splitData.concat(newEntries));
        setActiveSplit(activeVal)
    }

    async function resetSplitsArray() {
      await setSplitData([])
    }


    // fe to show the actual list 
    const showSplits = (item : SplitData, index : number) => {
        if(item.active){
          return (
            <Pressable key={index} style={styles.splitRadioSelected}>
              <Text style={styles.mainTextSplitsSelected}>{item.splitName}</Text>
              <Text style={{marginBottom: 10}}>{item.description}</Text>
            </Pressable>
          )
        }
        else{
          return (
            <Pressable key={index} style={styles.splitRadioNot} onPress= {() => updateActiveSplit(index)}>
              <Text style={styles.mainTextSplits}>{item.splitName}</Text>
              <Text style={{marginBottom: 10}}>{item.description}</Text>
            </Pressable>
          )
        } 
    }

    //logic when a new split is pressed to activate it
    const updateActiveSplit = async (acivateIndex : number) => {
      setIsLoading(true)
      const deactivateID = splitData[activeSplit].splitID
      const activateID = splitData[acivateIndex].splitID
      const res = await toggleActiveSplit(deactivateID, activateID)
      console.log("Toggle active split response: ", res)
      setIsLoading(false)
      if(res === 200){
        splitData[activeSplit].active = false
        splitData[acivateIndex].active = true
        await setActiveSplit(acivateIndex) 
      }
      else{
        const error_message: string = "An error occured switching active split. Active split not changed"
        Alert.alert('Error', error_message, [{ text: 'Close', onPress: () => console.log('Cancel Pressed') }]);
      }
    }

    const showNewSplitDays = (item : string, index : number) => {
      return (
          <View key={index}>
            <Text style={styles.mainTextSplits}>{item}</Text>
          </View>
      )
  }

    const createSplit = async () => {
      setIsLoading(true)
      const resp= await getCurrentUser()
      const userID = resp.userId
      
      let data: addSplitData= {
        "userID" : userID,
        "splitName" : newSplitName,
        "description" : newDescription,
        "splitDays" : newSplitDays
      }

      if(newSplitDays.length === 0){
        data.splitDays = ["Workout"]
      }
      
      const res = await addSplit(data)
      if(res === 200){
        await resetSplitsArray()
        setShowAddSplit(!showAddSplit)
        setNewSplitName("")
        setNewDescription("")
        setNewDayInSplit("")
        setNewSplitDays([])
      }
      setIsLoading(false)
    }
//**************** */
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
                <ScrollView keyboardShouldPersistTaps="handled"> 
                    <Text style={styles.headingSplits}>Your Splits</Text>
                    {splitData.map((item, index) => showSplits(item, index))}
                    
                    <View style={{alignItems: "center"}}>
                      <TextInput style={styles.mainTextInSplits} autoFocus placeholder='New Split Name' onChangeText={(input: string) => setNewSplitName(input)} value={newSplitName} />
                      <TextInput style={styles.textInDescSplits} multiline={true} placeholder='New Split Decsription' onChangeText={(input: string) => setNewDescription(input)} value={newDescription} />
                      <TextInput style={styles.mainTextInSplits} placeholder='New Split Day' onChangeText={(input: string) => setNewDayInSplit(input)} value={newDayInSplit} />
                      {newSplitDays.map((item, index) => showNewSplitDays(item, index))}

                      <Pressable style={styles.buttonAddSplit} onPress={() => {
                        setNewSplitDays(newSplitDays.concat(newDayInSplit))
                        setNewDayInSplit("")
                      }}>
                        <Text style={styles.text}>Add Day</Text>
                      </Pressable>

                      <Pressable style={styles.buttonAddSplit} onPress={() => setShowAddSplit(false)}>
                        <Text style={styles.text}>Cancel</Text>
                      </Pressable>

                      <Pressable style={styles.buttonAddSplit} onPress={() => createSplit()}>
                        <Text style={styles.text}>Create Split</Text>
                      </Pressable>
                    </View> 
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

export default Splits




