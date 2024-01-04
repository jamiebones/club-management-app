"use client";
import React, { useState, useEffect } from "react";
import { beerData } from "@/data";
import { GetSuppliers } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
import ErrorDiv from "@/app/components/ErrorDiv";
import { request } from "graphql-request";
import ItemComponent from "@/app/components/ItemsComponent";

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
  amount: string;
  saleType: string;
  itemsSupplied: any[];
}

const AddStock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [formData, setFormData] = useState<Items>({
    supplierID: "",
    amount: "",
    saleType: "",
    itemsSupplied: [],
  });
  const [selectedValue, setSelectedValue] = useState("");
  const [quantity, setQuantity] = useState(0);

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
  };

  console.log("formData => ", formData.itemsSupplied)

  const addItemToArray = () => {
    if (selectedValue && quantity) {
      const splitValue = selectedValue.split(":");
      console.log("splitValue ", splitValue)
      //add the value to the array
      const items: ItemsSupplied = {
        brand: splitValue[1]!,
        quantity: quantity!,
        numberOfBottles: (quantity * +splitValue[0]), //the bottles in a crate
      };
      //check the array
      let beerIndex = formData.itemsSupplied?.findIndex(item => {
        return item?.brand == splitValue[0];
      });
      let newArray = [...formData.itemsSupplied];
      if (beerIndex! > -1) {
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
                // onChange={handleChange}
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
                        <option key={_id} value={_id}>
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

            {selectedValue && (
              <div className="border p-4 bg-gray-200 flex items-center w-2/3 m-auto">
                <p className="mr-4">{selectedValue && selectedValue.split(":")[1]}</p>

                <div className="flex">
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={handleChange}
                    className="border p-2 rounded-l w-2/5"
                  />

                  <button className="bg-blue-500 text-white p-2 rounded-r w-3/5" onClick={addItemToArray}>
                    Add Item
                  </button>
                </div>
              </div>
            )}

            { formData.itemsSupplied.length > 0 && (
               <div>
                   { formData.itemsSupplied.map(({brand, quantity, numberOfBottles})=> {
                    return <ItemComponent brand={brand} quantity={quantity} numberOfBottles={numberOfBottles}/>
                   })}
               </div>
            )}



          </div>
          <div className="w-2/4 p-4">Result Panel</div>
        </div>
      )}
    </div>
  );
};

export default AddStock;
