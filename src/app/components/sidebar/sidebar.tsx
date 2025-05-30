"use client"; // Add this directive to make it a Client Component
      
      
      import Link from 'next/link';
      import { usePathname } from 'next/navigation'; // Import usePathname
      
      // Define your routes
      const sidebarRoutes = [
        { name: 'Dashboard', href: '/users/dashboard' }, // Example route
        { name: 'New Hiring', href: '/users/jobposting' },
        { name: 'Company Profile', href: '/users/companyprofile' },
        // Add more routes as needed
      ];
      
      export default function SideBar() {
        const pathname = usePathname(); // Get the current path
      
        return (
          // The parent layout (UsersLayout.tsx) should handle the overall width (e.g., w-[20vw])
          // and positioning (fixed, top, height). This component focuses on its internal content.
          // The h-full here means it will try to take the full height of its direct parent container.
          <div className="h-full bg-slate-100 p-4 shadow-lg overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Navigation</h2>
            <nav>
              <ul className="space-y-2">
                {sidebarRoutes.map((route) => {
                  const isActive = pathname === route.href || (route.href !== '/users/dashboard' && pathname.startsWith(route.href));
                  // For non-dashboard routes, also consider active if current path starts with the route's href
                  // This helps if you have sub-routes like /users/jobposting/new
      
                  return (
                    <li key={route.name}>
                      <Link
                        href={route.href}
                        className={`
                          flex items-center p-3 rounded-lg text-gray-600 hover:bg-sky-100 hover:text-black transition-colors duration-150
                          ${isActive ? 'bg-black text-white shadow-md hover:bg-sky-700' : ''}
                        `}
                      >
                        {/* You can add icons here later if you want */}
                        {/* <span className="mr-3">Icon</span> */}
                        <span className="font-medium">{route.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        );
      }