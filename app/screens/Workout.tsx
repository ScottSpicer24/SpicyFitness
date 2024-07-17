import { View, Text, ActivityIndicator, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExerData, SplitData, SplitDayData, WorkoutReturn, getLastWorkout, getSplitDay } from '../functions/ExerciseFunctions'
import { styles, generateBoxShadowStyle } from '../Styles';

const Workout = ({navigation, route} : any) => {
    const splitDay : string = route.params.SplitDay
    const [isLoading, setIsLoading] = useState(true)
    const [isErr, setIsErr] = useState(false)
    const [splitDayData, setSplitDayData] = useState<SplitDayData>({
        "splitDayID" : "",
        "splitDayName" : "",
        "exercises" : [],
        "splitID" : "",
        "workouts" : [],
    })
    const [prevWorkout, setPrevWorkout] = useState<ExerData[]>([])
    const [pressedIndex, setPressedIndex] = useState(0)
    

    useEffect(() => {
        async function initializeInfo(){
            try{
                setIsErr(false)
                generateBoxShadowStyle();
                const resp = await getSplitDay(splitDay)
                //if you can get splitday
                if(resp.statusCode === 200){
                    //prepare split day data
                    const data = await JSON.parse(resp.body)
                    setSplitDayData(data)

                    //DO NOT use splitDayData bc os async nature it does not update in time
                    const len = data.workouts.length
                    const prevWorkoutID = data.workouts[len - 1]
                    
                    // get and prepare workout exercise data
                    const res : WorkoutReturn = await getLastWorkout(prevWorkoutID)
                    console.log(res.statusCode)
                    if(res.statusCode === 200){
                        //console.log(res.body[0].info)
                        setPrevWorkout(res.body)
                    }
                    else{
                        setIsErr(true)
                    }
                }
                else{
                    setIsErr(true)
                }
            }
            catch (error) {
                console.error('Error initializing info:', error);
            } finally {
                setIsLoading(false);
            }
        }
        initializeInfo()
    }, [])

    const exerciseContainer = (item: ExerData, index: number) => {
        const lastData = item.info[item.info.length - 1]
        
        if(index !== pressedIndex){
            return(
                <Pressable key={index} style={[styles.exerContainerUnpressed, styles.boxShadow]} onPress= {() => setPressedIndex(index)}>
                    <Text style={styles.text}>{item.exerciseName} {lastData.resistance}lbs {lastData.sets}x{lastData.reps[0]}</Text>
                    <Text style={styles.text}>{lastData.notes}</Text>
                </Pressable>   
            )
        }
        else{
            return(
                <Pressable key={index} style={[styles.exerContainerPressed]} onPress= {() => setPressedIndex(index)}>
                    <View style={styles.rowExer}>
                        <TextInput style={[styles.textInputExer, styles.firstInputExer]} placeholder={item.exerciseName} />
                        <TextInput style={[styles.textInputExer, styles.resistInputExer]} maxLength={4} placeholder={lastData.resistance.toString()} />
                        <TextInput style={[styles.textInputExer, styles.repInputExer]} maxLength={2} placeholder={lastData.reps[0]} />
                        <TextInput style={[styles.textInputExer, styles.repInputExer]} maxLength={2}placeholder={lastData.reps[0]} />
                        <TextInput style={[styles.textInputExer, styles.repInputExer]} maxLength={2} placeholder={lastData.reps[0]} />
                    </View>
                    <View style={styles.rowExer}>
                        <TextInput style={[styles.textInputExer, styles.fullWidthInputExer]} placeholder={lastData.notes} />
                    </View>
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
        else if(isErr){
            return(
                <Text style={styles.heading}>Error Loading Data</Text>
            )
        }
        else{
            return(
                <View style={styles.form}>
                    <Text style={styles.heading}>Workout: {splitDayData.splitDayName}</Text>
                    {prevWorkout.map((item, index) => (exerciseContainer(item, index)))}
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