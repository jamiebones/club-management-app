"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import AdminNavbar from "./navbarComponents/AdminNavbar";
import SalesNavbar from "./navbarComponents/SalesNavbar";
import TreasurerNavbar from "./navbarComponents/TreasurerNavbar";

const NavbarComponent = () => {
  const { data: session } = useSession();
  return (
    
    <Navbar fluid rounded className="bg-red-500 text-white">
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          UUSSC (Since 1980) MGT APP
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {session ? (
          <>
            <Dropdown
              arrowIcon={true}
              inline
              label={<Avatar alt="Profile" img="/avatar.svg" rounded bordered />}>
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
        <Navbar.Link href="#" active className="text-sm px-4 py-2 sm:px-0 md:px-0 lg:px-0 sm:py-0 md:py-0 lg:py-0">
          Home
        </Navbar.Link>
        {session && session?.user?.role! == "ADMIN" && (
          <>
            <AdminNavbar />
          </>
        )}

        {session && session?.user?.role! == "TREASURER" && (
          <>
            <TreasurerNavbar />
          </>
        )}

        {session && session?.user?.role! == "SALES" && (
          <>
            <SalesNavbar />
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
