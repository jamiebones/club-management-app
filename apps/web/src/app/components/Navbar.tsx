"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Session } from "inspector";


function Navbar() {
  const { data: session } = useSession();
  console.log("session data : ", session);
  return (
    <nav className="bg-gradient-to-r from-violet-400 to-indigo-500 text-white py-4 px-6 fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Uniuyo Senior Staff Club
        </Link>
        <ul className="flex items-center space-x-4">
          {/* <li>
            <Link href="/events" className="hover:text-cyan-500">
              Events
            </Link>
          </li>
          <li>
            <Link href="/members" className="hover:text-yellow-400">
              Members
            </Link>
          </li> */}

          {session && session?.user?.role! == "ADMIN"  && (
            <>
              <Link href="/dashboard/member" className="hover:text-cyan-500">
                Add Member
              </Link>

              <Link href="/dashboard/register" className="hover:text-cyan-500">
                Create User Account
              </Link>

              <Link href="/dashboard/staff/register" className="hover:text-cyan-500">
                 Add Staff
              </Link>
            </>
          )}

          {session ? (
            <>
              <p className="text-white mr-4">Hello, {session?.user?.name}</p>
              <Link href="/api/auth/signout" className="hover:text-cyan-500">
                Log out
              </Link>
            </>
          ) : (
            <>
              <Link href="/api/auth/signin" className="hover:text-cyan-500">
                Login
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

// import React, { useState } from 'react';
// import { FaBars, FaTimes } from 'react-icons/fa';

// interface NavbarProps {
//   isLoggedIn: boolean;
//   userName?: string;
//   onLogin: () => void;
//   onLogout: () => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, userName, onLogin, onLogout }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="bg-blue-500 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white font-bold text-xl">Your Logo</div>

//         {/* Mobile Menu Toggle Button */}
//         <div className="block lg:hidden">
//           <button onClick={toggleMobileMenu} className="text-white">
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <div className={`lg:flex ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
//           <a href="#" className="text-white px-4 py-2 hover:bg-blue-600">Home</a>
//           <a href="#" className="text-white px-4 py-2 hover:bg-blue-600">About</a>
//           <a href="#" className="text-white px-4 py-2 hover:bg-blue-600">Services</a>
//           <a href="#" className="text-white px-4 py-2 hover:bg-blue-600">Contact</a>
//         </div>

//         {/* User Authentication */}
//         <div className="flex items-center">
//           {isLoggedIn ? (
//             <>
//               <p className="text-white mr-4">Hello, {userName}</p>
//               <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <button onClick={onLogin} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//               Login
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
