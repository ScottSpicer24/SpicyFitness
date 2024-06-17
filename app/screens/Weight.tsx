import { Text, View, Pressable, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles';
import { getCurrentWeight, postWeight, WeightReturn} from '../functions/WeightFunctions';

const Weight = () => {
    const [weight, setWeight] = useState("")
    const [weightDate, setWeightDate] = useState("")
    const [newWeight, setNewWeight] = useState("")
    const [refresh, setRefresh] = useState(false)

      useEffect(() => {
        async function initializeWeightInfo() {
          const res = await getCurrentWeight();
          setWeight(res.body.weight);
          setWeightDate(res.body.date);
          console.log("Initial weight and date: ", res.body);
        }
        initializeWeightInfo();

      }, [refresh])

      async function postWeightThenRefresh(weight : string){
        await postWeight(weight);
        await setRefresh(!refresh);
      }
  
    return (
    <View style={styles.container}>
        <View style={styles.form}>
            <Text style={styles.heading}>Weight: {weight}</Text>
            <Text style={styles.heading}>---</Text>
            <Text style={styles.heading}>Date: {weightDate}</Text>

            <Text style={{padding: 10, marginTop: 15 }}>Add New Weight Enrty: </Text>
            <TextInput style={styles.textIn} placeholder='New Weight' onChangeText={(input: string) => setNewWeight(input)} value={newWeight} />
            
            <Pressable style={styles.button} onPress={() => postWeightThenRefresh(newWeight)}>
                <Text style={styles.text}>Log Weight</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default Weight