import { View, Text, ActivityIndicator, Pressable, TextInput, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { ExerData, WorkoutData, SplitDayData, WorkoutReturn, getLastWorkout, getSplitDay, Stopwatch } from '../functions/ExerciseFunctions'
import { styles } from '../Styles';

/** TODOs: 
 *  ------
 * select prev workouts not in this workout currently
 * create a timer component 
 * create function to send AP call to log workout 
 * * --> might need to update the lambda function to account for confirmed bools
 * bloom filter of workouts to auto fill in as typing and API to get that data 
 * edit amount of sets. (probably skip this)
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
    
    const inputRefs = useRef<any>([]);

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
                                        "resistance": exer.info[exer.info.length - 1].resistance.toString(),
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

                        let arr : WorkoutData[] = [defaultNewWorkout]
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
                    updatedWorkouts[workoutIndex].exercise[key] = value;
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

    // confirms the input (auto is typed, from prev only is ---> is pressed)
    const confirmInput = () => {
        if (focusedInput) {
          const { workoutIndex, key, repIndex } = focusedInput;
          
          const updatedWorkouts = [...newWorkout];
          if (key === 'reps' && repIndex !== undefined) {
            updatedWorkouts[workoutIndex].confirmedReps[repIndex] = true;
            inputRefs.current[2 + repIndex + 1].focus();
          } else if (key === 'name') {
            updatedWorkouts[workoutIndex].confirmedName = true;
            console.log(inputRefs)
            inputRefs.current[1].focus();
          } else if (key === 'resistance') {
            updatedWorkouts[workoutIndex].confirmedResistance = true;
            inputRefs.current[2].focus();
          } else if (key === 'notes') {
            updatedWorkouts[workoutIndex].confirmedNotes = true;
            const len = updatedWorkouts.length
            if(pressedIndex + 1 < len){
                setPressedIndex(pressedIndex + 1)
            }
          }
          setNewWorkout(updatedWorkouts);
        }
    }

    const addExercise = () => {
        const updatedWorkouts = [...newWorkout];
        updatedWorkouts.splice(pressedIndex + 1, 0, { ...defaultNewWorkout });
        setNewWorkout(updatedWorkouts);
        setPressedIndex(pressedIndex + 1)
    }

    const removeExercise = () => {
        if(newWorkout.length == 1){
            Alert.alert('Error', 'Must have at least 1 exercise.', [{text: 'Close', onPress: () => console.log('Closed Pressed')}])
            return
        }

        const updatedWorkouts = [...newWorkout];
        updatedWorkouts.splice(pressedIndex, 1,);
        setNewWorkout(updatedWorkouts);
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
                            style={[styles.textInputExer, styles.fullWidthInputExer,
                                item.confirmedName ? styles.confirmedExerInputText : styles.unconfirmedExerInputText
                            ]} 
                            placeholder={item.exercise.name} 
                            value={item.confirmedName ? lastData.name : ""}
                            onChangeText={(text) => inputChange(index, 'name', text)}
                            autoFocus={true}
                            onFocus={() => handleFocus(index, 'name')}
                            ref={(el) => inputRefs.current[0] = el}
                        />
                    </View>
                    
                    {/* Row 2: RESISTANCE, REPS*/}
                    <View style={styles.rowExer}>
                        
                        <TextInput 
                            style={[styles.textInputExer, styles.resistInputExer,
                                item.confirmedResistance ? styles.confirmedExerInputText : styles.unconfirmedExerInputText
                            ]} 
                            keyboardType="numeric" 
                            maxLength={5} 
                            placeholder={lastData.resistance}
                            value={item.confirmedResistance ? lastData.resistance : ""} 
                            onChangeText={(text) => inputChange(index, 'resistance', text)}
                            onFocus={() => handleFocus(index, 'resistance')}
                            ref={(el) => inputRefs.current[1] = el}
                        />

                        {lastData.reps.map((rep, repIndex) => {
                            return (
                            <TextInput 
                                key={repIndex}
                                style={[styles.textInputExer, styles.repInputExer,
                                    item.confirmedReps[repIndex] ? styles.confirmedExerInputText : styles.unconfirmedExerInputText
                                ]} 
                                keyboardType="numeric" 
                                maxLength={2} 
                                placeholder={rep} 
                                value={item.confirmedReps[repIndex] ? rep : ""}
                                onChangeText={(text) => inputChange(index, 'reps', text, repIndex)}
                                onFocus={() => handleFocus(index, 'reps', repIndex)}
                                ref={(el) => inputRefs.current[2 + repIndex] = el}
                            />
                        )
                        })}
                        
                    </View> 
                    
                    {/* Row 3: NOTES*/}
                    <View style={styles.rowExer}>
                        <TextInput 
                            style={[styles.textInputExer, styles.fullWidthInputExer,
                                item.confirmedNotes ? styles.confirmedExerInputText : styles.unconfirmedExerInputText
                            ]} 
                            placeholder={lastData.notes} 
                            value={item.confirmedNotes ? lastData.notes : ""}
                            onChangeText={(text) => inputChange(index, 'notes', text)}
                            onFocus={() => handleFocus(index, 'notes')}
                            ref={(el) => inputRefs.current[2 + lastData.reps.length] = el}
                        />
                    </View>
                </Pressable>
                < Stopwatch />
                <View style={styles.rowExer} key={-1}>
                    <Pressable key={-1} style={[styles.buttonMed, styles.buttonExer]} onPress={() => console.log("select pressed")}>
                        <Text style={styles.text}> Select </Text>
                    </Pressable>
                    <Pressable key={-2} style={[styles.buttonMed, styles.buttonNext]} onPress={() => addExercise()}>
                        <Text style={styles.text}> + </Text>
                    </Pressable>
                    <Pressable key={-3} style={[styles.buttonMed, styles.buttonNext]} onPress={() => removeExercise()}>
                        <Text style={styles.text}> - </Text>
                    </Pressable>
                    <Pressable key={-4} style={[styles.buttonMed, styles.buttonExer]} onPress={() => confirmInput()}>
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
                        <Pressable style={styles.buttonLg}>
                            <Text style={styles.text}>Finish</Text>
                        </Pressable>
                        <View style={styles.bottomSpacer} />
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


const defaultNewWorkout: WorkoutData = {
    exercise: {
      exerciseID: "",
      name: "New Exercise",
      resistance: "0",
      sets: 3,
      reps: ["0", "0", "0"],
      notes: "Notes",
    },
    confirmedName: false,
    confirmedResistance: false,
    confirmedReps: [false, false, false],
    confirmedNotes: false,
  };

export default Workout