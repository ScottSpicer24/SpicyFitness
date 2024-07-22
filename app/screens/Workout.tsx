import { View, Text, ActivityIndicator, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExerData, WorkoutData, SplitDayData, WorkoutReturn, getLastWorkout, getSplitDay } from '../functions/ExerciseFunctions'
import { styles } from '../Styles';

/**
 * FINISH exercise container
 * CREATE new workout management system
 * 
 */

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
    const [newWorkout, setNewWorkout] = useState<WorkoutData[]>([])
    const [pressedIndex, setPressedIndex] = useState(0)
    

    useEffect(() => {
        async function initializeInfo(){
            try{
                setIsErr(false)

                const resp = await getSplitDay(splitDay)
                //if you can get splitday
                if(resp.statusCode === 200){
                    //prepare split day data
                    const data = await JSON.parse(resp.body)
                    setSplitDayData(data)

                    //DO NOT use splitDayData bc os async nature it does not update in time
                    const len = data.workouts.length
                    const prevWorkoutID = data.workouts[len - 1]
                    
                    if(len > 0){
                        // get and prepare workout exercise data
                        const res : WorkoutReturn = await getLastWorkout(prevWorkoutID)

                        console.log(res.statusCode)
                        if(res.statusCode === 200){
                            //console.log(res.body[0].info)
                            setPrevWorkout(res.body)
                            let arr : WorkoutData[] = []
                            for(const exer of res.body){
                                const len = exer.info[exer.info.length - 1].reps.length // acccess the number or reps
                                const falseArray = Array(len).fill(false) // create an array of all false
                                
                                const newEntry : WorkoutData = {
                                    "exercise" : exer,
                                    "confirmedName" : false,
                                    "confirmedResistance" : false,
                                    "confirmedReps" : falseArray,
                                    "confirmedNotes" : false
                                }
                                arr.push(newEntry)
                            }
                            setNewWorkout(arr)
                        }
                        else{
                            setIsErr(true)
                        }
                    }
                    else{
                        const blank : ExerData[] = [{
                            "ExerciseID" : "",
                            "exerciseName" : "New Exercise",
                            "info" : [{
                                "date" : "",
                                "workoutID": "",
                                "reps" : ["0", "0", "0"],
                                "notes" : "Notes.",
                                "sets" : 1,
                                "resistance" : 0
                            }],
                            "userID" : ""
                        }]

                        setPrevWorkout(blank)
                        let arr : WorkoutData[] = [{
                            "exercise" : blank[0],
                            "confirmedName" : false,
                            "confirmedResistance" : false,
                            "confirmedReps" : [false],
                            "confirmedNotes" : false
                        }]
                        setNewWorkout(arr)
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

    const exerciseContainer = (item: WorkoutData, index: number) => {
        const lastData = item.exercise.info[item.exercise.info.length - 1]
        
        /* UNSELECTED EXERCISES */
        if(index !== pressedIndex){
            return(
                <Pressable key={index} style={[styles.exerContainerUnpressed]} onPress= {() => setPressedIndex(index)}>
                    <View style={[styles.rowExer]}>
                        <Text style={[styles.textExer, styles.firstTextExer]}>{item.exercise.exerciseName}</Text>
                        <Text style={[styles.textExer, styles.resistTextExer]}>{lastData.resistance} lbs</Text>
                        <Text style={[styles.textExer, styles.repTextExer]}>{lastData.reps[0]}</Text>
                        <Text style={[styles.textExer, styles.repTextExer]}>{lastData.reps[1]}</Text>
                        <Text style={[styles.textExer, styles.repTextExer]}>{lastData.reps[2]}</Text> 
                    </View>
                </Pressable>   
            )
        }
        /* CURRENT EXERCISE */ 
        else{
            return(
                <Pressable key={index} style={[styles.exerContainerPressed]} onPress= {() => setPressedIndex(index)}>
                    <View style={styles.rowExer}>
                        <TextInput style={[styles.textInputExer, styles.firstInputExer]} placeholder={item.exercise.exerciseName} />
                        <TextInput style={[styles.textInputExer, styles.resistInputExer]} keyboardType="numeric" maxLength={4} placeholder={lastData.resistance.toString()} />
                        <TextInput style={[styles.textInputExer, styles.repInputExer]} keyboardType="numeric" maxLength={2} placeholder={lastData.reps[0]} />
                        <TextInput style={[styles.textInputExer, styles.repInputExer]} keyboardType="numeric" maxLength={2}placeholder={lastData.reps[1]} />
                        <TextInput style={[styles.textInputExer, styles.repInputExer]} keyboardType="numeric" maxLength={2} placeholder={lastData.reps[2]} />
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
                <View style={styles.form}>
                    <Text style={styles.heading}>Error Loading Data</Text>
                </View>
            )
        }
        else{
            return(
                <View style={styles.form}>
                    <Text style={styles.heading}>Workout: {splitDayData.splitDayName}</Text>
                    <ScrollView style={styles.scrollContExer}>
                        {newWorkout.map((item, index) => (exerciseContainer(item, index)))}
                    </ScrollView>
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