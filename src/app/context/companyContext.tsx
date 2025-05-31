"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

import { useAuth } from "./AuthContext";

// Define the shape of your company details
export interface CompanyDetails {
  companyName: string;
  companyDomain: string;
  operatingSectors: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country: string;
  companySize: string;
  yearFounded: string;
  companyMission: string;
  companyWebsite: string;
 
}

// Define the context value type
interface CompanyContextType {
  company: CompanyDetails | null;
  setCompany: (data: CompanyDetails) => void;
  loading: boolean;
}

// Create the context
const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// Provider component
export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const[userid, setUserId] = useState<string | null>(null);
  const { currentUser } = useAuth();

  
  useEffect(() => {
   
    const fetchCompanyDetails = async () => {
      try {

        if (!currentUser) {
          console.warn("No user is currently authenticated.");
          setLoading(false);
          return;
        }
    
          setLoading(true);
        setUserId(currentUser.uid);
        // Simulate an API call to fetch company details
        const response = await fetch(`http://localhost:3001/api/company-profile?userId=${currentUser.uid}`); // Adjust the endpoint as needed
        if (!response.ok) {

           if (response.status === 404) {
            // Profile not found for this user - this is an expected case for new users
            console.log(`No company profile found for user ${currentUser.uid}. User may need to create one.`);
            setCompany(null);
           }
          throw new Error("Failed to fetch company details");
        }
        const output: CompanyDetails = await response.json();
            console.log("Fetched company details:", output);
        setCompany(output.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [currentUser]); 

  return (
    <CompanyContext.Provider value={{ company, setCompany, loading }}>
      {children}
    </CompanyContext.Provider>
  );
}

// Custom hook to use the company context
export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}