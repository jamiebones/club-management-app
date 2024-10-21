"use client";
import React, { useState, useEffect } from "react";
import { GetDonationStockAvailable } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
import DonatedStockComponent from "@/app/components/DonatedStocksComponent";
import { request } from "graphql-request";
import "react-datepicker/dist/react-datepicker.css";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;


const GetDonatedStock = () => {
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);

  const getDonatedStocks = async () => {
    try {
      setLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: GetDonationStockAvailable,
        variables: { request: null },
      });

      console.log("response ", response)
      
      setStocks(response?.getDonationStockAvailable);
    } catch (error) {
      console.log("Error => ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDonatedStocks();
  }, []);

  return (
    <div className="w-1/2 mx-auto py-8">
      {loading && <LoadingSpinner />}

      {
        stocks?.length === 0 ? 

        <>
          <div className="text-center p-6">
          <p className="text-lg text-gray-500 font-semibold">No donated stock available</p>
        </div>
        </>:

        <>
            <DonatedStockComponent stocks={stocks} />
        </>
      }
    </div>
  );
};

export default GetDonatedStock;
