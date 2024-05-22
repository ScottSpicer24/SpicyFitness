import { signIn, signOut} from 'aws-amplify/auth';
import RNRestart from 'react-native-restart';
  

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
