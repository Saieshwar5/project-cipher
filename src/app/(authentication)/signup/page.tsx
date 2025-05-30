
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { useRouter } from "next/navigation";
import { User, getAuth } from "firebase/auth"; // Import User type and getAuth function
import Link from "next/link";

const firebaseAuthInstance = getAuth(); // Initialize auth instance

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [formLoading, setFormLoading] = useState(false); 
  const [googleFormLoading, setGoogleFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null); 

  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [isCheckingVerification, setIsCheckingVerification] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);

  const { 
    signUpWithEmail, 
    signInWithGoogle, 
    sendVerificationEmail, 
    currentUser, 
    loading: authLoading, 
    error: authError,
    clearError: clearAuthError
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser && !verificationEmailSent) { // If user is somehow already logged in and not in verification flow
      // router.push("/"); 
    }
  }, [currentUser, router, verificationEmailSent]);

  useEffect(() => {
    if (authError) {
      setFormError(authError); // Display global auth errors from context
    }
  }, [authError]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    else if (id === "password") setPassword(value);
    else if (id === "confirm-password") setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    clearAuthError();
    setVerificationMessage(null);

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    setFormLoading(true);
    const user = await signUpWithEmail(email, password);
    if (user) {
      try {
        await sendVerificationEmail(user);
        setVerificationEmailSent(true);
        setVerificationMessage(`A verification email has been sent to ${email}. Please check your inbox (and spam folder), click the verification link, and then click "Check Verification & Proceed" below.`);
        setPassword("");
        setConfirmPassword("");
      } catch (verificationError: any) {
        setFormError(verificationError.message || "Failed to send verification email.");
      }
    } else {
      // Error is set in context, useEffect will pick it up
    }
    setFormLoading(false);
  };

  const handleGoogleAuth = async () => {
    setFormError(null);
    clearAuthError();
    setVerificationMessage(null);
    setGoogleFormLoading(true);
    const user = await signInWithGoogle();
    if (user) {
      router.push("/users"); 
    } else {
      // Error is set in context
    }
    setGoogleFormLoading(false);
  };

  const handleCheckVerification = async () => {
    setFormError(null);
    setVerificationMessage(null);
    setIsCheckingVerification(true);
    
    // Use firebaseAuthInstance.currentUser to ensure we're getting the latest from the SDK instance
    // after a potential external action (clicking email link).
    const userToCheck = firebaseAuthInstance.currentUser; 

    if (userToCheck) {
      try {
        await userToCheck.reload(); 
        const refreshedUser = firebaseAuthInstance.currentUser;

        if (refreshedUser && refreshedUser.emailVerified) {
          setVerificationMessage("Email verified successfully! Redirecting...");
          router.push("/"); 
        } else {
          setVerificationMessage("Email not yet verified. Please ensure you've clicked the link in your email and try again.");
        }
      } catch (reloadError: any) {
        console.error("Error reloading user:", reloadError);
        setVerificationMessage(reloadError.message || "Could not check verification status. Please try again.");
      }
    } else {
      setVerificationMessage("You are not signed in. Please sign up or log in.");
    }
    setIsCheckingVerification(false);
  };

  const handleResendVerificationEmail = async () => {
    setFormError(null);
    setVerificationMessage(null);
    setResendLoading(true);
    const userToResend = firebaseAuthInstance.currentUser; // Use the direct auth instance
    if (userToResend) {
      try {
        await sendVerificationEmail(userToResend); // Call context function
        setVerificationMessage("A new verification email has been sent. Please check your inbox.");
      } catch (err: any) {
        setVerificationMessage(err.message || "Failed to resend verification email.");
      }
    } else {
      setVerificationMessage("No user found to resend verification email. Please sign up again.");
    }
    setResendLoading(false);
  };

  if (authLoading && !currentUser && !verificationEmailSent) {
     return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
        </div>

        {formError && <p className="text-red-500 text-sm text-center mb-4">{formError}</p>}
        {verificationMessage && <p className="text-blue-600 text-sm text-center mb-4">{verificationMessage}</p>}

        {!verificationEmailSent ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="email">Email</label>
                <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow" required value={email} onChange={handleOnChange} disabled={formLoading || googleFormLoading} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="password">Password</label>
                <input type="password" id="password" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow" required value={password} onChange={handleOnChange} disabled={formLoading || googleFormLoading} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow" required value={confirmPassword} onChange={handleOnChange} disabled={formLoading || googleFormLoading} />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-semibold transition-colors disabled:opacity-50 flex items-center justify-center" disabled={formLoading || googleFormLoading}>
                {formLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                {formLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Already have an account? <Link href="/login" className="text-blue-600 hover:underline font-medium">Log in</Link></p>
            </div>
            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button onClick={handleGoogleAuth} className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-md font-medium border border-gray-300 shadow-sm transition-all hover:shadow-md disabled:opacity-50" disabled={formLoading || googleFormLoading}>
              {googleFormLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {googleFormLoading ? 'Signing In...' : 'Sign Up with Google'}
            </button>
          </>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-lg font-semibold text-gray-700">Check Your Email</p>
            <button onClick={handleCheckVerification} disabled={isCheckingVerification || resendLoading} className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md font-semibold transition-colors disabled:opacity-50 flex items-center justify-center">
              {isCheckingVerification && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {isCheckingVerification ? 'Checking...' : 'Check Verification & Proceed'}
            </button>
            <button onClick={handleResendVerificationEmail} disabled={isCheckingVerification || resendLoading} className="w-full bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-md font-semibold transition-colors disabled:opacity-50 flex items-center justify-center">
              {resendLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {resendLoading ? 'Sending...' : 'Resend Verification Email'}
            </button>
             <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">Changed your mind or already verified? <Link href="/login" className="text-blue-600 hover:underline font-medium">Log in</Link></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}