"use client";
import React, { useState, useEffect } from "react";
import { GetSuppliers, GetItems } from "@/app/graphqlRequest/queries";
import { AddBarStock } from "@/app/graphqlRequest/mutation";
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
  _id?: string;
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

interface Beer {
  _id?: string;
  name?: string;
  numberInCrate: number;
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
  const [beer, setBeer] = useState<Beer[]>([]);

  const loadSupplierAndBeerDataFromDB = async () => {
    try {
      setProcessing(true);
      const [supplier, beer] = (await Promise.all([
        request({
          url: graphqlURL,
          document: GetSuppliers,
          variables: { request: null },
        }),

        await request({
          url: graphqlURL,
          document: GetItems,
          variables: { request: null },
        }),
      ])) as [any, any];
      if (supplier) {
        setSuppliers(supplier?.getSuppliers);
      }

      if (beer) {
        setBeer(beer?.getItems);
      }
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
        quantity: +quantity!,
        _id: splitValue[2],
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
      setQuantity(+value);
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

  const handleItemSubmission = async () => {
    const dataToInsert = `
        Supplier: ${supplierName}
        Amount: ${formData.amount}
        Sale Type: ${formData.saleType}
        Items : ${formData.itemsSupplied.map(({ brand, quantity, numberOfBottles }) => {
          return `${brand}: ${quantity} => ${numberOfBottles}`;
        })}
        Transaction Date: ${formData.date.toDateString()}
    `;
    const confirmData = confirm(dataToInsert);
    if (!confirmData) return;
    try {
      setLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: AddBarStock,
        variables: { request: { ...formData, amount: +formData.amount } },
      });
      if (response?.addBarStock) {
        alert("Item added");
        setSelectedValue("");
        setSupplierName("");
        setFormData({
          supplierID: "",
          amount: 0,
          saleType: "",
          itemsSupplied: [],
          date: new Date(),
        });
      }
    } catch (error: any) {
      console.log("Error => ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //Effects:

  useEffect(() => {
    loadSupplierAndBeerDataFromDB();
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-10">
      <div className="text-center mt-20 text-xl">
        <h2 className="text-xl text-gray-500 bg-black">Add Bar Stock</h2>
      </div>

      {error && <ErrorDiv errorMessage={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex justify-around mx-auto">
          <div className="w-1/4 p-4 mx-auto">
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
                {processing ? (
                  <option value="" disabled>
                    Loading
                  </option>
                ) : (
                  <>
                    <option value="">select item</option>
                    {beer?.map(({ name, _id, numberInCrate }) => {
                      return (
                        <option key={_id} value={`${numberInCrate}:${name}:${_id}`}>
                          {name?.toUpperCase()}
                        </option>
                      );
                    })}
                  </>
                )}
              </select>
            </div>

            {selectedValue && (
              <div className="border p-4 bg-gray-200 flex items-center mb-10">
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
              <label className="block text-gray-700 text-sm font-bold mb-2">Date of Supply</label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div className="w-2/4 mx-auto p-4">
            {supplierName && (
              <p className="text-lg">
                <b>Supplier :</b>
                <span className="ml-4">{supplierName}</span>
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

            {formData.amount > 0 && (
              <p className="text-lg">
                <b>Amount :</b>
                <span className="ml-4">&#x20A6; {formData.amount}.00</span>
              </p>
            )}

            {formData.date && (
              <p className="text-lg">
                <b>Supply date :</b>
                <span className="ml-4">{formData.date.toDateString()}</span>
              </p>
            )}

            {formData.amount > 0 && <hr className="border-t border-gray-300 w-full my-4" />}

            {formData.amount > 0 &&
              formData.date &&
              formData.itemsSupplied.length > 0 &&
              formData.saleType &&
              formData.supplierID && (
                <div className="mb-4 text-center">
                  <button
                    onClick={handleItemSubmission}
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
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
