"use client"; // Required if you plan to add interactivity (state, handlers)

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'; // Import useState if you'll manage form data

import { useCompany } from '@/app/context/companyContext';
import { useAuth } from '@/app/context/AuthContext';



interface CompanyProfileFormData {
  companyName: string;
  companyDomain: string;
  operatingSectors: string; // Could be comma-separated, or you might use a multi-select later
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country: string;
  companySize: string; // e.g., "1-10 employees", "11-50", etc. or a number
  yearFounded: string;
  companyMission: string;
  companyWebsite: string; // Though domain might imply this, explicit is good
 
  // Add other relevant fields as needed
}

const initialFormData: CompanyProfileFormData = {
  companyName: "",
  companyDomain: "",
  operatingSectors: "",
  contactEmail: "",
  contactPhone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  stateOrProvince: "",
  postalCode: "",
  country: "",
  companySize: "",
  yearFounded: "",
  companyMission: "",
  companyWebsite: "",
};


export default function CompanyProfilePage() {
  const [formData, setFormData] = useState<CompanyProfileFormData>( initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { company, setCompany, loading: companyLoading }= useCompany();
   const { currentUser } = useAuth();

        console.log("this is the final company data:", formData);

   useEffect(() => {
       if (!companyLoading && company) {
    
      const profileData = { ...initialFormData, ...company };
      setFormData(profileData);

      console.log("Company data loaded123:", profileData);
       setIsEditing(false); 
       }

       else if(!companyLoading && !company) {
        console.warn("No company data found. Initializing with empty form data.");
        setFormData(initialFormData);
        setIsEditing(true);
       }
    
  
}, [company, companyLoading]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

         
    if (!formData.companyName || !formData.contactEmail) {
      setError("Company Name and Contact Email are required.");
      setIsLoading(false);
      return;
    }

        const profileDataToSend = {
      ...formData,
      userId: currentUser?.uid,
          };
        console.log("Submitting Company Profile:", profileDataToSend);   
     try {


              const method = company ? 'PUT' : 'POST'; 
               const endpoint = `http://localhost:3001/api/company-profile`;

      const response = await fetch(endpoint, {
        method: method, // or 'PUT' if updating
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileDataToSend),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save company profile.");
      }
      const savedProfile= await response.json();
      setCompany(savedProfile.data); // Update the global context
      setFormData(savedProfile.data);
      setIsEditing(false); // Also update local form data to match saved state
      setSuccessMessage("Company profile saved successfully!");

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
     } finally {
      setIsLoading(false);
    }

  };

 const handleToggleEdit = () => {
    setError(null);
    setSuccessMessage(null);
    if (isEditing) {
      // If currently editing, "Cancel" the edit
      if (company) {
        // Revert to the data currently in context
        const profileData = { ...initialFormData, ...company };
        setFormData(profileData);
      } else {
        // If it was a new form, revert to initial empty state
        setFormData(initialFormData);
      }
      setIsEditing(false); // Go to view mode
    } else {
      // If in view mode, "Enable" editing
      setIsEditing(true); // Go to edit mode
    }
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const labelClass = "block text-sm font-medium text-slate-700";

 return (
    <div className="flex flex-col items-center w-full p-4 md:p-8 gap-6 bg-slate-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 md:p-10 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">Company Profile</h1>
        <p className="text-sm text-slate-600 mb-8 text-center">
          {company ? (isEditing ? "You are currently editing your profile." : "View your company profile.") : "Create your company profile."}
        </p>

        {error && <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md border border-red-300">{error}</div>}
        {successMessage && <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-md border border-green-300">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className={labelClass}>Company Name <span className="text-red-500">*</span></label>
                <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} className={inputClass} required disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="companyDomain" className={labelClass}>Company Domain <span className="text-red-500">*</span></label>
                <input type="url" name="companyDomain" id="companyDomain" placeholder="https://example.com" value={formData.companyDomain} onChange={handleChange} className={inputClass} required disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="companyWebsite" className={labelClass}>Company Website</label>
                <input type="url" name="companyWebsite" id="companyWebsite" placeholder="https://example.com" value={formData.companyWebsite} onChange={handleChange} className={inputClass} disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="yearFounded" className={labelClass}>Year Founded</label>
                <input type="number" name="yearFounded" id="yearFounded" placeholder="e.g., 2005" value={formData.yearFounded} onChange={handleChange} className={inputClass} disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="companySize" className={labelClass}>Company Size</label>
                <select name="companySize" id="companySize" value={formData.companySize} onChange={handleChange} className={inputClass} disabled={!isEditing}>
                  <option value="">Select size...</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="1001+">1001+ employees</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="operatingSectors" className={labelClass}>Operating Sectors (comma-separated)</label>
              <input type="text" name="operatingSectors" id="operatingSectors" placeholder="e.g., Technology, Healthcare, Finance" value={formData.operatingSectors} onChange={handleChange} className={inputClass} disabled={!isEditing} />
            </div>
             <div className="mt-6">
              <label htmlFor="companyMission" className={labelClass}>Company Mission / About Us</label>
              <textarea name="companyMission" id="companyMission" rows={4} value={formData.companyMission} onChange={handleChange} className={inputClass} placeholder="Briefly describe your company..." disabled={!isEditing}></textarea>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactEmail" className={labelClass}>Contact Email <span className="text-red-500">*</span></label>
                <input type="email" name="contactEmail" id="contactEmail" placeholder="contact@example.com" value={formData.contactEmail} onChange={handleChange} className={inputClass} required disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="contactPhone" className={labelClass}>Contact Phone</label>
                <input type="tel" name="contactPhone" id="contactPhone" placeholder="+1-555-123-4567" value={formData.contactPhone} onChange={handleChange} className={inputClass} disabled={!isEditing} />
              </div>
            </div>
          </section>

          {/* Location Details */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">Company Location</h2>
            <div>
              <label htmlFor="addressLine1" className={labelClass}>Address Line 1</label>
              <input type="text" name="addressLine1" id="addressLine1" value={formData.addressLine1} onChange={handleChange} className={inputClass} disabled={!isEditing} />
            </div>
            <div className="mt-4">
              <label htmlFor="addressLine2" className={labelClass}>Address Line 2 (Optional)</label>
              <input type="text" name="addressLine2" id="addressLine2" value={formData.addressLine2} onChange={handleChange} className={inputClass} disabled={!isEditing} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <label htmlFor="city" className={labelClass}>City</label>
                <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className={inputClass} disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="stateOrProvince" className={labelClass}>State / Province</label>
                <input type="text" name="stateOrProvince" id="stateOrProvince" value={formData.stateOrProvince} onChange={handleChange} className={inputClass} disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="postalCode" className={labelClass}>Postal Code / ZIP</label>
                <input type="text" name="postalCode" id="postalCode" value={formData.postalCode} onChange={handleChange} className={inputClass} disabled={!isEditing} />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="country" className={labelClass}>Country</label>
              <input type="text" name="country" id="country" value={formData.country} onChange={handleChange} className={inputClass} disabled={!isEditing} />
            </div>
          </section>
          
         
          <div className="pt-6 border-t">
            <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
              {company && ( // Only show Edit/Cancel button if a profile exists
                <button
                  type="button"
                  onClick={handleToggleEdit}
                  className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              )}
              {isEditing && ( // Only show Save button if in edit mode
                <button
                  type="submit"
                  disabled={isLoading || companyLoading}
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors disabled:bg-slate-400"
                >
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}