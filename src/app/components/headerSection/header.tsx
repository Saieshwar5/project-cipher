
"use client";

import {useState ,useEffect,} from "react";

import {useRouter} from "next/navigation";
import Link from "next/link";
 

import { useAuth } from "@/app/context/AuthContext";

interface HeaderProps {
  loggedStatus?: boolean;
}


export default function Header()  {

   const { currentUser, logout } = useAuth();
  const router = useRouter();





  const [isOpen, setIsOpen] = useState(false);
     

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false); // Close the menu after logout
      router.push("/"); // Redirect to home or login page after logout

    } catch (error) {
      console.error("Logout failed:", error);
    }

  }

      
       return (

          <div className="flex flex-row space-between w-full  h-[10vh] ">
            <div className="flex flex-row space-between w-[20%] h-full ml-1" >
            <img src="/cypher.jpeg" alt="Cypher Logo" className="h-16 w-auto" />
            </div>

            <div className="flex flex-row space-between grow h-full">
            </div>

            <div className="flex flex-row space-between w-[25%] h-full">

                 {currentUser? (
                               <ul className="flex flex-row space-x-4 items-center justify-end  w-full h-full p-4">

                            <li>
                              <button onClick={handleLogout} className="text-white transition-all hover:scale-105 active:scale-95 px-8 py-3 bg-slate-900 rounded-[25px] border border-blue-500 cursor-pointer ml-auto mr-4" >
                                          LogOut
                              </button>
                            </li>

                      </ul>

                 ) : (

                   <ul className="flex flex-row space-x-4 items-center justify-end w-full h-full p-4">

                  <li >
                     <Link href="/login" className="text-white transition-all hover:scale-105 active:scale-95 px-6 py-2 bg-slate-900 rounded-[25px] border border-blue-500 cursor-pointer block">
                  LogIn 
                    </Link>
                  </li>
                  <li >
                    <Link href="/signup" className="text-white transition-all hover:scale-105 active:scale-95 px-6 py-2 bg-slate-900 rounded-[25px] border border-blue-500 cursor-pointer block">
                  SignUp
                      </Link>
                  </li>     
                  
                   </ul>  
                 )
                
                
                
                
                }
                    
                  
                  
                  
                  
                  </div>
          
          
          
          
          </div>



       )





}