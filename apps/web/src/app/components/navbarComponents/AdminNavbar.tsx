import React, { useState } from "react";
import Link from "next/link";
import { Navbar, Dropdown, Avatar } from "flowbite-react";

const AdminNavbar = () => {
  return (
    <React.Fragment>
       <Navbar.Link href="#">
        <Dropdown arrowIcon={true} inline label={"Registeration"}>
          <Dropdown.Header>
            <span className="block text-sm">Admin Only </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/member/addmember">Register Members</Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/member/edit">Edit Member</Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/staff/register">Register Staff</Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Divider />
      
        </Dropdown>
      </Navbar.Link>
      <Navbar.Link href="#">
        <Dropdown arrowIcon={true} inline label={"Settings"}>
          <Dropdown.Header>
            <span className="block text-sm">Admin Only </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/register">Create Account</Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/settings"> Add Supplier/Drinks</Navbar.Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Navbar.Link href="/dashboard/drinks/addstock"> Add Stock</Navbar.Link>
          </Dropdown.Item>
      
          <Dropdown.Divider />
        </Dropdown>
      </Navbar.Link>
      <Navbar.Link href="/dashboard/query/members">Members List</Navbar.Link> 
    </React.Fragment>
  );
};

export default AdminNavbar;
