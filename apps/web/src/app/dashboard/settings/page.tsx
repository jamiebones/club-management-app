"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SupplierForm from "@/app/components/AddSupplierComponent";
import AddItem from "@/app/components/AddItem";
import UpdateItem from "@/app/components/UpdateItem";
import { FaPlusCircle, FaCube, FaEdit } from "react-icons/fa";

const SettingsPage = () => {
  return (
    <div className="w-2/3 mx-auto mt-16 p-6 bg-white rounded shadow-md">
      <Tabs>
        <TabList>
          <Tab>
            <div className="flex justify-around items-center">
              <FaPlusCircle />
              <h3 className="ml-2">Add Supplier</h3>
            </div>
          </Tab>
          <Tab>
            <div className="flex justify-around items-center">
              <FaCube />
              <h3 className="ml-2">Add Item</h3>
            </div>
          </Tab>
          <Tab>
            <div className="flex justify-around items-center">
              <FaEdit />
              <h3 className="ml-2">Update Item</h3>
            </div>
          </Tab>
          <Tab>Title 4</Tab>
        </TabList>

        <TabPanel>
          <SupplierForm />
        </TabPanel>
        <TabPanel>
          <AddItem />
        </TabPanel>
        <TabPanel>
          <UpdateItem />
        </TabPanel>
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
