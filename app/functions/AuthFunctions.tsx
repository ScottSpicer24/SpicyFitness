import { signIn, signOut, fetchAuthSession, getCurrentUser} from 'aws-amplify/auth';

  

type SigninParameters = {
    user: string,
    password: string
};

export const handleSignOut = async () => {
    await signOut();
}

export const handleSignIn = async ({ user, password } : SigninParameters) => {
    try {
        const { isSignedIn, nextStep } = await signIn({ 
            username: user, 
            password: password,
            options: {
                authFlowType : 'USER_PASSWORD_AUTH'
            }
        });
        console.log(isSignedIn);
        console.log(nextStep);  

        return isSignedIn;
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
        /*console.log(`The username: ${username}`);
        console.log(`The userId: ${userId}`);
        console.log(`The signInDetails: ${signInDetails}`);*/
        return userId.toString()
    } catch (err) {
      console.log(err);
    }
  }
