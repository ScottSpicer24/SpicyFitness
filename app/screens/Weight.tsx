import { Text, View, Pressable, TextInput, ScrollView, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles';
import { getCurrentWeight, postWeight, WeightReturn, getAllWeights} from '../functions/WeightFunctions';

/* 
- style Weight log
- graph the weights
*/

const Weight = () => {
    const [weight, setWeight] = useState("")
    const [weightDate, setWeightDate] = useState("")
    const [newWeight, setNewWeight] = useState("")
    const [allWeights, setAllWeights]  =useState([{date : "", weight : ""}])
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

      useEffect(() => {
        async function initializeWeightInfo() {
          const res = await getCurrentWeight();
          setWeight(res.body.weight);
          setWeightDate(res.body.date);
          //console.log("Initial weight and date: ", res.body);

          const arr = await getAllWeights();
          const list = await JSON.parse(arr.body);
          setAllWeights(list.reverse());

          //console.log("Initial weight array: ", allWeights);
        }
        initializeWeightInfo();

        setIsLoading(false)
      }, [refresh])

      async function postWeightThenRefresh(weight : string){
        await setIsLoading(true)
        await postWeight(weight);
        await setRefresh(!refresh);
      }

      function printWeights(item: {date : string, weight : string}, index: number){
        if(index % 2 === 0){
          return(
            <View key={index}>
              <Text style={styles.heading}>| {item.date}  |  {item.weight} lbs |</Text>
            </View>
          )
        }
        else{
          return(
            <View key={index}>
              <Text style={styles.headingLight}>| {item.date}  |  {item.weight} lbs |</Text>
            </View>
          )
          
        }
      }
      const visualComponents = () => {
        if(isLoading){
          return (
            <View>
              <ActivityIndicator style={{ padding: 100 }} size="large" color="blue"/>
            </View>
            
          )
        }
        else{
          return (
            <ScrollView>
              <View style={styles.form}>
                <Text style={styles.heading}>Weight: {weight} lbs</Text>
                <Text style={styles.heading}>---</Text>
                <Text style={styles.heading}>Date: {weightDate}</Text>

                <Text style={{padding: 10, marginTop: 15 }}>Add New Weight Enrty: </Text>
                <TextInput style={styles.textIn} placeholder='New Weight' onChangeText={(input: string) => setNewWeight(input)} value={newWeight} />
                
                <Pressable style={styles.button} onPress={() => postWeightThenRefresh(newWeight)}>
                  <Text style={styles.text}>Log Weight</Text>
                </Pressable>


                <View>
                  {               
                    allWeights.map((item, index) => (printWeights(item, index)))
                  }
                </View>
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

export default Weight