import React from "react";
import Link from "next/link";
import { Navbar, Dropdown } from "flowbite-react";

const TreasurerNavbar = () => {
  return (
    <React.Fragment>
      <div className="text-sm px-4 py-2 sm:px-0 md:px-0 lg:px-0 sm:py-0 md:py-0 lg:py-0">
        <Dropdown arrowIcon={true} inline label={"Drinks Supply"} color="#000">
          <Dropdown.Header>
            <span className="block text-sm">Treasurer Only </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Link href="/dashboard/settings" passHref>
              <Navbar.Link>Add Supplier/Drinks</Navbar.Link>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/dashboard/drinks/supply" passHref>
              <Navbar.Link>Pay Suppliers</Navbar.Link>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/dashboard/drinks/addstock" passHref>
              <Navbar.Link>Add Stock</Navbar.Link>
            </Link>
          </Dropdown.Item>

          <Dropdown.Divider />
        </Dropdown>
      </div>

      <div className="text-sm px-4 py-2 sm:px-0 md:px-0 lg:px-0 sm:py-0 md:py-0 lg:py-0">
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
      </div>
    </React.Fragment>
  );
};

export default TreasurerNavbar;
