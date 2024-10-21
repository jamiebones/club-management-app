"use client";
import React, { useState, useEffect } from "react";
import DonationUsageCard from "@/app/components/DonationUsageComponent";
import { request } from "graphql-request";
import { toast } from "react-toastify";
import { GetDonationsBetweenTwoDate } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface Donation {
  seller: {
    firstname: string;
    surname: string;
  };
  drinks: {
    brand: string;
    quantity: number;
  }[];
  date: string;
}

const DonationUsagePage: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to handle search between two dates

  const getDonationUsage = async () => {
    let data = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    } as any;

    try {
      setLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: GetDonationsBetweenTwoDate,
        variables: { request: data },
      });

      if (response.getDonationsBetweenTwoDate) {
        setFilteredDonations(response.getDonationsBetweenTwoDate);
      }
      console.log("data => ", response.getDonationsBetweenTwoDate);
    } catch (error: any) {
      console.log("Error => ", error);
      toast.error(`${error?.message}`, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {loading && <LoadingSpinner />}
      {/* Date Search Fields */}
      <div className="mb-6 bg-white p-4 shadow-md rounded-md max-w-lg mx-auto">
        <h2 className="text-lg font-bold mb-4">Search Donations by Date</h2>
        <div className="flex justify-between items-center space-x-4 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded"
            placeholder="Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded"
            placeholder="End Date"
          />
        </div>
        <button
          onClick={getDonationUsage}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Search
        </button>
      </div>

      {/* Display filtered results */}
      <div className="w-full">
        {filteredDonations.length > 0 && (
          <div>
            <p className="text-lg text-center">
              <b>Donated drinks brought out</b>
            </p>
            <DonationUsageCard donations={filteredDonations} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationUsagePage;
