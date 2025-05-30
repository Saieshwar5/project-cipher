export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
   

        <div className="w-full overflow-x-hidden">
            {children}
        </div>
         
  );
}