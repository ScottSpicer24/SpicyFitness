import { View, Text, ActivityIndicator, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExerData, WorkoutData, SplitDayData, WorkoutReturn, getLastWorkout, getSplitDay } from '../functions/ExerciseFunctions'
import { styles } from '../Styles';

/** TODOs: 
 *  ------
 * position ---> button 
 * center text input on focus
 * automatically go to next when ---> clcked (fill in if empty or partial, don't if not)
 * select prev workouts
 * create a timer component next to --->
 * create function to send AP call to log workout
 * bloom filter of workouts to auto fill in as typing and API to get that data
 * edit amount of sets.
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
    const [focusedInput, setFocusedInput] = useState<{ workoutIndex: number; key: keyof WorkoutData['exercise']; repIndex?: number } | null>(null);
    

    /* 
    for the new workout has the data for each exercise and whether it is confirmed.
    unconfrimed means it is from prev workout.
    get the data from the prev workout of this split day and fill it in the new workout, all unconfirmed.
    if none fill with an empty one.
    */
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
                                    "exercise" : {
                                        "exerciseID": "",
                                        "name": exer.exerciseName,
                                        "resistance": exer.info[exer.info.length - 1].resistance,
                                        "sets": len,
                                        "reps": exer.info[exer.info.length - 1].reps,
                                        "notes": exer.info[exer.info.length - 1].notes
                                    },
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
                            "exercise" : {
                                "exerciseID": "",
                                "name": "",
                                "resistance": 0,
                                "sets": 3,
                                "reps": ["0", "0", "0"],
                                "notes": ""
                            },
                            "confirmedName" : false,
                            "confirmedResistance" : false,
                            "confirmedReps" : [false, false, false],
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

    /* 
    designed to handle updates to the TextInput components 
    and update the relevant part of the WorkoutData state. 
    It can handle both top-level properties of ExerData 
    and nested properties inside the info array within ExerData. 
    */
    const inputChange = (
        workoutIndex: number,  // Index of the WorkoutData item in the workouts array
        key: string,           // Key of the top-level property or 'exercise' array key
        value: string,         // New value to be set
        repIndex?: number,    // Optional: Index of the rep array item (if updating a nested property)
    ) => {
        // Step 1: Create a copy of the current workouts state
        const updatedWorkouts = [...newWorkout];

        if (key === 'reps' && repIndex !== undefined) {
            // Update the specific rep in the reps array
            updatedWorkouts[workoutIndex].exercise.reps[repIndex] = value as string;
            updatedWorkouts[workoutIndex].confirmedReps[repIndex] = true;
        }
        else{
            switch (key) {
                case 'name':
                    // Update the property in the copied state and confirm it
                    updatedWorkouts[workoutIndex].exercise[key] = value;
                    updatedWorkouts[workoutIndex].confirmedName = true
                    break;
                case 'notes':
                    updatedWorkouts[workoutIndex].exercise[key] = value;
                    updatedWorkouts[workoutIndex].confirmedNotes = true
                    break
                case 'exerciseID':
                    updatedWorkouts[workoutIndex].exercise[key] = value;
                    break
                case 'resistance':
                    let newResistance : number = Number(value)
                    updatedWorkouts[workoutIndex].exercise[key] = newResistance;
                    // confirm it 
                    updatedWorkouts[workoutIndex].confirmedResistance = true

                    break
                case 'sets':
                    let newValue: number = parseInt(value as string, 10);
                    updatedWorkouts[workoutIndex].exercise[key] = newValue;
                    break
                default:
                    setIsErr(true)
                    break;
            }
        }

        setNewWorkout(updatedWorkouts)
    }

    const confirmInput = () => {
        if (focusedInput) {
          const { workoutIndex, key, repIndex } = focusedInput;
          const updatedWorkouts = [...newWorkout];
          if (key === 'reps' && repIndex !== undefined) {
            updatedWorkouts[workoutIndex].confirmedReps[repIndex] = true;
          } else if (key === 'name') {
            updatedWorkouts[workoutIndex].confirmedName = true;
          } else if (key === 'resistance') {
            updatedWorkouts[workoutIndex].confirmedResistance = true;
          } else if (key === 'notes') {
            updatedWorkouts[workoutIndex].confirmedNotes = true;
          }
          setNewWorkout(updatedWorkouts);
        }
    }

    const handleFocus = (workoutIndex: number, key: keyof WorkoutData['exercise'], repIndex?: number) => {
        setFocusedInput({ workoutIndex, key, repIndex });
        //this.scrollViewRef.current.scrollTo({ y: focusedItemOffset, animated: true });
    }

    const repContainer = (reps : string, index: number, confirmed : boolean) => {
        return (
            <Text key={index} style={[styles.textExer, 
                styles.repTextExer,
                confirmed ? styles.confirmedExerText : styles.unconfirmedExerText]}>
            {reps}</Text>
        )
    }

    const exerciseContainer = (item: WorkoutData, index: number) => {
        const lastData = item.exercise

        /* UNSELECTED EXERCISES */
        if(index !== pressedIndex){
            return(
                <Pressable key={index} style={[styles.exerContainerUnpressed]} onPress= {() => setPressedIndex(index)}>
                    <View style={[styles.rowExer]}>
                        <Text style={[styles.textExer, 
                            styles.firstTextExer, 
                            item.confirmedName ? styles.confirmedExerText : styles.unconfirmedExerText]}>
                            {item.exercise.name}</Text>
                        <Text style={[styles.textExer, 
                            styles.resistTextExer, 
                            item.confirmedResistance ? styles.confirmedExerText : styles.unconfirmedExerText]}>
                            {lastData.resistance} lbs</Text>
                        {lastData.reps.map((rep, index) => (repContainer(rep, index, item.confirmedReps[index])))}
                    </View>
                </Pressable>   
            )
        }
        /* CURRENT EXERCISE */ 
        else{
            return(
                <>
                <Pressable key={index} style={[styles.exerContainerPressed]} onPress= {() => setPressedIndex(index)}>
                    {/* Row 1: NAME*/}
                    <View style={styles.rowExer}>
                        <TextInput 
                            style={[styles.textInputExer, styles.fullWidthInputExer]} 
                            placeholder={item.exercise.name} 
                            value={item.confirmedName ? lastData.name : ""}
                            onChangeText={(text) => inputChange(index, 'name', text)}
                            onFocus={() => handleFocus(index, 'name')}
                        />
                    </View>
                    
                    {/* Row 2: RESISTANCE, REPS*/}
                    <View style={styles.rowExer}>
                        
                        <TextInput 
                            style={[styles.textInputExer, styles.resistInputExer]} 
                            keyboardType="numeric" 
                            maxLength={4} 
                            placeholder={lastData.resistance.toString()}
                            value={item.confirmedResistance ? lastData.resistance.toString() : ""} 
                            onChangeText={(text) => inputChange(index, 'resistance', text)}
                            onFocus={() => handleFocus(index, 'resistance')}
                        />

                        {lastData.reps.map((rep, repIndex) => {
                            return (
                            <TextInput 
                                key={repIndex}
                                style={[styles.textInputExer, styles.repInputExer]} 
                                keyboardType="numeric" 
                                maxLength={2} 
                                placeholder={rep} 
                                value={item.confirmedReps[repIndex] ? rep : ""}
                                onChangeText={(text) => inputChange(index, 'reps', text, repIndex)}
                                onFocus={() => handleFocus(index, 'reps', repIndex)}
                            />
                        )
                        })}
                        
                    </View> 
                    
                    {/* Row 3: NOTES*/}
                    <View style={styles.rowExer}>
                        <TextInput 
                            style={[styles.textInputExer, styles.fullWidthInputExer]} 
                            placeholder={lastData.notes} 
                            value={item.confirmedNotes ? lastData.notes : ""}
                            onChangeText={(text) => inputChange(index, 'notes', text)}
                            onFocus={() => handleFocus(index, 'notes')}
                        />
                    </View>
                </Pressable>
                <View style={styles.rowExer}>
                    <Pressable key={-1} style={[styles.buttonMed, styles.buttonExer]} onPress={() => console.log("select pressed")}>
                        <Text style={styles.text}> Select Exercise </Text>
                    </Pressable>
                    <Pressable key={-2} style={[styles.buttonMed, styles.buttonNext]} onPress={() => confirmInput()}>
                        <Text style={styles.text}> ---{'>'} </Text>
                    </Pressable>
                </View>
                
                </>
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
                    <ScrollView style={styles.scrollContExer} keyboardShouldPersistTaps="handled">
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