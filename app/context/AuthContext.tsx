import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

interface AuthContextType {
  isAuthenticated : boolean;
  setIsAuthenticated : React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the props interface for AuthProvider
interface AuthProviderProps {
  children : ReactNode;
}

// Create a no-op function for the default setIsAuthenticated
// This is a placeholder function that does nothing. It's used to satisfy TypeScript's requirement for a complete AuthContextType object.
const defaultSetIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> = () => {};

// Create the Auth context with default value
export const AuthContext = createContext<AuthContextType>({isAuthenticated : false, setIsAuthenticated : defaultSetIsAuthenticated});

/*
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => { 
        const checkAuthStatus = async () => {
            try {
                await fetchAuthSession();
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

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
*/
