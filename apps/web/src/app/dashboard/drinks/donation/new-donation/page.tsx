"use client";
import { useEffect, useState } from "react";
import { GetItemsForSale } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
import ErrorDiv from "@/app/components/ErrorDiv";
import { toast } from "react-toastify";
import { request } from "graphql-request";
import { FaSpinner, FaSearch, FaApplePay } from "react-icons/fa";
import ItemToSellComponent from "@/app/components/ItemsToSellCoponent";
import { AddNewDonation } from "@/app/graphqlRequest/mutation";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;


interface Drinks {
  _id?: string;
  name?: string;
  numberInCrate?: string;
  totalStock?: string;
  sellingPrice?: number;
}

interface SelectedDrinks {
  name: string;
  quantity: number;
  price: number;
  _id: number;
  total: number;
  stock: number;
}

const SaveDonation = () => {
  const [drinks, setDrinks] = useState<Drinks[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<SelectedDrinks[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBeerDataFromDB = async () => {
    try {
      setItemsLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: GetItemsForSale,
        variables: { request: null },
      });
      if (response.getItems) {
        console.log(response.getItems);
        setDrinks(response.getItems);
      }
    } catch (error) {
      console.log("Error => ", error);
    } finally {
      setItemsLoading(false);
    }
  };

  const handleItemSelectionChange = (e: any) => {
    //${_id}:${name}:${totalStock}:${numberInCrate}
    const { value } = e.target;
    const itemSplit = value.split(":");
    const _id = itemSplit[0];
    const name = itemSplit[1];
    const totalStock = itemSplit[2];
    const sellingPrice = itemSplit[4];
    let prevItem = [...selectedDrinks];
    if (+totalStock > 0) {
      const newItem: SelectedDrinks = {
        price: +sellingPrice,
        _id,
        name,
        total: +sellingPrice,
        quantity: 1,
        stock: +totalStock,
      };
      const itemIndex = selectedDrinks.findIndex(item => item._id === _id);
      if (itemIndex > -1) {
        //replace the index
        prevItem[itemIndex] = newItem;
        setSelectedDrinks(prevItem);
      } else {
        //new item
        prevItem.push(newItem);
        setSelectedDrinks(prevItem);
      }
    }
  };

  const addItem = (index: number) => {
    const items: SelectedDrinks[] = [...selectedDrinks];
    const item = items[index];
    item.quantity += 1;
    items[index] = item;
    setSelectedDrinks(items);
  };

  const removeItem = (index: number) => {
    const items: SelectedDrinks[] = [...selectedDrinks];
    const item = items[index];
    if (+item.quantity > 1) {
      item.quantity -= 1;
      items[index] = item;
      setSelectedDrinks(items);
    }
  };

  const deleteItem = (index: number) => {
    const items = [...selectedDrinks];
    items.splice(index, 1);
    setSelectedDrinks(items);
  };

  const handleDrinksSale = async () => {
    let total = 0;
    selectedDrinks.map(({ quantity, price }) => {
      total += quantity * price;
    });
    if (selectedDrinks?.length == 0) {
      toast.error("No drinks selected", {
        position: "top-right",
      });
      return;
    }
    const dataToInsert = `
       Drinks : ${selectedDrinks.map(({ name, quantity, price }) => {
         return `${name} = ${quantity * price} \n`;
       })}
       Total: ${total}
    `;

    const confirmInsert = confirm(dataToInsert);
    if (!confirmInsert) return;
    const drinks: {
      brand: string;
      quantity: number;
    }[] = [];

    selectedDrinks.forEach(({ name, quantity }) => {
      drinks.push({
        brand: name,
        quantity,
      });
    });

    try {
      setLoading(true);
      const data = {
        drinks,
      };
      const response: any = await request({
        url: graphqlURL,
        document: AddNewDonation,
        variables: { request: { ...data } },
      });
      if (response.addNewDonation) {
        toast.success(`${response.addNewDonation} drinks added to donated bank`, {
          position: "top-right",
        });
        setSelectedDrinks([]);
        loadBeerDataFromDB();
      }
    } catch (error: any) {
      setError(error?.message);
      toast.error(`Error: ${error?.message}`, {
        position: "top-right",
      });
      console.log("Error from saving donated drinks => ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBeerDataFromDB();
  }, []);

  return (
    <div className="container mt-20 p-4 mx-auto w-full">
      <h1 className="bg-slate-400">
        <b>Add Drinks to Donated Stock</b>
      </h1>
      {loading && <LoadingSpinner />}
      {error && <ErrorDiv errorMessage={error} />}
      {/* //first row} */}

      <hr />

      {/* //second row} */}

      <div className="flex flex-col items-stretch p-4 mx-auto w-full">
        <div className="w-1/2 self-center">
          <div>
            <div className="mb-4">
              <label htmlFor="items" className="text-sm text-gray-600 block">
                Select Drinks
              </label>
              <select
                id="items"
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                defaultValue=""
                name="items"
                onChange={handleItemSelectionChange}>
                <option value="" disabled>
                  Select Item
                </option>
                {itemsLoading && <option>loading.......</option>}
                {drinks &&
                  drinks.map(({ _id, name, totalStock, numberInCrate, sellingPrice }) => {
                    return (
                      <option
                        value={`${_id}:${name}:${totalStock}:${numberInCrate}:${sellingPrice}`}
                        className="flex flex-col justify-between">
                        <span className="inline-block">{name} </span>
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        <div className="w-3/5 p-4">
          <ItemToSellComponent
            drinks={selectedDrinks}
            removeItem={removeItem}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        </div>

        {selectedDrinks && selectedDrinks.length > 0 && (
          <div className="w-1/2 self-center mt-auto">
            <div className="self-center mt-auto">
              <button
                onClick={handleDrinksSale}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded flex items-center w-full">
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <label className="text-center">Loading</label>
                  </>
                ) : (
                  <>
                    <FaApplePay className="mr-2" />
                    <label className="text-center">Save Donated Drinks</label>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveDonation;
