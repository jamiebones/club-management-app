"use client";
import React, { useState, useEffect } from "react";

import {
  GetPaymentMadeToPerson,
  GetStockSuppliedBySupplier,
  GetSuppliersDetails,
} from "@/app/graphqlRequest/queries";
import { MakeDrinksPaymentToSupplier } from "@/app/graphqlRequest/mutation";
import LoadingSpinner from "@/app/components/Loading";
import BarStockUI from "@/app/components/BarStockUI";
import PaymentTable from "@/app/components/PaymentTable";
import { request } from "graphql-request";
import PaymentFormModal from "@/app/components/PaymentModal";
import { toast } from "react-toastify";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface GetSuppliersResponse {
  getSuppliers: Supplier[]; // Assuming `Supplier[]` is the correct type for suppliers
}

// Define the structure for Supplier if not already defined
interface Supplier {
  _id: string;
  name: string;
  contact: string[];
  address: string;
  // add other fields as per your data model
}

interface Payment {
  amountPaid: number;
  paymentFor: string;
  paymentCategory: "SALARY" | "PALLIATIVE" | "PURCHASES" | "WORKMANSHIP";
  date: string;
}

// Define the types for the bar stock data

const DrinksSupplied = () => {
  const [supplierID, setSupplierID] = useState("");
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplierSupply, setSupplierSupply] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState({ name: "", contact: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [gettingSupply, setGettingSupply] = useState(false);
  const [payments, setPayments] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [totalSupplied, setTotalSupplied] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadSupplierDataFromDB = async () => {
    try {
      setProcessing(true);
      const res = await request<GetSuppliersResponse>({
        url: graphqlURL,
        document: GetSuppliersDetails,
        variables: { request: null },
      });
      if (res) {
        setSuppliers(res?.getSuppliers);
      }
    } catch (error) {
      console.log("Error => ", error);
    } finally {
      setProcessing(false);
    }
  };

  const loadDrinksSuppliedBySupplier = async (supplierID: string) => {
    try {
      setGettingSupply(true);
      const res = await request<any>({
        url: graphqlURL,
        document: GetStockSuppliedBySupplier,
        variables: { request: { _id: supplierID } },
      });
      if (res?.getStockSuppliedBySupplier) {
        //loop here and get the total supplied
        let total = 0;
        res?.getStockSuppliedBySupplier.map((supply: any) => {
          total += supply?.amount;
        });
        setTotalSupplied(total);
        setSupplierSupply(res?.getStockSuppliedBySupplier);
      }
    } catch (error) {
      console.log("Error => ", error);
    } finally {
      setGettingSupply(false);
    }
  };

  const getPaymentMadeToSupplier = async (receiverID: string) => {
    try {
      setPaymentLoading(true);
      const res = await request<any>({
        url: graphqlURL,
        document: GetPaymentMadeToPerson,
        variables: { request: { receiverID } },
      });
      console.log("res data => ", res);
      if (res) {
        let total = 0;
        res?.getPaymentMadeToPerson.map((supply: any) => {
          total += supply?.amountPaid;
        });
        setTotalPaid(total);
        setPayments(res?.getPaymentMadeToPerson);
      }
    } catch (error) {
      console.log("Error => ", error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleSelectChange = (e: any) => {
    const supplierString = e.target.value;
    const val = supplierString.split(":");
    const selValue = {
      name: val[1],
      contact: val[2],
      address: val[3],
    };
    setSelectedSupplier(selValue);
    setSupplierID(val[0]);
  };

  const handleSubmit = async (paymentDetails: Payment) => {
    const input = {
      amountPaid: +paymentDetails.amountPaid,
      paymentCategory: paymentDetails.paymentCategory,
      paymentFor: paymentDetails.paymentFor,
      receiverID: supplierID,
      date: new Date(paymentDetails.date),
    };

    try {
      const dataToInsert = `Confirm the following data \n
      Supplier: ${selectedSupplier.name}
      Amount: ${paymentDetails.amountPaid}
      Transaction Date: ${new Date(paymentDetails.date).toDateString()}
      Purpose of payment: ${paymentDetails.paymentFor}
  `;
      const confirmData = confirm(dataToInsert);
      if (!confirmData) return;
      const response: any = await request({
        url: graphqlURL,
        document: MakeDrinksPaymentToSupplier,
        variables: { request: { ...input } },
      });
      if (response?.addPayment) {
        getPaymentMadeToSupplier(supplierID);
        toast.success("Payment to supplier recorded.", {
          position: "top-right",
        });
      }
    } catch (error: any) {
      console.log("error ", error);
      toast.error(error?.message, {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    loadSupplierDataFromDB();
  }, []);

  useEffect(() => {
    if (supplierID) {
      loadDrinksSuppliedBySupplier(supplierID);
      getPaymentMadeToSupplier(supplierID);
    }
  }, [supplierID]);

  useEffect(() => {
    setBalance(totalSupplied - totalPaid);
  }, [totalSupplied, totalPaid]);

  return (
    <div className="mx-auto p-4 space-y-8">
      {/* First Row */}

      {/* First Sector: Option Select */}
      <div className="flex">
        <div className="mx-auto">
          <div className="w-3/4 mx-auto min-w-11">
            <label htmlFor="options" className="block text-sm font-medium text-gray-700 mb-2">
              Select a Supplier
            </label>
            <select
              id="options"
              onChange={handleSelectChange}
              className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {processing ? (
                <option value="" disabled>
                  Loading
                </option>
              ) : (
                <>
                  <option value="">select supplier</option>
                  {suppliers?.map(({ _id, name, contact, address }) => {
                    return (
                      <option key={_id} value={`${_id}:${name}:${contact}:${address}`}>
                        {name?.toUpperCase()}
                      </option>
                    );
                  })}
                </>
              )}
            </select>
          </div>

          {selectedSupplier.name !== "" && (
            <div className="flex-1 bg-gray-100 p-4 rounded-md shadow">
              <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                  {/* Name */}
                  <div className="text-gray-700">
                    <h2 className="text-lg font-semibold">Name</h2>
                    <p>{selectedSupplier.name.toUpperCase()}</p>
                  </div>

                  {/* Contact */}
                  <div className="text-gray-700">
                    <h2 className="text-lg font-semibold">Contact</h2>
                    <p>{selectedSupplier.contact}</p>
                  </div>

                  {/* Address */}
                  <div className="text-gray-700">
                    <h2 className="text-lg font-semibold">Address</h2>
                    <p>{selectedSupplier.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lg:w-1/5 p-6 rounded-md shadow">
            {paymentLoading && <LoadingSpinner />}

            {!paymentLoading && selectedSupplier.name !== "" && (
              <>
                <PaymentTable payments={payments} />
              </>
            )}

            {selectedSupplier.name !== "" && (
              <div className="flex flex-col">
                <div className="text-center mb-2 bg-green-500 p-1">
                  <p className="text-lg text-white">Bal payment: ₦ {balance}</p>
                </div>

                <div>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => setIsModalOpen(true)}>
                    Add Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Second Sector: Display Selected Option Details */}

      {/* Second Row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* First Sector: 2/3 of the screen */}
        <div className="md:w-full bg-white p-6 rounded-md">
          {gettingSupply && <LoadingSpinner />}
          {!gettingSupply && supplierSupply?.length > 0 && (
            <div className="lg:w-4/5 bg-white p-6 rounded-md shadow">
              <BarStockUI barStockData={supplierSupply} />
            </div>
          )}
        </div>

        <PaymentFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />

        {/* Second Sector: 1/3 of the screen */}
      </div>
    </div>
  );
};

export default DrinksSupplied;
