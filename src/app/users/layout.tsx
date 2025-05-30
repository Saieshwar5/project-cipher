

import Header from "@/app/components/headerSection/header";











export default function UsersLayout({ children }: { children: React.ReactNode }) {
    return(
       
          <div className="min-h-screen"> 
                 
                   
                   <aside className="fixed top-[4rem] left-0 w-[20vw] h-[calc(100vh-4rem)] bg-slate-200 p-4 shadow-lg z-40 overflow-y-auto flex flex-col items-start justify-start">
                      
                       <h2 className="text-lg font-semibold mb-4">Select</h2>
                       <nav>
                           <ul>
                               <li className="mb-2"><a href="/users/recruit" className="hover:text-sky-700">Recruit</a></li>
                               <li className="mb-2"><a href="/users/jobposting" className="hover:text-sky-700">Job Posting</a></li>
                               <li className="mb-2"><a href="/users/companyprofile" className="hover:text-sky-700">Company Profile</a></li>
                               <li className="mb-2"><a href="#" className="hover:text-sky-700">Settings</a></li>
                               <li className="mb-2"><a href="#" className="hover:text-sky-700">Messages</a></li>
                           </ul>
                       </nav>
                    </aside>
               
                   
                    <main className="ml-[20vw] pt-[4rem] w-[calc(100vw-20vw)] min-h-[calc(100vh-4rem)] p-3 bg-slate-50 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start ">
                     
                       {children}
                   </main>
             </div>
       
    );
}