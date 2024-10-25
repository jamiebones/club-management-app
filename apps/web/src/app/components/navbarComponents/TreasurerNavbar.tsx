import React, { useState } from "react";
import Link from "next/link";
import { Navbar, Dropdown } from "flowbite-react";

const TreasurerNavbar = () => {
  return (
    <React.Fragment>
      <Navbar.Link href="#">
        <Dropdown arrowIcon={true} inline label={"Drinks Supply"}>
          <Dropdown.Header>
            <span className="block text-sm">Treasurer Only </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/settings"> Add Supplier/Drinks</Navbar.Link>
            <Navbar.Link href="/dashboard/drinks/supply"> Pay Suppliers</Navbar.Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Navbar.Link href="/dashboard/drinks/addstock"> Add Stock</Navbar.Link>
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
            <Navbar.Link href="/dashboard/drinks/sell">Sell Drinks</Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/drinks/pay">Save Drinks Payment</Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/drinks/debtors">Debtors List</Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/drinks/swapdrink"> Swap Drinks</Navbar.Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Navbar.Link href="/dashboard/query/drinks/getsales">View Sales</Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/drinks/donation/new-donation"> Add Donations</Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/drinks/donation/get-donations">
              {" "}
              Donations Stock
            </Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/drinks/donation/use-donations">
              {" "}
              Use Donations Stock
            </Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/dashboard/drinks/donation/donation-usage">
              {" "}
              Donations Usage
            </Navbar.Link>
          </Dropdown.Item>
        </Dropdown>
      </Navbar.Link>
    </React.Fragment>
  );
};

export default TreasurerNavbar;
