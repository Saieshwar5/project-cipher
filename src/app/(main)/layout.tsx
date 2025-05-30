



import Header from "@/app/components/headerSection/header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   


  return (

        
           <div className="flex flex-col items-center  min-h-screen min-w-screen  p-1 gap-2 scroll-auto">
          <header className="flex flex-row space-between w-full  h-[10vh] "  >
              <Header loggedStatus={false} />
          </header>

          <main className="flex  flex-auto flex-col items-center justify-center w-full p-8">
              {children}
          </main>

            <footer className="flex flex-row space-between w-full  h-[15vh] bg-green-500">
               footer

          </footer>


         
    </div>


      
  );
}
