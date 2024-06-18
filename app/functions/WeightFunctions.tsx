import { getIDToken, getCurrentUserID } from "./AuthFunctions";
import { getCurrentUser } from 'aws-amplify/auth';


export type WeightReturn = {
    body : {
        date: string,
        weight: string
    },
    statusCode : number
}

export type WeightArrayReturn = {
    body : string,
    statusCode : number
}

export async function getCurrentWeight() : Promise<WeightReturn> {
    const resp = await getCurrentUser()
    const idToken = await getIDToken()

    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/weight?userID=" +  resp.userId

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
        const data : WeightReturn = await apiResp.json();
        return data
    }
    catch (error){
        console.error('Error fetching weight data:', error);
        throw error;
    }    
}

export async function postWeight(weight : string){
    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/weight";

    const data = {
        "userID" : await getCurrentUserID(),
        "weight" : weight
    }
    
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

export async function getAllWeights() : Promise<WeightArrayReturn>{
    const resp = await getCurrentUser()
    const idToken = await getIDToken()

    const url = "https://mtpngyp1o4.execute-api.us-east-1.amazonaws.com/dev/weight-all?userID=" +  resp.userId

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
        const data : WeightArrayReturn = await apiResp.json();
        return data
    }
    catch (error){
        console.error('Error fetching weight data:', error);
        throw error;
    } 
}