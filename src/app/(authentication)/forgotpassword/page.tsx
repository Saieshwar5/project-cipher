"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import Link from "next/link"; 

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  // Local success message, as this is specific to this page's flow
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // Local error for form-specific feedback, can be populated by context's error
  const [formError, setFormError] = useState<string | null>(null);
  // Local loading for button state
  const [pageLoading, setPageLoading] = useState(false);

  const { 
    sendPasswordReset, 
    loading: authLoading, // Context's global loading state
    error: authError,     // Context's global error state
    clearError: clearAuthError 
  } = useAuth();

  // Effect to display errors from context
  useEffect(() => {
    if (authError) {
      setFormError(authError);
      setSuccessMessage(null); // Clear success if there's a new error
    }
  }, [authError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);      // Clear local error
    setSuccessMessage(null); // Clear local success message
    clearAuthError();        // Clear any existing global errors from context
    setPageLoading(true);

    try {
      await sendPasswordReset(email);
      setSuccessMessage("Password reset email sent! Please check your inbox (and spam folder).");
      setEmail(""); // Clear email field on success
    } catch (err) {
      // Error is already set in context by sendPasswordReset if it throws
      // The useEffect above will pick it up and set formError.
      // If sendPasswordReset doesn't throw but still fails (e.g. returns a value indicating failure),
      // you might need additional logic here, but typically it throws on failure.
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Forgot Password</h2>
        
        {formError && !successMessage && <p className="text-red-500 text-sm text-center mb-4">{formError}</p>}
        {successMessage && <p className="text-green-600 text-sm text-center mb-4">{successMessage}</p>}
        
        {!successMessage && ( 
          <>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                disabled={pageLoading || authLoading} // Disable if page is loading or context is globally loading
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50 flex items-center justify-center"
              disabled={pageLoading || authLoading}
            >
              {(pageLoading || authLoading) && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {(pageLoading || authLoading) ? 'Sending...' : 'Send Reset Link'}
            </button>
          </>
        )}

        <p className="mt-8 text-sm text-center text-gray-600">
          Remembered your password?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
        {successMessage && (
            <p className="mt-4 text-sm text-center text-gray-600">
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                    Back to Login
                </Link>
            </p>
        )}
      </form>
    </div>
  );
}