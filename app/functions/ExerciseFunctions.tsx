import { getIDToken, getCurrentUserID } from "./AuthFunctions";
import { getCurrentUser } from 'aws-amplify/auth';


export type Return = {
    statusCode : number,
    body : string
}

export type SplitData = {
    "active" : boolean,
    "description" : string,
    "splitDayID" : string[],
    "splitID" : string,
    "splitName" : string,
    "userID" : string
}

export type addSplitData = {
    "userID" : string,
    "splitName" : string,
    "description" : string,
    "splitDays" : string[]
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

    let response = await fetch(url, {
        method: "POST",
        headers: {
            'Authorization' : `Bearer ${idToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    response = await response.json();
    console.log("API call response: ", response);
}