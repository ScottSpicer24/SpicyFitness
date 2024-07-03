import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SplitData } from '../functions/ExerciseFunctions'
import { styles } from '../Styles'

const Workout = ({navigation, route} : any) => {
    const split : SplitData = route.params.Split
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        //todo
        console.log(split)
        setIsLoading(false)
    }
    )

    

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
                <View style={styles.form}>
                    <Text style={styles.heading}>Workout: {split.splitName}</Text>
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

export default Workout