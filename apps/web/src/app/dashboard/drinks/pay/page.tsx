"use client";
import React, { useEffect, useState } from "react";
import { GetMemberPurchase } from "@/app/graphqlRequest/queries";
import { MemberBarPayment } from "@/app/graphqlRequest/mutation";
import LoadingSpinner from "@/app/components/Loading";
import ErrorDiv from "@/app/components/ErrorDiv";
import { request } from "graphql-request";
import { toast } from "react-toastify";
import MemberPurchaseComponent from "@/app/components/MemberPurchasesComponent";

import { FaSpinner, FaSearch, FaApplePay } from "react-icons/fa";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface MemberSearch {
  memberID?: string;
  firstname?: string;
  lastname?: string;
}

const calTotal = (arr: [], field: string ): number => {
    let total = 0;
    arr.forEach((ele) => {
        total += ele[field]
    });
    return total;
}

const PayForDrinksPage = () => {
  const [processing, setProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<MemberSearch>({});
  const [purchases, setPurchases] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState<null| string>(null);
  const [member, setMember] = useState({ memberID: "", firstname: "", surname: "", title: "" });
  const [owing, setOwing ] = useState(0);
  const [totalPurchase, setTotalPurchase ] = useState(0);
  const [totalPayment, setTotalPayment ] = useState(0);

  const handleSerachTermChange = (e: any) => {
    const { name, value } = e.target;
    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
  };
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchButtonClicked = async (e: any) => {
    if (!searchTerm.firstname && !searchTerm.lastname && !searchTerm.memberID) return;
    getMemberPaymentDataFromDB(searchTerm);
  };

  const getMemberPaymentDataFromDB = async (searchTerm: any) => {
    try {
      setProcessing(true);
      const response: any = await request({
        url: graphqlURL,
        document: GetMemberPurchase,
        variables: { request: searchTerm },
      });
      setMember({ memberID: "", firstname: "", surname: "", title: "" });
      if (response.getMemberPurchase) {
        //we have a member
        setPayments(response.getMemberPurchase.payments);
        let totalPayment = calTotal(response.getMemberPurchase.payments, "amount");
        let totalPurchase = calTotal(response.getMemberPurchase.purchase, "amount");
        setTotalPayment(totalPayment);
        setTotalPurchase(totalPurchase);
        setPurchases(response.getMemberPurchase.purchase);
        setMember(response.getMemberPurchase.memberDetails);
        setError(null);
      }
    } catch (error: any) {
      setError("User not found");
      setPayments([]);
      setPurchases([]);
      setMember({ memberID: "", firstname: "", surname: "", title: "" });
      console.log("error retrievig member ", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (number == "" && date == "") return;

    const input = {
      memberID: member.memberID,
      date: new Date(date),
      amount: +number,
    };
    const confirm = `
        You are adding: \n
        Amount : ${number}
        Date: ${date} \n

        Please confirm
    `;
    if (!confirm) return;
    try {
      const response: any = await request({
        url: graphqlURL,
        document: MemberBarPayment,
        variables: { request: { ...input } },
      });
      if (response.memberBarPayment._id) {
        toast.success("Payment added", {
          position: "top-right",
        });
        getMemberPaymentDataFromDB(searchTerm);
      }
    } catch (error: any) {
      console.log("error adding payment: ", error);
      toast.error(error?.message, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
      setNumber("");
      setDate("");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
      });
    }
  }, [error]);

  return (
    <div className="p-6">
      {/* Search and Form Row */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Component */}
        <div className="w-1/2 p-4">
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
        </div>

        {/* Form */}
        <div className="w-1/2 p-4">
          {member?.firstname && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Member Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 block">Member ID</label>
                  <p className="text-lg font-medium">{member?.memberID}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block">Title</label>
                  <p className="text-lg font-medium">{member?.title}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block">Firstname</label>
                  <p className="text-lg font-medium">{member?.firstname}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block">Surname</label>
                  <p className="text-lg font-medium">{member?.surname}</p>
                </div>
              </div>
            </div>
          )}

          {member?.memberID && (
            <div className="flex justify-center items-center bg-gray-100 mt-7">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md inline-flex space-x-4 items-center">
                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-semibold text-gray-700">
                    Amount:
                  </label>
                  <input
                    type="number"
                    id="number"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="date" className="mb-2 font-semibold text-gray-700">
                    Payment Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-blue-500 text-white font-semibold px-3 py-1
                hover:bg-blue-600 focus:ring-2
                  focus:ring-blue-400 mt-6">
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <label>Loading</label>
                    </>
                  ) : (
                    <>
                      <label>Save Payment</label>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Table Row */}
      <MemberPurchaseComponent payments={payments as any} purchases={purchases as any} 
      purchaseTotal={totalPurchase} paymentTotal={totalPayment} />
    </div>
  );
};

export default PayForDrinksPage;
