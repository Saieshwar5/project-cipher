"use client"; // Required if you plan to add interactivity (state, handlers)

import { useState, ChangeEvent, FormEvent } from 'react'; // Import useState if you'll manage form data

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
  linkedInProfile: string;
  twitterProfile: string;
  // Add other relevant fields as needed
}

export default function CompanyProfilePage() {
  const [formData, setFormData] = useState<CompanyProfileFormData>({
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
    linkedInProfile: "",
    twitterProfile: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

    // Basic validation example (you'll want more robust validation)
    if (!formData.companyName || !formData.contactEmail) {
      setError("Company Name and Contact Email are required.");
      setIsLoading(false);
      return;
    }

    console.log("Submitting Company Profile:", formData);
    // TODO: Implement actual API call to save the data
    // try {
    //   const response = await fetch('/api/company-profile', {
    //     method: 'POST', // or 'PUT' if updating
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || "Failed to save company profile.");
    //   }
    //   setSuccessMessage("Company profile saved successfully!");
    //   // Optionally, refetch data or update UI
    // } catch (err: any) {
    //   setError(err.message || "An unexpected error occurred.");
    // } finally {
    //   setIsLoading(false);
    // }

    // Mock success for now
    setTimeout(() => {
      setSuccessMessage("Company profile updated (mock success)!");
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    // TODO: Implement reset logic
    // This might involve resetting formData to initial values or last fetched data
    console.log("Reset button clicked. Form data would be reset here.");
    setFormData({
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
      linkedInProfile: "",
      twitterProfile: "",
    });
    alert("Fields Reset (mock)!");
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <div className="flex flex-col items-center w-full p-4 md:p-8 gap-6 bg-slate-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 md:p-10 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">Company Profile</h1>
        <p className="text-sm text-slate-600 mb-8 text-center">
          Manage and update your company's information.
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
                <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="companyDomain" className={labelClass}>Company Domain / Website <span className="text-red-500">*</span></label>
                <input type="url" name="companyDomain" id="companyDomain" placeholder="https://example.com" value={formData.companyDomain} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="yearFounded" className={labelClass}>Year Founded</label>
                <input type="number" name="yearFounded" id="yearFounded" placeholder="e.g., 2005" value={formData.yearFounded} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="companySize" className={labelClass}>Company Size</label>
                <select name="companySize" id="companySize" value={formData.companySize} onChange={handleChange} className={inputClass}>
                  <option value="">Select size...</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1001+">1001+ employees</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="operatingSectors" className={labelClass}>Operating Sectors (comma-separated)</label>
              <input type="text" name="operatingSectors" id="operatingSectors" placeholder="e.g., Technology, Healthcare, Finance" value={formData.operatingSectors} onChange={handleChange} className={inputClass} />
            </div>
             <div className="mt-6">
              <label htmlFor="companyMission" className={labelClass}>Company Mission / About Us</label>
              <textarea name="companyMission" id="companyMission" rows={4} value={formData.companyMission} onChange={handleChange} className={inputClass} placeholder="Briefly describe your company..."></textarea>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactEmail" className={labelClass}>Contact Email <span className="text-red-500">*</span></label>
                <input type="email" name="contactEmail" id="contactEmail" placeholder="contact@example.com" value={formData.contactEmail} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="contactPhone" className={labelClass}>Contact Phone</label>
                <input type="tel" name="contactPhone" id="contactPhone" placeholder="+1-555-123-4567" value={formData.contactPhone} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </section>

          {/* Location Details */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">Company Location</h2>
            <div>
              <label htmlFor="addressLine1" className={labelClass}>Address Line 1</label>
              <input type="text" name="addressLine1" id="addressLine1" value={formData.addressLine1} onChange={handleChange} className={inputClass} />
            </div>
            <div className="mt-4">
              <label htmlFor="addressLine2" className={labelClass}>Address Line 2 (Optional)</label>
              <input type="text" name="addressLine2" id="addressLine2" value={formData.addressLine2} onChange={handleChange} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <label htmlFor="city" className={labelClass}>City</label>
                <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="stateOrProvince" className={labelClass}>State / Province</label>
                <input type="text" name="stateOrProvince" id="stateOrProvince" value={formData.stateOrProvince} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="postalCode" className={labelClass}>Postal Code / ZIP</label>
                <input type="text" name="postalCode" id="postalCode" value={formData.postalCode} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="country" className={labelClass}>Country</label>
              <input type="text" name="country" id="country" value={formData.country} onChange={handleChange} className={inputClass} />
            </div>
          </section>

          {/* Social Media & Links */}
           <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">Online Presence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="linkedInProfile" className={labelClass}>LinkedIn Profile URL</label>
                <input type="url" name="linkedInProfile" id="linkedInProfile" placeholder="https://linkedin.com/company/yourcompany" value={formData.linkedInProfile} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="twitterProfile" className={labelClass}>Twitter Profile URL (or other social)</label>
                <input type="url" name="twitterProfile" id="twitterProfile" placeholder="https://twitter.com/yourcompany" value={formData.twitterProfile} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </section>

          <div className="pt-6 border-t">
            <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Company Profile'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}