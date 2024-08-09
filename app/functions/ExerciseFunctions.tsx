import { getIDToken } from "./AuthFunctions";
import { getCurrentUser } from 'aws-amplify/auth';
import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { styles } from '../Styles';

export type Return = {
    statusCode : number,
    body : string
}

export type WorkoutReturn = {
    statusCode : number,
    body : ExerData[]
}

export type AllExercisesReturn = {
    statusCode : number,
    body : ExerDataShort[]
}

export type SplitData = {
    "active" : boolean,
    "description" : string,
    "splitDays" : {
        "splitDayID" : string,
        "active" : boolean
    }[],
    "splitID" : string,
    "splitName" : string,
    "userID" : string
}

export type SplitDayData = {
    "splitDayID" : string,
    "splitDayName" : string,
    "exercises" : string[],
    "splitID" : string,
    "workouts" : string[],
}

export type addSplitData = {
    "userID" : string,
    "splitName" : string,
    "description" : string,
    "splitDays" : string[]
}

export type ExerData = {
    "ExerciseID" : string,
    "exerciseName" : string,
    "info" : {
        "date" : string,
        "workoutID": string,
        "reps" : string[],
        "notes" : string,
        "sets" : number,
        "resistance" : number
    }[],
    "userID" : string
}

export type ExerDataShort = {
    "ExerciseID" : string,
    "exerciseName" : string,
    "info" : {
        "date" : string,
        "workoutID": string,
        "reps" : string[],
        "notes" : string,
        "sets" : number,
        "resistance" : number
    },
    "userID" : string
}

export type WorkoutData = {
    "exercise" : {
        "exerciseID": string,
        "name": string,
        "resistance": string,
        "sets": number,
        "reps": string[],
        "notes": string
      },
    "confirmedName" : boolean,
    "confirmedResistance" : boolean,
    "confirmedReps" : boolean[],
    "confirmedNotes" : boolean
}


export async function getSplitsAll() : Promise<Return>{
    const resp = await getCurrentUser()
    const idToken = await getIDToken()

    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/splits?userID=" +  resp.userId

    try{
        const apiResp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        })
        if (!apiResp.ok) {
            throw new Error('Network response was not ok');
        }
        const data : Return = await apiResp.json();
        return data
    }
    catch (error){
        console.error('Error fetching Splits:', error);
        throw error;
    }    
}

export async function addSplit(data : addSplitData) {
    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/splits";
        
    const idToken = await getIDToken()

    try{
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization' : `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const resp: Return = await response.json()
        console.log("API call response: ", response);

        return resp.statusCode
    }
    catch (error){
        console.error('Error fetching Splits:', error);
        throw error;
    } 

}

export async function toggleActiveSplit(deactivateID : string, activateID : string){
    const idToken = await getIDToken()
    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/toggle-active-split"
    const data = {
        "deactivate": deactivateID,
        "activate": activateID
    }

    try{
        const apiResp = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!apiResp.ok) {
            throw new Error('Network response was not ok');
        }

        const resp : Return = await apiResp.json();
        return resp.statusCode
    }
    catch (error){
        console.error('Error fetching Splits:', error);
        throw error;
    } 
}

export async function getActiveSplit(){
    const resp = await getCurrentUser()
    const idToken = await getIDToken()
    
    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/toggle-active-split?userID=" + resp.userId

    try{
        const apiResp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        })
        if (!apiResp.ok) {
            throw new Error('Network response was not ok');
        }
        const data : Return = await apiResp.json();
        return data
    }
    catch (error){
        console.error('Error fetching Active Splits:', error);
        throw error;
    }    
}

export async function getSplitDay(splitDayID : string){
    const idToken = await getIDToken()
    
    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/split-day?splitDayID=" + splitDayID

    try{
        const apiResp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        })
        if (!apiResp.ok) {
            console.log(apiResp);
            throw new Error('Network response was not ok');
        }
        const data : Return = await apiResp.json();
        return data
    }
    catch (error){
        console.error('Error fetching Active Splits:', error);
        throw error;
    }    
}

export async function getSplitDayName(splitDayID : string){
    const idToken = await getIDToken()
    
    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/split-day-name?splitDayID=" + splitDayID

    try{
        const apiResp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        })
        if (!apiResp.ok) {
            console.log(apiResp);
            throw new Error('Network response was not ok');
        }
        const data : Return = await apiResp.json();
        return data.body
    }
    catch (error){
        console.error('Error fetching Active Splits:', error);
        throw error;
    }    
}

export async function getLastWorkout(workoutID : string){
    const idToken = await getIDToken()
    
    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/workout-info?workoutID=" + workoutID

    try{
        const apiResp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        })
        if (!apiResp.ok) {
            console.log(apiResp);
            throw new Error('Network response was not ok');
        }
        const data : WorkoutReturn = await apiResp.json();
        return data
    }
    catch (error){
        console.error('Error fetching workout:', error);
        throw error;
    }  
}

export async function getAllExercises(splitDayID : string){
    const idToken = await getIDToken()
    
    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/exercise-all?splitDayID=" + splitDayID

    try{
        const apiResp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        })
        if (!apiResp.ok) {
            console.log(apiResp);
            throw new Error('Network response in getAllExercises function was not ok');
        }
        const data : AllExercisesReturn = await apiResp.json();
        return data
    }
    catch (error){
        console.error('Error fetching All Exercises:', error);
        throw error;
    }  
    
}


export async function logWorkout(userID : string, splitDayID : string, workoutData : WorkoutData[]){
    const idToken = await getIDToken()
    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/logWorkout"
    const data = {
        "userID": userID,
        "splitDayID": splitDayID,
        "exercises" : workoutData
    }

    try{
        const apiResp = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!apiResp.ok) {
            console.log("return logging workout: ", apiResp)
            throw new Error('Network response in logWorkout function was not ok');
        }

        const resp : Return = await apiResp.json();
        console.log("return logging workout: ", resp)
        return resp
    }
    catch (error){
        console.error('Error fetching Splits:', error)
        throw error;
    } 
}

export const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
            setTime(Date.now() - startTimeRef.current)
          }, 10) // Update every 10 milliseconds
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null // Clear the interval reference
            }
        }
    
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null // Clear the interval reference
            }
        }
      }, [running]);
  
    const startStopwatch = () => {
        setRunning(true)
        startTimeRef.current = Date.now() - time
        console.log(startTimeRef.current)
    }

    const resetStopwatch = () => {
        setRunning(false)
        console.log("reset time")  
        setTime(0)
    }

    const formatTime = () => {
        let min =  Math.floor(time / (1000 * 60)).toString().padStart(2, '0')
        let sec =  Math.floor(time / (1000) % 60).toString().padStart(2, '0')
        let ms =  Math.floor(time % (1000)).toString().padStart(3, '0')
        return `${min}:${sec}.${ms}`
    }

  return (
     <Pressable style={[styles.buttonSW, styles.buttonExer]} onPress={() => running ? resetStopwatch() : startStopwatch()}>
        <Text style={styles.text}>{formatTime()}</Text>
    </Pressable>
  )
}

