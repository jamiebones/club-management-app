"use client";
import { useEffect, useState } from "react";
import { GetMemberDetails, GetItemsForSale } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
import { request } from "graphql-request";
import { FaSpinner, FaSearch } from "react-icons/fa";
import ItemToSellComponent from "@/app/components/ItemsToSellCoponent";
import MemberDisplay from "@/app/components/MemberDisplay";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface MemberSearch {
  memberID?: string;
  firstname?: string;
  lastname?: string;
}

interface MemberInfo {
  surname: string;
  firstname: string;
  memberID: string;
  title: string;
  membershipType: string;
}

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
}

const SellItem = () => {
  const [buyer, setBuyer] = useState<MemberInfo>({
    memberID: "",
    firstname: "",
    title: "",
    membershipType: "",
    surname: "",
  });
  const [processing, setProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<MemberSearch>({});
  const [notFound, setNotFound] = useState(false);
  const [drinks, setDrinks] = useState<Drinks[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<SelectedDrinks[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);

  const handleSerachTermChange = (e: any) => {
    const { name, value } = e.target;
    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
  };

  const handleSearchButtonClicked = async (e: any) => {
    if (!searchTerm.firstname && !searchTerm.lastname && !searchTerm.memberID) return;
    try {
      setProcessing(true);
      const response: any = await request({
        url: graphqlURL,
        document: GetMemberDetails,
        variables: { request: searchTerm },
      });
      if (response.findMember && response.findMember?.firstname) {
        //we have a member
        setNotFound(false);
        setBuyer(response.findMember);
        setSelectedDrinks([])
        
      }
      //case two no member:
      if (response.findMember && response.findMember?.message) {
        //no member
        setNotFound(true);
        setSelectedDrinks([])
        setBuyer({
          memberID: "",
          firstname: "",
          title: "",
          membershipType: "",
          surname: "",
        });
      }
    } catch (error) {
      console.log("error retrievig member ", error);
    } finally {
      setProcessing(false);
    }
  };

  const loadBeerDataFromDB = async () => {
    try {
      setItemsLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: GetItemsForSale,
        variables: { request: null },
      });
      if (response.getItems) {
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
    const numberInCrate = itemSplit[3];
    const sellingPrice = itemSplit[4];
    let prevItem = [...selectedDrinks];
    if (+totalStock > 0) {
      const newItem: SelectedDrinks = {
        price: +sellingPrice,
        _id,
        name,
        total: +sellingPrice,
        quantity: 1,
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

    //questions do I prevent from insert when the total stock is zero;
    //do it at the server side...
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

  useEffect(() => {
    loadBeerDataFromDB();
  }, []);

  return (
    <div className="container mt-20 p-4 mx-auto w-full">
      {/* //first row} */}
      <div className="flex justify-around p-4 mx-auto w-full">
        <div className="w-2/3 p-4">
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Search Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Member ID Search */}
              <div>
                <label htmlFor="memberID" className="text-sm text-gray-600 block">
                  Member ID
                </label>
                <input
                  onChange={handleSerachTermChange}
                  type="text"
                  id="memberID"
                  name="memberID"
                  className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                  placeholder="Enter Member ID"
                />
              </div>

              {/* Firstname Search */}
              <div>
                <label htmlFor="firstname" className="text-sm text-gray-600 block">
                  Firstname
                </label>
                <input
                  onChange={handleSerachTermChange}
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                  placeholder="Enter Firstname"
                />
              </div>

              {/* Surname Search */}
              <div>
                <label htmlFor="surname" className="text-sm text-gray-600 block">
                  Surname
                </label>
                <input
                  onChange={handleSerachTermChange}
                  type="text"
                  id="surname"
                  name="surname"
                  className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                  placeholder="Enter Surname"
                />
              </div>
            </div>
            <button
              onClick={handleSearchButtonClicked}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {processing ? (
                <div className="flex justify-between items-center">
                  <FaSpinner className="animate-spin" /> &nbsp;&nbsp;
                  <label>searching.......</label>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <FaSearch className="mr-2" />
                  <label>Search</label>
                </div>
              )}
            </button>
          </div>
          {notFound && (
            <div>
              <p className="text-lg">Member not found!</p>
            </div>
          )}
        </div>

        <div className="w-1/3">
          {buyer && buyer.firstname && buyer.surname && <MemberDisplay member={buyer!} />}
        </div>
      </div>

      <hr />

      {/* //second row} */}

      <div className="flex justify-around p-4 mx-auto w-full">
        <div className="w-1/3">
          {buyer && buyer.firstname && buyer.surname && (
            <div>
              <div className="mb-4">
                <label htmlFor="items" className="text-sm text-gray-600 block">
                  Item
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
                          className="flex justify-between">
                          <span className="mr-auto">{name}:</span>
                          <span className="ml-auto">{totalStock}</span>
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="w-2/3 p-4">
          <ItemToSellComponent
            drinks={selectedDrinks}
            removeItem={removeItem}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        </div>
      </div>
    </div>
  );
};

export default SellItem;
