"use client";
import React, { useState, useEffect } from "react";
import { beerData } from "@/data";
import { GetSuppliers } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
import ErrorDiv from "@/app/components/ErrorDiv";
import { request } from "graphql-request";
import ItemComponent from "@/app/components/ItemsComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface ItemsSupplied {
  brand: string;
  quantity: number;
  numberOfBottles: number;
}

interface Supplier {
  _id?: string;
  name?: string;
}

interface Items {
  supplierID: string;
  amount: number;
  saleType: string;
  itemsSupplied: any[];
  date: Date;
}

const AddStock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [formData, setFormData] = useState<Items>({
    supplierID: "",
    amount: 0,
    saleType: "",
    itemsSupplied: [],
    date: new Date(),
  });
  const [selectedValue, setSelectedValue] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [supplierName, setSupplierName] = useState("");

  const loadSupplierFromDB = async () => {
    try {
      setProcessing(true);
      const input = {
        request: null,
      };
      const response: any = await request({
        url: graphqlURL,
        document: GetSuppliers,
        variables: input,
      });

      console.log("response ", response.getSuppliers);
      setSuppliers(response?.getSuppliers);
    } catch (error) {
      console.log("Error => ", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleSelectedItemChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "items") {
      setSelectedValue(value);
      setQuantity(0);
    }
    if (name == "amount") {
    }
  };

  const addItemToArray = () => {
    if (selectedValue && quantity > 0) {
      const splitValue = selectedValue.split(":");
      console.log("splitValue ", splitValue);
      //add the value to the array
      const items: ItemsSupplied = {
        brand: splitValue[1]!,
        quantity: quantity!,
        numberOfBottles: quantity * +splitValue[0], //the bottles in a crate
      };
      let newArray = [...formData.itemsSupplied];
      //check the array
      let beerIndex = newArray.findIndex(item => {
        return item?.brand == splitValue[1];
      });

      if (beerIndex > -1) {
        newArray[beerIndex!] = items;
      } else {
        newArray.push(items);
      }
      setFormData({
        ...formData,
        itemsSupplied: newArray!,
      });
      //clear selectedValue and quantity
      setQuantity(0);
      setSelectedValue("");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "quantity") {
      setQuantity(value);
    }
    if (name == "amount") {
      setFormData({
        ...formData,
        amount: value,
      });
    }

    if (name == "saleType") {
      setFormData({
        ...formData,
        saleType: value,
      });
    }
  };

  const deleteItemPreviouslySelected = (index: number) => {
    const items = [...formData.itemsSupplied];
    items.splice(index, 1);
    setFormData({
      ...formData,
      itemsSupplied: items,
    });
  };

  const handleSelectionChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "supplier") {
      const splitSupplierData = value.split(":");
      const _id = splitSupplierData[0];
      const name = splitSupplierData[1];
      setSupplierName(name);
      setFormData({
        ...formData,
        supplierID: _id,
      });
    }
  };

  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };
  //Effects:

  useEffect(() => {
    loadSupplierFromDB();
  }, []);

  return (
    <div className="max-w-full mx-auto mt-10">
      {error && <ErrorDiv errorMessage={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex justify-around mt-20">
          <div className="w-2/4 p-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Supplier</label>
              <select
                name="supplier"
                // value={formData.employmentType}
                onChange={handleSelectionChange}
                className="w-full px-3 py-2 border rounded">
                {processing ? (
                  <option value="" disabled>
                    Loading
                  </option>
                ) : (
                  <>
                    <option value="">select supplier</option>
                    {suppliers?.map(({ _id, name }) => {
                      return (
                        <option key={_id} value={`${_id}:${name}`}>
                          {name?.toUpperCase()}
                        </option>
                      );
                    })}
                  </>
                )}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Item supplied</label>
              <select
                name="items"
                onChange={handleSelectedItemChange}
                className="w-full px-3 py-2 border rounded">
                <>
                  <option value="">select item</option>
                  {beerData?.map(({ name, number }, index) => {
                    return (
                      <option key={index} value={`${number}:${name}`}>
                        {name?.toUpperCase()}
                      </option>
                    );
                  })}
                </>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="sale" className="block text-gray-700 text-sm font-bold mb-2">
                Sale Type
              </label>
              <select
                id="sale"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue=""
                name="saleType"
                onChange={handleChange}>
                <option value="" disabled>
                  Select sale type
                </option>
                <option value="CASH">Cash</option>
                <option value="CREDIT">Credit</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Date of Supply</label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {selectedValue && (
              <div className="border p-4 bg-gray-200 flex items-center w-2/3 m-auto mb-10">
                <p className="mr-4">{selectedValue && selectedValue.split(":")[1]}</p>

                <div className="flex">
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={handleChange}
                    className="border p-2 rounded-l w-2/5"
                  />

                  <button
                    className="bg-blue-500 text-white p-2 rounded-r w-3/5"
                    onClick={addItemToArray}>
                    Add Item
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-2/4 p-4">
            {supplierName && (
              <p className="text-lg">
                <b>Supplier :</b>
                <span className="ml-4">{supplierName}</span>
              </p>
            )}

            {formData.amount > 0 && (
              <p className="text-lg">
                <b>Amount :</b>
                <span className="ml-4">&#x20A6; {formData.amount}.00</span>
              </p>
            )}

            {formData.itemsSupplied.length > 0 && (
              <div>
                <h2 className="text-center text-lg">Item Details</h2>
                {formData.itemsSupplied.map(({ brand, quantity, numberOfBottles }, index) => {
                  return (
                    <ItemComponent
                      brand={brand}
                      quantity={quantity}
                      numberOfBottles={numberOfBottles}
                      index={index}
                      onDelete={deleteItemPreviouslySelected}
                    />
                  );
                })}
              </div>
            )}

            {formData.saleType && (
              <p className="text-lg">
                <b>Sale Type :</b>
                <span className="ml-4">{formData.saleType}</span>
              </p>
            )}

            {formData.date && (
              <p className="text-lg">
                <b>Supply date :</b>
                <span className="ml-4">{formData.date.toDateString()}</span>
              </p>
            )}

            {formData.amount > 0 &&
              formData.date &&
              formData.itemsSupplied.length > 0 &&
              formData.saleType &&
              formData.supplierID && (
                <div className="mb-4 text-center">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
                    Save supply details
                  </button>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStock;
