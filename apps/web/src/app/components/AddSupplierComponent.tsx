import React, { useState, ChangeEvent, FormEvent } from "react";
import { AddNewSupplier } from "@/app/graphqlRequest/mutation";
import { FaSpinner, FaTools } from "react-icons/fa";
import { request } from "graphql-request";
import LoadingSpinner from "@/app/components/Loading";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface Supplier {
  supplierID: string;
  name: string;
  contact: string[];
  address?: string;
}

const SupplierForm = () => {
  const [formData, setFormData] = useState<Supplier>({
    supplierID: "",
    name: "",
    contact: [],
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleContactChange = (index: number, value: string) => {
    setFormData(prevData => {
      const updatedContacts = [...prevData.contact];
      updatedContacts[index] = value;
      return { ...prevData, contact: updatedContacts };
    });
  };

  const handleAddContact = () => {
    setFormData(prevData => ({
      ...prevData,
      contact: [...prevData.contact, ""],
    }));
  };

  const handleRemoveContact = (index: number) => {
    setFormData(prevData => {
      const updatedContacts = [...prevData.contact];
      updatedContacts.splice(index, 1);
      return { ...prevData, contact: updatedContacts };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert("The supplier name is a required field");
      return;
    }
    if (formData?.contact?.length < 0) {
      alert("The supplier contact is a required field");
      return;
    }
    if (!formData?.supplierID) {
      alert("The supplierID is a required field");
      return;
    }
    const dataToInsert = `
      Name: ${formData.name}
      Supplier ID: ${formData.supplierID}
      Contact: ${formData.contact}
      Address: ${formData.address}
    `;
    const confirmInsert = confirm(dataToInsert);
    if (!confirmInsert) return;
    try {
      const dataInput = {
        request: {
          supplierID: formData.supplierID,
          name: formData.name,
          contact: formData.contact,
          address: formData.address,
        },
      };
      setLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: AddNewSupplier,
        variables: dataInput,
      });
      console.log("response from mutation, => ", response);
      alert("New supplier details added");
    } catch (error) {
      console.log("Error => ", Error);
    } finally {
      setFormData({
        supplierID: "",
        name: "",
        contact: [],
        address: "",
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white p-4 shadow-md rounded-md max-w-md mx-auto mt-4">
          <h2 className="text-xl font-bold mb-4">Add Supplier Details</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Supplier ID</label>
            <input
              type="text"
              name="supplierID"
              value={formData.supplierID}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Contact</label>
            {formData.contact.map((contact, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={contact}
                  onChange={e => handleContactChange(index, e.target.value)}
                  className="mt-1 p-2 flex-1 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveContact(index)}
                  className="text-red-600">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddContact}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md">
              Add Contact
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              className="bg-green-500 text-white p-2 rounded-md"
              onClick={handleSubmit}>
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <label>Loading</label>
                </>
              ) : (
                <div className="flex justify-between items-center">
                  <FaTools className="mr-2" />
                  <label>Save Supplier</label>
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierForm;
