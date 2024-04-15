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
                  alt="Profile"
                  img="/avatar.svg"
                  rounded
                  bordered
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
