// filepath: c:\\my_project\\hiring-ai-agent\\hiring-ai-agent-client\\src\\app\\components\\mainSection\\articles.tsx
import React from 'react';

const Articles: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 mb-4">
            Revolutionize Your Hiring with Our AI-Powered ATS
          </h1>
          <p className="text-lg sm:text-xl text-slate-400">
            Save time, reduce costs, and discover top-tier talent effortlessly.
          </p>
        </header>

        <section className="mb-12 md:mb-16 bg-slate-800/50 p-6 sm:p-8 rounded-xl shadow-2xl hover:shadow-indigo-500/30 transition-shadow duration-300">
          <h2 className="text-3xl font-bold mb-6 text-sky-400 flex items-center">
            <span className="text-4xl mr-3">🔍</span> Smart Resume Filtering
          </h2>
          <p className="text-slate-300 mb-4 text-lg leading-relaxed">
            Our AI agent automatically filters through all incoming resumes and identifies the most relevant candidates based on your job description. It evaluates key factors such as:
          </p>
          <ul className="list-none space-y-3 pl-0">
            {['Skills and experience match', 'Education and certifications', 'Industry relevance', 'Keywords and contextual analysis'].map((item, index) => (
              <li key={index} className="flex items-start p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                <svg className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-slate-200">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sky-300 italic text-md">
            No more manual resume screening. Our AI ensures you're only spending time on candidates that truly fit your requirements.
          </p>
        </section>

        <section className="mb-12 md:mb-16 bg-slate-800/50 p-6 sm:p-8 rounded-xl shadow-2xl hover:shadow-purple-500/30 transition-shadow duration-300">
          <h2 className="text-3xl font-bold mb-6 text-purple-400 flex items-center">
            <span className="text-4xl mr-3">🧠</span> AI-Based Ability Analysis
          </h2>
          <p className="text-slate-300 mb-4 text-lg leading-relaxed">
            It’s not just about keywords — our system uses Natural Language Processing (NLP) and semantic analysis to understand the actual capabilities of each applicant. It reads and interprets resumes much like a human recruiter would, but faster and more consistently. This means you get deeper insights into:
          </p>
          <ul className="list-none space-y-3 pl-0">
            {['Problem-solving abilities', 'Technical proficiencies', 'Leadership or collaboration skills', 'Career growth patterns'].map((item, index) => (
              <li key={index} className="flex items-start p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                <svg className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-slate-200">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 md:mb-16 bg-slate-800/50 p-6 sm:p-8 rounded-xl shadow-2xl hover:shadow-teal-500/30 transition-shadow duration-300">
          <h2 className="text-3xl font-bold mb-6 text-teal-400 flex items-center">
            <span className="text-4xl mr-3">✅</span> Shortlisting the Right Talent
          </h2>
          <p className="text-slate-300 mb-4 text-lg leading-relaxed">
            Once the analysis is complete, our AI shortlists the top candidates who best meet your role’s needs. These are the people worth your attention — vetted and ranked based on data. You can also customize the shortlisting criteria to reflect specific priorities such as experience level, location, or specific skills.
          </p>
        </section>

        <section className="mb-12 md:mb-16 bg-slate-800/50 p-6 sm:p-8 rounded-xl shadow-2xl hover:shadow-pink-500/30 transition-shadow duration-300">
          <h2 className="text-3xl font-bold mb-6 text-pink-400 flex items-center">
            <span className="text-4xl mr-3">📅</span> Automated Interview Scheduling
          </h2>
          <p className="text-slate-300 mb-4 text-lg leading-relaxed">
            After identifying top candidates, the AI agent reaches out automatically, connects with them through email or messaging, and schedules interviews based on mutual availability. This means:
          </p>
          <ul className="list-none space-y-3 pl-0">
            {['No back-and-forth emails', 'No calendar conflicts', 'Faster movement through the hiring pipeline'].map((item, index) => (
              <li key={index} className="flex items-start p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                 <svg className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-slate-200">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 md:mb-16 bg-gradient-to-r from-sky-600 to-indigo-700 p-6 sm:p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
             <span className="text-4xl mr-3">💼</span> Why Choose Our AI ATS?
          </h2>
          <ul className="list-none space-y-3 pl-0">
            {[
              'End-to-end automation: From application to interview — we handle it.',
              'Faster hiring cycles: Save hours or even days on resume screening.',
              'Higher-quality candidates: Our AI finds what traditional tools often miss.',
              'Scalable and customizable: Whether you’re hiring 5 people or 500, our system adapts to your needs.'
            ].map((item: string, index: number) => (
              <li key={index} className="flex items-start p-3 bg-sky-800/70 rounded-lg hover:bg-sky-700/90 transition-colors duration-200">
                <svg className="w-6 h-6 text-green-300 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-slate-100">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-500">
            🚀 Let Your HR Team Focus on What Matters
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            With our AI-powered ATS, your recruitment team can shift their energy from administrative tasks to what truly matters — building relationships, evaluating culture fit, and making strategic decisions. Start hiring smarter, faster, and more efficiently.
          </p>
        </section>

        <section className="text-center bg-slate-800 py-10 sm:py-16 rounded-xl shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-yellow-400">
            Ready to Transform Your Recruitment Process?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Contact us today to schedule a demo and see the future of hiring.
          </p>
          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-bold py-4 px-10 rounded-lg text-xl shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300">
            Schedule a Demo
          </button>
        </section>

      </div>
    </div>
  );
};

export default Articles;
