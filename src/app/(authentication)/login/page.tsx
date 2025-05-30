"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { useRouter } from "next/navigation";
import Link from "next/link"; // For navigation links

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Local loading states for button feedback
  const [emailLoginLoading, setEmailLoginLoading] = useState(false);
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);
  
  // Local error state for form-specific errors
  const [formError, setFormError] = useState<string | null>(null);

  const { 
    signInWithEmail, 
    signInWithGoogle, 
    currentUser, 
    loading: authLoading, // Context's global loading (e.g., initial auth check)
    error: authError, // Context's global error
    clearError: clearAuthError 
  } = useAuth();
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      router.push("/"); // Or to dashboard
    }
  }, [currentUser, router]);

  // Display global auth errors locally
  useEffect(() => {
    if (authError) {
      setFormError(authError);
    }
  }, [authError]);

  const handleEmailAndPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Clear local error
    clearAuthError();   // Clear global error from context
    setEmailLoginLoading(true);

    const user = await signInWithEmail(email, password);
    if (user) {
      // router.push("/"); // onAuthStateChanged in context or useEffect above will handle redirect
    } else {
      // Error is set in context, useEffect will pick it up
      // Or you can set a more specific local error if needed
    }
    setEmailLoginLoading(false);
  };

  const handleGoogleLogin = async () => {
    setFormError(null);
    clearAuthError();
    setGoogleLoginLoading(true);
    
    const user = await signInWithGoogle();
    if (user) {
       router.push("/users"); // onAuthStateChanged in context or useEffect above will handle redirect
    } else {
      // Error is set in context
    }
    setGoogleLoginLoading(false);
  };

  // Show a loading indicator while the initial auth state is being determined
  if (authLoading && !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p> {/* Replace with a proper spinner/loader */}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleEmailAndPasswordLogin} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h2>
        
        {formError && <p className="text-red-500 text-sm text-center mb-4">{formError}</p>}
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            disabled={emailLoginLoading || googleLoginLoading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            disabled={emailLoginLoading || googleLoginLoading}
          />
        </div>
        
        <div className="mb-4 text-right">
            <Link href="/forgotpassword" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50 flex items-center justify-center"
          disabled={emailLoginLoading || googleLoginLoading}
        >
          {emailLoginLoading && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          )}
          {emailLoginLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-md font-medium border border-gray-300 shadow-sm transition-all hover:shadow-md disabled:opacity-50"
          onClick={handleGoogleLogin}
          disabled={emailLoginLoading || googleLoginLoading}
        >
          {googleLoginLoading && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          )}
          {googleLoginLoading ? 'Signing in...' : 'Login with Google'}
        </button>

        <p className="mt-8 text-sm text-center text-gray-600">
          Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
