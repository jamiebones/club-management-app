"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import AdminNavbar from "./navbarComponents/AdminNavbar";

const NavbarComponent = () => {
  const { data: session } = useSession();
  return (
    <Navbar fluid rounded className="bg-red-500 text-white">
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Uniuyo Senior Staff Club
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {session ? (
          <>
            <Dropdown
              arrowIcon={true}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }>
              <Dropdown.Header>
                <span className="block text-sm">{session?.user?.name}</span>
              </Dropdown.Header>

              <Dropdown.Divider />
              <Dropdown.Item>
                <Link href="/api/auth/signout" className="hover:text-cyan-500">
                  Log out
                </Link>
              </Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
            <Link href="/api/auth/signin" className="hover:text-cyan-500">
              Login
            </Link>
          </>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        {session && session?.user?.role! == "ADMIN" && (
          <>
            <AdminNavbar />
          </>
        )}
        {/* <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;

// import Link from "next/link";
// import { useSession } from "next-auth/react";

// function Navbar() {
//   const { data: session } = useSession();
//   return (
//     <nav className="bg-gradient-to-r from-violet-400 to-indigo-500 text-white py-4 px-6 fixed top-0 w-full z-10">
//       <div className="container mx-auto flex items-center justify-between">
//         <Link href="/" className="text-2xl font-bold tracking-wide">
//           Uniuyo Senior Staff Club
//         </Link>
//         <ul className="flex items-center space-x-4">
//           {/* <li>
//             <Link href="/events" classNameName="hover:text-cyan-500">
//               Events
//             </Link>
//           </li>
//           <li>
//             <Link href="/members" classNameName="hover:text-yellow-400">
//               Members
//             </Link>
//           </li> */}

//           {session && session?.user?.role! == "ADMIN"  && (
//             <>
//               <Link href="/dashboard/member" className="hover:text-cyan-500">
//                 Add Member
//               </Link>

//               <Link href="/dashboard/register" className="hover:text-cyan-500">
//                 Create User Account
//               </Link>

//               <Link href="/dashboard/staff/register" className="hover:text-cyan-500">
//                  Add Staff
//               </Link>
//             </>
//           )}

//           {session ? (
//             <>
//               <p className="text-white mr-4">Hello, {session?.user?.name}</p>
//               <Link href="/api/auth/signout" className="hover:text-cyan-500">
//                 Log out
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link href="/api/auth/signin" className="hover:text-cyan-500">
//                 Login
//               </Link>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
