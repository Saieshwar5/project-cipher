"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, googleProvider } from '@/lib/firebase'; // Adjust path as needed
import { 
    User, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut,
    sendEmailVerification as firebaseSendEmailVerification, // Alias to avoid naming conflict
    sendPasswordResetEmail as firebaseSendPasswordResetEmail
} from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Using next/navigation for App Router

// Define the shape of your context data
interface AuthContextType {
  currentUser: User | null;
  loading: boolean; // For initial auth state check and async operations
  error: string | null; // For global auth errors
  signUpWithEmail: (email: string, password: string) => Promise<User | null>;
  signInWithEmail: (email: string, password: string) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  sendVerificationEmail: (user: User) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  clearError: () => void; // To clear errors manually if needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  const signUpWithEmail = async (email: string, password: string): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // setCurrentUser(userCredential.user); // onAuthStateChanged will handle this
      setLoading(false);
      return userCredential.user;
    } catch (err: any) {
      console.error("Context SignUp Error:", err);
      setError(err.message || "Failed to sign up.");
      setLoading(false);
      return null;
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // setCurrentUser(userCredential.user); // onAuthStateChanged will handle this
      setLoading(false);
      return userCredential.user;
    } catch (err: any) {
      console.error("Context SignIn Error:", err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("Invalid email or password.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Failed to sign in.");
      }
      setLoading(false);
      return null;
    }
  };

  const signInWithGoogle = async (): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // setCurrentUser(result.user); // onAuthStateChanged will handle this
      setLoading(false);
      return result.user;
    } catch (err: any) {
      console.error("Context Google SignIn Error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Google Sign-in was cancelled.');
      } else {
        setError(err.message || "Failed to sign in with Google.");
      }
      setLoading(false);
      return null;
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      // setCurrentUser(null); // onAuthStateChanged will handle this
      router.push('/login'); // Redirect on logout
    } catch (err: any)      {
      console.error("Context Logout Error:", err);
      setError(err.message || "Failed to log out.");
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationEmail = async (user: User): Promise<void> => {
    setLoading(true); // Or use a more specific loading state if preferred
    setError(null);
    try {
      await firebaseSendEmailVerification(user);
    } catch (err: any) {
      console.error("Context Send Verification Email Error:", err);
      setError(err.message || "Failed to send verification email.");
      throw err; // Re-throw to allow component to handle UI updates
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSendPasswordResetEmail(auth, email);
    } catch (err: any) {
      console.error("Context Password Reset Error:", err);
       if (err.code === 'auth/user-not-found') {
        setError("No user found with this email address.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Failed to send password reset email.");
      }
      throw err; // Re-throw
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    logout,
    sendVerificationEmail,
    sendPasswordReset,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};







   