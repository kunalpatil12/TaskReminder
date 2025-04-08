// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../services/auth';

interface AuthContextType {
  user: any;
  isLoading: boolean;
  login: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Check AsyncStorage for saved user data
        const storedUser = await AsyncStorage.getItem('@user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Set up Firebase auth listener
        const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
          if (firebaseUser) {
            // User is signed in
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || '',
              emailVerified: firebaseUser.emailVerified,
            };
            await AsyncStorage.setItem('@user', JSON.stringify(userData));
            setUser(userData);
          } else {
            // User is signed out
            await AsyncStorage.removeItem('@user');
            setUser(null);
          }
          setIsLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Auth state check error:', error);
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (email: string, password: string, name: string) => {
    console.log(email,password,name,"credentials");
    try {
      const { user: firebaseUser, emailVerified } = await loginUser(email, password);
      if (!emailVerified) {
        throw new Error('Email not verified');
      }

      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: name,
        emailVerified: firebaseUser.emailVerified,
      };

      await AsyncStorage.setItem('@user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('@user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


