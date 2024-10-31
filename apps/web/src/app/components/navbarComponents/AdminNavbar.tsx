import React from "react";
import Link from "next/link";
import { Navbar, Dropdown } from "flowbite-react";

const AdminNavbar = () => {
  return (
    <React.Fragment>
      <Navbar.Link href="#">
        <Dropdown arrowIcon={true} inline label={"Registeration"}>
          <Dropdown.Header>
            <span className="block text-sm">Admin Only </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Link href="/dashboard/member/addmember" passHref>
              <Navbar.Link>Register Members</Navbar.Link>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/dashboard/member/edit" passHref>
              <Navbar.Link>Edit Member</Navbar.Link>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/dashboard/staff/register" passHref>
              <Navbar.Link>Register Staff</Navbar.Link>
            </Link>
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
            <Link href="/dashboard/register" passHref>
              <Navbar.Link>Create Account</Navbar.Link>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/dashboard/settings" passHref>
              <Navbar.Link>Add Supplier/Drinks</Navbar.Link>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/dashboard/drinks/addstock" passHref>
              <Navbar.Link>Add Stock</Navbar.Link>
            </Link>
          </Dropdown.Item>

          <Dropdown.Divider />
        </Dropdown>
      </Navbar.Link>

      <Link href="/dashboard/query/members" passHref>
        <Navbar.Link>Members List</Navbar.Link>
      </Link>

      <Link href="/dashboard/query/member/search" passHref>
        <Navbar.Link>Search Members</Navbar.Link>
      </Link>

      <Navbar.Link href="#">
        <Dropdown arrowIcon={true} inline label={"Sales"}>
          <Dropdown.Header>
            <span className="block text-sm">Sales </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Link href="/dashboard/drinks/sell" passHref>
              <Navbar.Link>Sell Drinks</Navbar.Link>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/dashboard/drinks/swapdrink" passHref>
              <Navbar.Link>Swap Drinks</Navbar.Link>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/dashboard/query/drinks/getsales" passHref>
              <Navbar.Link>View Sales</Navbar.Link>
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link href="/dashboard/drinks/donation/new-donation" passHref>
              <Navbar.Link>Add Donations</Navbar.Link>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/dashboard/drinks/donation/get-donations" passHref>
              <Navbar.Link>Donations Stock</Navbar.Link>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/dashboard/drinks/donation/use-donations" passHref>
              <Navbar.Link>Use Donations Stock</Navbar.Link>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/dashboard/drinks/donation/donation-usage" passHref>
              <Navbar.Link>Donations Usage</Navbar.Link>
            </Link>
          </Dropdown.Item>
        </Dropdown>
      </Navbar.Link>
    </React.Fragment>
  );
};

export default AdminNavbar;