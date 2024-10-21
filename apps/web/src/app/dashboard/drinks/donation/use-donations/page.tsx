"use client";
import { useEffect, useState } from "react";
import { GetDonationStockAvailable } from "@/app/graphqlRequest/queries";
import { BringOutDonation } from "@/app/graphqlRequest/mutation";
import LoadingSpinner from "@/app/components/Loading";
import ErrorDiv from "@/app/components/ErrorDiv";
import { request } from "graphql-request";
import { FaSpinner, FaApplePay } from "react-icons/fa";
import BringDonatedStocksComponent from "@/app/components/BringDonatedStocksComponents";
import { toast } from "react-toastify";



const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface Drinks {
  brand: string;
  quantity: number;
  _id: string;
}

interface SelectedDrinks {
  brand: string;
  quantity: number;
  _id: number;
}

const UseDonation = () => {
  const [drinks, setDrinks] = useState<Drinks[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<SelectedDrinks[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [total, setTotal] = useState(0);

  const loadDonatedStockDataFromDB = async () => {
    try {
      setItemsLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: GetDonationStockAvailable,
        variables: { request: null },
      });
      if (response.getDonationStockAvailable) {
        setDrinks(response.getDonationStockAvailable);
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
    const brand = itemSplit[1];
    const quantity = itemSplit[2];
    let prevItem = [...selectedDrinks];
    if (+quantity > 0) {
      const newItem: SelectedDrinks = {
        brand,
        quantity: 1,
        _id,
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
      setTotal(total + 1);
    }
  };

  const addItem = (index: number) => {
    const items: SelectedDrinks[] = [...selectedDrinks];
    const item = items[index];
    if (+item.quantity + 1 <= drinks[index].quantity) {
      item.quantity += 1;
      items[index] = item;
      setSelectedDrinks(items);
      setTotal(total + 1);
    }
  };

  const removeItem = (index: number) => {
    const items: SelectedDrinks[] = [...selectedDrinks];
    const item = items[index];
    if (+item.quantity > 1) {
      item.quantity -= 1;
      items[index] = item;
      setSelectedDrinks(items);
      setTotal(total - 1);
    }
  };

  const deleteItem = (index: number) => {
    const items = [...selectedDrinks];
    const num = items[index].quantity;
    items.splice(index, 1);
    setSelectedDrinks(items);
    setTotal(total - num);
  };

  const handleDrinksSale = async () => {
    if (selectedDrinks?.length == 0) {
      alert("Select some drinks you are selling");
      return;
    }

    const dataToInsert = `
       Drinks : ${selectedDrinks.map(({ brand, quantity }) => {
         return `${brand}: ${quantity} \n`;
       })}
       Total bottles: ${total}
    `;

    const confirmInsert = confirm(dataToInsert);
    if (!confirmInsert) return;
    const drinks: {
      brand: string;
      quantity: number;
    }[] = [];

    selectedDrinks.forEach(({ brand, quantity }) => {
      drinks.push({
        brand,
        quantity,
      });
    });

    try {
      setLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: BringOutDonation,
        variables: { request: { drinks} },
      });
      toast.success(`${response.bringOutDonation} drinks removed from the donation bank`, {
        position: "top-right",
      });
      setSelectedDrinks([]);
      loadDonatedStockDataFromDB();
    } catch (error: any) {
      toast.error(`${error?.message}`, {
        position: "top-right",
      });
      console.log("Error from removing donated drinks => ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonatedStockDataFromDB();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col h-screen">
        {/* Row 1 */}
        <div className="flex-1 flex-col">
          <h1 className="text-lg">
            <b>Share Donated Drinks</b>
          </h1>
          {loading && <LoadingSpinner />}
          {error && <ErrorDiv errorMessage={error} />}

          <hr />

          <div className="mb-4 bg-white w-1/2 h-1/3 p-4 rounded shadow-lg">
            <label htmlFor="items" className="text-sm text-gray-600 block">
              Donated drinks stock
            </label>
            <select
              id="items"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
              defaultValue=""
              name="items"
              onChange={handleItemSelectionChange}>
              <option value="" disabled>
                Select drink
              </option>
              {itemsLoading && <option>loading.......</option>}
              {drinks &&
                drinks.map(({ _id, brand, quantity }) => {
                  return (
                    <option
                      value={`${_id}:${brand}:${quantity}`}
                      className="flex flex-col justify-between">
                      <span className="inline-block">{brand} : </span>
                      <span className="inline-block self-end p-4">{quantity}</span>
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="w-full mt-auto">
            <BringDonatedStocksComponent
              drinks={selectedDrinks}
              removeItem={removeItem}
              addItem={addItem}
              deleteItem={deleteItem}
              total={total}
            />
          </div>

          <div>
            {selectedDrinks.length > 0 && (
              <div className="self-center mt-auto">
                <button
                  onClick={handleDrinksSale}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded flex items-center">
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <label>Loading</label>
                    </>
                  ) : (
                    <>
                      <FaApplePay className="mr-2" />
                      <label>Save Donated Drinks Shared</label>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseDonation;
