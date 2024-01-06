"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaSpinner, FaTools } from "react-icons/fa";
import { request } from "graphql-request";
import { GetItemByName } from "../graphqlRequest/queries";
import { UpdateItem } from "../graphqlRequest/mutation";
import LoadingSpinner from "@/app/components/Loading";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface Item {
  name: string;
  sellingPrice: number;
  numberInCrate: number;
  _id: string
}

const AddItem = () => {
  const [item, setItem] = useState("");
  const [formData, setFormData] = useState<Item>({
    name: "",
    sellingPrice: 0,
    numberInCrate: 0,
    _id: ""
  });
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
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

  const handleSearch = async (e: any) => {
    const { name, value } = e.target;
    if (value.length > 3) {
      //trigger the call here
      try {
        const dataInput = {
          request: {
            name: value,
          },
        };
        setSearching(true);
        const response: any = await request({
          url: graphqlURL,
          document: GetItemByName,
          variables: dataInput,
        });
        if (response) {
          const { name, numberInCrate, sellingPrice, _id } = response?.getItemByName;
          setFormData({
            name,
            numberInCrate,
            sellingPrice,
            _id
          });
        } else {
          alert(`${value} not found`);
          return;
        }
      } catch (error) {
        console.log("error from get name ", error);
      } finally {
        setSearching(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert("The item name is a required field");
      return;
    }
    if (formData.sellingPrice < 0) {
      alert("The selling price can not be less than zero");
      return;
    }
    if (formData.numberInCrate < 0) {
      alert("The number of item in the crate can not be less than 0");
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
      setLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: UpdateItem,
        variables: dataInput,
      });
      if (response) {
        alert("Item updated");
      }
      setFormData({
        name: "",
        sellingPrice: 0,
        numberInCrate: 0,
        _id: ""
      });
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
          <h2 className="text-xl font-bold mb-4">Update Item Details</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Search item</label>
            <input
              type="text"
              name="name"
              onChange={handleSearch}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {searching && (
            <p className="text-lg">
              <b>Getting Item from database.....</b>
            </p>
          )}

          {formData.name && (
            <div>
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
                      <label>Update Item</label>
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddItem;
