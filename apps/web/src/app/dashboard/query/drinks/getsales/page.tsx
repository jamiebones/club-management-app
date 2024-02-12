"use client";
import React, { useState, useEffect } from "react";
import { GetBarSaleData } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
import ErrorDiv from "@/app/components/ErrorDiv";
import { request } from "graphql-request";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { options } from "@/app/api/auth/[...nextauth]/options";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface Beer {
  brand?: string;
  quantity: number;
}
const formattedDate = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const GetSales = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [sales, setSales] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [beerTotal, setBeerTotal] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [saleType, setSaleType] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const processDrinksData = (data: any[]) => {
    let soldBeer: Beer[] = [];
    let itemsArray: any[] = [];
    data.map(salesData => {
      itemsArray.push(salesData);
      const { items } = salesData;
      //loop through the items array
      for (let i = 0; i < items.length; i++) {
        const { brand, quantity } = items[i];
        //find the brand
        const beerIndex = soldBeer.findIndex(e => e.brand == brand);
        if (beerIndex < 0) {
          //new insert
          const beer = {
            brand,
            quantity,
          };
          soldBeer.push(beer);
        } else {
          const updateBeer = soldBeer[beerIndex];
          updateBeer.quantity += quantity;
          soldBeer[beerIndex] = updateBeer;
        }
      }
    });
    return {
      data: itemsArray,
      beerTotal: soldBeer,
    };
  };

  const getSalesData = async () => {
    let data = {
      startDate: startDate,
      endDate: endDate,
    } as any;
    if (saleType) {
      data["saleType"] = saleType;
    }
    if (paymentType) {
      data["paymentType"] = paymentType;
    }
    try {
      setLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: GetBarSaleData,
        variables: { request: data },
      });
      const salesData = processDrinksData(response?.findDrinksSaleByDate?.sales);
      if (salesData) {
        setSales(salesData?.data as any);
        setBeerTotal(salesData?.beerTotal as any);
      }
      setStocks(response?.findDrinksSaleByDate?.stocks);
      console.log("data => ", processDrinksData(response?.findDrinksSaleByDate?.sales));
    } catch (error: any) {
      console.log("Error => ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlestartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleendDateChange = (date: Date) => {
    setEndDate(date);
  };

  const handleSelectChange = (e: any) => {
    const { value, name } = e.target;
    if (name == "saleType" && value !== "") {
      setSaleType(value);
    }
    if (name == "paymentType" && value !== "") {
      setPaymentType(value);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Sale Information</h1>
      {error && <ErrorDiv errorMessage={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-lg bg-gray-100 border border-gray-300 rounded p-2">
          <div className="flex justify-between">
            <div className="flex flex-col w-full md:w-1/2 p-2">
              <label className="text-sm mb-1">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={handlestartDateChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2 p-2">
              <label className="text-sm mb-1">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={handleendDateChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-full md:w-1/2 p-2">
              <label className="text-sm mb-1">Sale Type</label>
              <select
                name="saleType"
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                value={saleType}
                onChange={handleSelectChange}>
                <option value="">Sale type</option>
                <option value="CASH">CASH</option>
                <option value="CREDIT">CREDIT</option>
              </select>
            </div>

            <div className="flex flex-col w-full md:w-1/2 p-2">
              <label className="text-sm mb-1">Payment Type</label>
              <select
                name="paymentType"
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                value={paymentType}
                onChange={handleSelectChange}>
                {" "}
                <option value="">Select payment type</option>
                <option value="CASH">CASH</option>
                <option value="POS">POS</option>
                <option value="TRANSFER">TRANSFER</option>
                <option value="CREDIT">CREDIT</option>
              </select>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={getSalesData}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Get Sales Data
            </button>
          </div>
        </div>
      )}

      {/*table starts here */}
      <div className="mt-5">
        {sales && sales.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-center rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Drinks Sold between {formattedDate(startDate)} and {formattedDate(endDate)}
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Drinks purchased
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sale Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Method
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sold By
                  </th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale: any, index) => {
                  return (
                    <tr key={sale} className="border-t">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">
                        {sale?.customer?.title.toUpperCase()}{" "}
                        {sale?.customer?.firstname.toUpperCase()}{" "}
                        {sale?.customer?.surname.toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        {sale?.items.map((item: any) => {
                          return (
                            <p>
                              {item.brand} : {item.quantity}
                            </p>
                          );
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <p>{sale?.amount}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{sale?.date && formattedDate(sale?.date)}</p>
                      </td>

                      <td className="px-6 py-4">
                        <p>{sale?.saleType}</p>
                      </td>

                      <td className="px-6 py-4">
                        <p>{sale?.paymentType}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>
                          {sale?.seller?.firstname.toUpperCase()}{" "}
                          {sale?.seller?.surname.toUpperCase()}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between">
        {beerTotal && beerTotal.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2 p-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-center rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Sold Drinks Summary
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Brand of drink
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity sold
                  </th>
                </tr>
              </thead>
              <tbody>
                {beerTotal.map((beer: any) => {
                  return (
                    <tr key={beer.brand}>
                      <td className="px-6 py-4">{beer.brand}</td>
                      <td className="px-6 py-4">{beer.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {stocks && stocks.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-center rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Availiable Stock
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Brand of drink
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bottles Left
                  </th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((beer: any) => {
                  return (
                    <tr key={beer.name}>
                      <td className="px-6 py-4">{beer.name}</td>
                      <td className="px-6 py-4">{beer.totalStock}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetSales;

{
  /* <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Our products
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
        </caption>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
</div> */
}
