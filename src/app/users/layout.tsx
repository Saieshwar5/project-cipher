import Header from "../components/headerSection/header"; // Ensure this path is correct



import SideBar from "../components/sidebar/sidebar";
export default function UsersLayout({ children }: { children: React.ReactNode }) {
    const headerHeight = "11vh"; 

    return (
        <div className="flex flex-col min-h-screen"> 
            
           
            <div 
                className="fixed top-0 left-0 w-full bg-white shadow-md z-50" 
                style={{ height: headerHeight }}
            >
                <Header /> 
            </div>

           
            <div 
                className="flex flex-1" 
                style={{ paddingTop: headerHeight }} 
            >
               
                <aside 
                    className="fixed left-0 w-[20vw] bg-slate-100 p-4 shadow-lg z-40 overflow-y-auto"
                    
                    style={{ top: headerHeight, height: `calc(100vh - ${headerHeight})` }}
                >
                    <SideBar />
                    
                </aside>

               
                <main 
                    className="flex-1 bg-gray-50 p-6 overflow-y-auto overflow-x-hidden items-center justify-center"
                   
                    style={{ marginLeft: "20vw" }} 
                >
                    {children}
                </main>
            </div>
        </div>
    );
}