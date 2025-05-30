"use client"; // <-- Add this to make it a Client Component

import Link from 'next/link';
import { useState } from 'react'; // <-- Import useState for managing copied state

// Define an interface for the mock job data for better structure
interface MockJobPosting {
  id: number;
  url: string;
  title: string;
  location: string;
  keySkills: string[];
  applicants: number;
  status: 'In Progress' | 'Completed' | 'Pending Review' | 'Closed';
  postedDate: string; // Added for more realism
}

// Create mock data for 6 job postings
const mockJobPostings: MockJobPosting[] = [
  {
    id: 1,
    url: 'https://example.com/job/frontend-developer',
    title: 'Senior Frontend Developer',
    location: 'New York, NY',
    keySkills: ['React', 'TypeScript', 'Next.js'],
    applicants: 25,
    status: 'In Progress',
    postedDate: 'May 20, 2025',
  },
  {
    id: 2,
    url: 'https://example.com/job/backend-engineer',
    title: 'Backend Software Engineer',
    location: 'San Francisco, CA',
    keySkills: ['Node.js', 'Python', 'AWS'],
    applicants: 42,
    status: 'Pending Review',
    postedDate: 'May 15, 2025',
  },
  {
    id: 3,
    url: 'https://example.com/job/product-manager',
    title: 'Product Manager - SaaS',
    location: 'Remote',
    keySkills: ['Agile', 'Roadmapping', 'User Research'],
    applicants: 18,
    status: 'Completed',
    postedDate: 'Apr 10, 2025',
  },
  {
    id: 4,
    url: 'https://example.com/job/data-scientist',
    title: 'Data Scientist',
    location: 'Austin, TX',
    keySkills: ['Machine Learning', 'Python', 'SQL'],
    applicants: 33,
    status: 'In Progress',
    postedDate: 'May 28, 2025',
  },
  {
    id: 5,
    url: 'https://example.com/job/ux-designer',
    title: 'UX/UI Designer',
    location: 'London, UK',
    keySkills: ['Figma', 'User Testing', 'Prototyping'],
    applicants: 12,
    status: 'Closed',
    postedDate: 'Mar 01, 2025',
  },
  {
    id: 6,
    url: 'https://example.com/job/devops-engineer',
    title: 'DevOps Engineer',
    location: 'Berlin, Germany',
    keySkills: ['Kubernetes', 'Docker', 'CI/CD'],
    applicants: 29,
    status: 'In Progress',
    postedDate: 'May 22, 2025',
  },
];

// Helper function to get status color
const getStatusColor = (status: MockJobPosting['status']) => {
  switch (status) {
    case 'In Progress':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'Completed':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'Pending Review':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'Closed':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

export default function DashboardPage() { 
  const [copiedUrlId, setCopiedUrlId] = useState<number | null>(null);

  const handleCopyUrl = async (urlToCopy: string, jobId: number) => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopiedUrlId(jobId);
      setTimeout(() => setCopiedUrlId(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy URL: ', err);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 md:p-6 bg-slate-50">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 self-start">Job Postings Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        {mockJobPostings.map((job) => (
          <div 
            key={job.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all hover:shadow-xl"
          >
            {/* Top Section: URL */}
            <div className="p-3 md:p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
              <Link 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs md:text-sm text-sky-600 hover:text-sky-800 hover:underline truncate block flex-grow"
                title={job.url} // Add title attribute for full URL on hover
              >
                {job.url}
              </Link>
              <button
                onClick={() => handleCopyUrl(job.url, job.id)}
                title="Copy URL"
                className={`p-1.5 rounded-md text-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500
                  ${copiedUrlId === job.id 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
              >
                {copiedUrlId === job.id ? (
                  // Checkmark icon (simple SVG)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  // Copy icon (simple SVG)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                )}
              </button>
            </div>

            {/* Middle Section: Job Details */}
            <div className="p-4 md:p-6 flex-grow">
              <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">{job.title}</h2>
              <p className="text-sm text-slate-500 mb-1">{job.location}</p>
              <p className="text-xs text-slate-400 mb-3">Posted: {job.postedDate}</p>
              
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-slate-600 mb-1 uppercase">Key Skills:</h3>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {job.keySkills.map(skill => (
                    <span key={skill} className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-slate-600">
                Applicants: <span className="font-bold text-slate-700">{job.applicants}</span>
              </p>
            </div>

            {/* Bottom Section: Status */}
            <div className={`p-2 md:p-3 border-t border-slate-200 text-center ${getStatusColor(job.status).split(' ')[0]}`}>
              <span className={`px-2 md:px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(job.status)}`}>
                Status: {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}