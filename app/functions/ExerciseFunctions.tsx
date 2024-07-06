import { getIDToken, getCurrentUserID } from "./AuthFunctions";
import { getCurrentUser } from 'aws-amplify/auth';


export type Return = {
    statusCode : number,
    body : string
}

export type WorkoutReturn = {
    statusCode : number,
    body : ExerData[]
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
    },
    "userID" : string
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

