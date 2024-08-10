import { createContext, useState, useEffect } from 'react';
import { fetchAuthSession, getCurrentUser} from 'aws-amplify/auth';

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => {},
  });

const AuthProvider = ({ children } : any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          //const { tokens, credentials, identityId, userSub } = await fetchAuthSession();
          await fetchAuthSession();
          
          const { username, signInDetails } = await getCurrentUser();
          console.log(username);
          console.log(signInDetails);
          
          setIsAuthenticated(true);
        } 
        catch {
          setIsAuthenticated(false);
        }
      };
  
      checkAuthStatus();
    }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };