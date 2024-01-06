"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaSpinner, FaTools } from "react-icons/fa";
import { request } from "graphql-request";
import { AddNewItemToDB } from "../graphqlRequest/mutation";
import LoadingSpinner from "@/app/components/Loading";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface Item {
  name: string;
  sellingPrice: number;
  totalStock: number;
  numberInCrate: number;
}

const AddItem = () => {
  const [formData, setFormData] = useState<Item>({
    name: "",
    sellingPrice: 0,
    totalStock: 0,
    numberInCrate: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name !== name) {
      setFormData({
        ...formData,
        [name]: +value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert("The item name is a required field");
      return;
    }
    if (formData.sellingPrice < 0) {
      alert("The selling price is a required field");
      return;
    }
    if (formData.numberInCrate < 0) {
      alert("The number of item in the crate is a required field");
      return;
    }

    const dataToInsert = `
      Item: ${formData.name}
      Number in crate: ${+formData.numberInCrate}
      Selling price: ${+formData.sellingPrice}
    `;
    const confirmInsert = confirm(dataToInsert);
    if (!confirmInsert) return;
    try {
      const dataInput = {
        request: {
          ...formData,
          sellingPrice: +formData.sellingPrice,
          numberInCrate: +formData.numberInCrate,
        },
      };
      console.log("data => ", +formData.sellingPrice, +formData.numberInCrate,)
      setLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: AddNewItemToDB,
        variables: dataInput,
      });
      console.log("response from mutation, => ", response);
      setFormData({
        name: "",
        sellingPrice: 0,
        numberInCrate: 0,
        totalStock: 0,
      });

      alert("New item details added");
    } catch (error) {
      console.log("Error => ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white p-4 shadow-md rounded-md max-w-md mx-auto mt-4">
          <h2 className="text-xl font-bold mb-4">Add Item Details</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Item name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Selling price</label>
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Number in crate</label>
            <input
              type="number"
              name="numberInCrate"
              value={formData.numberInCrate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <label>Loading</label>
                </>
              ) : (
                <div className="flex justify-between items-center">
                  <FaTools className="mr-2" />
                  <label>Save Item</label>
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItem;
