"use client"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SupplierForm from "@/app/components/AddSupplierComponent";
import { FaPlusCircle } from "react-icons/fa";

const SettingsPage = () => {
  return (
    <div className="w-2/3 mx-auto mt-16 p-6 bg-white rounded shadow-md">
        <Tabs>
      <TabList>
        <Tab>
            <div className="flex justify-around items-center">
            <FaPlusCircle /> 
            <h3>Add Supplier</h3>
            </div>
           
        </Tab>
        <Tab>Title 2</Tab>
        <Tab>Title 3</Tab>
        <Tab>Title 4</Tab>
      </TabList>

      <TabPanel>
        <SupplierForm  />
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 3</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 4</h2>
      </TabPanel>
    </Tabs>
    </div>
    
  );
};

export default SettingsPage;
