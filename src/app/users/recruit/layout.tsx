export default function RecruitMentPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center w-full flex-1 p-1 gap-0.5 overflow-x-hidden">
    
       <div  className="flex flex-row justify-between w-full h-[5vh] bg-fuchsia-800">
         header
       </div>

       <div className="w-full overflow-x-hidden">
        {children}  
       </div>


    </div>
  );
}