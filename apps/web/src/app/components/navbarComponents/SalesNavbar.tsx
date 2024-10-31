import React from "react";
import Link from "next/link";
import { Navbar, Dropdown } from "flowbite-react";

const SalesNavbar = () => {
  return (
    <React.Fragment>
      <Navbar.Link href="#">
        <Dropdown arrowIcon={true} inline label={"Settings"}>
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
            <Link href="/dashboard/drinks/pay" passHref>
              <Navbar.Link>Drinks Payment</Navbar.Link>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/dashboard/drinks/debtors" passHref>
              <Navbar.Link>Debtors List</Navbar.Link>
            </Link>
          </Dropdown.Item>

          <Dropdown.Divider />

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

export default SalesNavbar;
