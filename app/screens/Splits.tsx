import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles'
import { getSplitsAll, Return } from '../functions/ExerciseFunctions'

const Splits = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function initializeInfo() {
            const resp = await getSplitsAll()
            //console.log("Initial Splits: ", resp.body)
            const parsedBody = JSON.parse(resp.body)

            //console.log(parsedBody.length)
            for(let i = 0; i < parsedBody.length; i++){
                console.log("Split: ", parsedBody[i])
            }

            setIsLoading(false);
          }
          initializeInfo()
    }, [])
  
  
  
  
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
            <Text>Splits go here</Text>
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