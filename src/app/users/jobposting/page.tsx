"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

interface JobPostingFormData {
  job_title: string; // snake_case
  job_location: string;
  job_type: string;
  job_summary: string;
  key_responsibilities?: string;
  educational_qualifications?: string;
  experience?: string;
  hard_skills?: string;
  soft_skills?: string;
  language_fluency?: string;
  desired_qualifications?: string;
  company_name?: string;
  company_introduction?: string;
  salary_range?: string;
  benefits_and_perks?: string;
  growth_opportunities?: string;
  application_instructions?: string;
  required_documents?: string;
  application_deadline?: string; // ISO date string
  contact_information?: string;
  equal_opportunity_statement?: string;
}

export default function JobPostingPage() {
  const [formData, setFormData] = useState<JobPostingFormData>({
    job_title: "", // snake_case
    job_location: "",
    job_type: "",
    job_summary: "",
    key_responsibilities: "",
    educational_qualifications: "",
    experience: "",
    hard_skills: "",
    soft_skills: "",
    language_fluency: "",
    desired_qualifications: "",
    company_name: "",
    company_introduction: "",
    salary_range: "",
    benefits_and_perks: "",
    growth_opportunities: "",
    application_instructions: "",
    required_documents: "",
    application_deadline: "",
    contact_information: "",
    equal_opportunity_statement: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // 'name' will be "job_title", "job_location", etc. from your input fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // This correctly uses the snake_case name from the input
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);    try {
      // Submit to our Next.js API route
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // formData already has snake_case keys
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSuccessMessage('Job posting created successfully! ID: ' + result.job.id);
      // Reset the form using snake_case keys
      setFormData({
        job_title: "",
        job_location: "",
        job_type: "",
        job_summary: "",
        key_responsibilities: "",
        educational_qualifications: "",
        experience: "",
        hard_skills: "",
        soft_skills: "",
        language_fluency: "",
        desired_qualifications: "",
        company_name: "",
        company_introduction: "",
        salary_range: "",
        benefits_and_perks: "",
        growth_opportunities: "",
        application_instructions: "",
        required_documents: "",
        application_deadline: "",
        contact_information: "",
        equal_opportunity_statement: ""
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create job posting.');
      console.error('Form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full p-2 overflow-x-hidden bg-white"> {/* Ensure min-w-screen is not needed if w-full and overflow-x-hidden are effective */}
        <div className="flex flex-col items-center w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg my-8"> {/* Added my-8 for top/bottom margin */}

           <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Create Job Posting</h1>

            {/* Core Job Information */}
            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Core Job Information</h2>

            <div className="mb-4">
              <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input type="text" id="job_title" name="job_title" value={formData.job_title} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="job_location" className="block text-sm font-medium text-gray-700">Job Location (City, State, Country, Remote/Hybrid)</label>
              <input type="text" id="job_location" name="job_location" value={formData.job_location} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="job_type" className="block text-sm font-medium text-gray-700">Job Type (e.g., Full-time, Part-time, Contract)</label>
              <input type="text" id="job_type" name="job_type" value={formData.job_type} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="job_summary" className="block text-sm font-medium text-gray-700">Job Summary/Overview</label>
              <textarea id="job_summary" name="job_summary" value={formData.job_summary} onChange={handleChange} rows={3} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="key_responsibilities" className="block text-sm font-medium text-gray-700">Key Responsibilities and Duties (use bullet points)</label>
              <textarea id="key_responsibilities" name="key_responsibilities" value={formData.key_responsibilities} onChange={handleChange} rows={5} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <h3 className="text-lg font-medium mt-4 mb-2 text-gray-700">Required Qualifications and Skills</h3>
            <div className="mb-4">
              <label htmlFor="educational_qualifications" className="block text-sm font-medium text-gray-700">Educational Qualifications</label>
              <textarea id="educational_qualifications" name="educational_qualifications" value={formData.educational_qualifications} onChange={handleChange} rows={2} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (e.g., Minimum 3 years in X)</label>
              <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="hard_skills" className="block text-sm font-medium text-gray-700">Hard Skills (e.g., Python, Salesforce)</label>
              <textarea id="hard_skills" name="hard_skills" value={formData.hard_skills} onChange={handleChange} rows={3} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="soft_skills" className="block text-sm font-medium text-gray-700">Soft Skills (e.g., Communication, Teamwork)</label>
              <textarea id="soft_skills" name="soft_skills" value={formData.soft_skills} onChange={handleChange} rows={2} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="language_fluency" className="block text-sm font-medium text-gray-700">Language Fluency (if applicable)</label>
              <input type="text" id="language_fluency" name="language_fluency" value={formData.language_fluency} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="desired_qualifications" className="block text-sm font-medium text-gray-700">Desired/Preferred Qualifications (Nice-to-haves)</label>
              <textarea id="desired_qualifications" name="desired_qualifications" value={formData.desired_qualifications} onChange={handleChange} rows={3} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

          
            <div className="mb-4">
              <label htmlFor="salary_range" className="block text-sm font-medium text-gray-700">Salary Range (e.g., $70,000 - $90,000 per year)</label>
              <input type="text" id="salary_range" name="salary_range" value={formData.salary_range} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="benefits_and_perks" className="block text-sm font-medium text-gray-700">Benefits and Perks (Health insurance, PTO, retirement, etc.)</label>
              <textarea id="benefits_and_perks" name="benefits_and_perks" value={formData.benefits_and_perks} onChange={handleChange} rows={4} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="growth_opportunities" className="block text-sm font-medium text-gray-700">Growth Opportunities</label>
              <textarea id="growth_opportunities" name="growth_opportunities" value={formData.growth_opportunities} onChange={handleChange} rows={2} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            {/* Application Process Details */}
            <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">Application Process Details</h2>

            <div className="mb-4">
              <label htmlFor="application_instructions" className="block text-sm font-medium text-gray-700">Application Instructions (How to apply)</label>
              <textarea id="application_instructions" name="application_instructions" value={formData.application_instructions} onChange={handleChange} rows={3} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="required_documents" className="block text-sm font-medium text-gray-700">Required Application Documents (e.g., Resume, Cover Letter, Portfolio)</label>
              <input type="text" id="required_documents" name="required_documents" value={formData.required_documents} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="application_deadline" className="block text-sm font-medium text-gray-700">Application Deadline (Optional)</label>
              <input type="date" id="application_deadline" name="application_deadline" value={formData.application_deadline} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="contact_information" className="block text-sm font-medium text-gray-700">Contact Information for Inquiries( HR representative mail)</label>
              <input type="text" id="contact_information" name="contact_information" value={formData.contact_information} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required  />
            </div>

         
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            
            <button type="submit" disabled={isLoading} className="w-full bg-black hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 text-lg disabled:bg-gray-400">
              {isLoading ? 'Submitting...' : 'Post Job'}
            </button>
          </form>
          </div>
    </div>
  );
}







