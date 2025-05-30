
"use client";

import {useState ,useEffect, use } from "react";

interface HeaderProps {
  loggedStatus?: boolean;
}








export default function Header({ loggedStatus}: HeaderProps)  {

  const [isOpen, setIsOpen] = useState(false);
     
 useEffect(() => {
    // If loggedStatus is undefined (e.g., not passed), default to false
    setIsOpen(loggedStatus ?? false);
  }, [loggedStatus]); 

      
     
       return (

          <>
            <div className="flex flex-row space-between w-[20%] h-full ml-1" >
            <img src="/cypher.jpeg" alt="Cypher Logo" className="h-16 w-auto" />
            </div>

            <div className="flex flex-row space-between grow h-full">
            </div>

            <div className="flex flex-row space-between w-[25%] h-full">

                 {isOpen? (
                               <ul className="flex flex-row space-x-4 items-center w-full h-full p-4">

                            <li className="text-white transition-all hover:scale-105 active:scale-95 px-8 py-3 bg-slate-900 rounded-[25px] border border-blue-500 cursor-pointer ml-auto mr-4">
                              <a href="/about" className="block w-full h-full">LogOut</a>
                            </li>

                      </ul>

                 ) : (

                   <ul className="flex flex-row space-x-4 items-center w-full h-full p-4">
                  <li className="text-white transition-all hover:scale-105 active:scale-95 px-8 py-3 bg-slate-900 rounded-[25px] border border-blue-500 cursor-pointer">
                    <a href="/" className="block w-full h-full">LogIn</a>
                  </li>
                  <li className="text-white transition-all hover:scale-105 active:scale-95 px-8 py-3 bg-slate-900 rounded-[25px] border border-blue-500 cursor-pointer">
                    <a href="/signup" className="block w-full h-full">SignUp</a>
                  </li>      </ul>  
                 )
                
                
                
                
                }
                    
                  
                  
                  
                  
                  </div>
          
          
          
          
          </>



       )





}