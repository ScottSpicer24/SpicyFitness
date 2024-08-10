import { signIn, fetchAuthSession, getCurrentUser} from 'aws-amplify/auth';
import { AuthContext } from '../../authContext';
import { useContext }  from 'react'

type SigninParameters = {
    user: string,
    password: string
};



export const handleSignIn = async ({ user, password } : SigninParameters) => {

  
  try {
        const { isSignedIn, nextStep } = await signIn({ 
            username: user, 
            password: password,
            options: {
                authFlowType : 'USER_PASSWORD_AUTH'
            }
        });
        console.log(isSignedIn)
        console.log(nextStep)

        return isSignedIn
    } 
    catch (error) {
        console.log('error signing in', error);
        return false;
    }
}

export async function getIDToken(){
    try{
      const { tokens } = await fetchAuthSession();
      return tokens?.idToken;
    }
    catch (err) {
      console.log(err);
    }
  }

export async function getCurrentUserID() {
    try {
        const { username, userId, signInDetails } = await getCurrentUser();
        return userId.toString()
    } catch (err) {
      console.log(err);
    }
  }
