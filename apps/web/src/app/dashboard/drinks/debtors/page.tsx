"use client";
import React, { useEffect, useState } from "react";
import { GetBarDebtors } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
import { request } from "graphql-request";
import MemberDebtorComponent from "@/app/components/MemberDebtorComponent";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

const DebtorsPage = () => {
  const [loading, setLoading] = useState(false);
  const [debtors, setDebtors] = useState([]);

  const getDebtorsFromDB = async () => {
    try {
      setLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: GetBarDebtors,
        variables: { request: null },
      });
      console.log("response ", response.getBarDebtors);
      if (response.getBarDebtors) {
        const filterDebtors = response.getBarDebtors.sort((a: any, b: any) => b.debt - a.debt);
        setDebtors(filterDebtors);
      }
    } catch (error: any) {
      setDebtors([]);
      console.log("error getting debtors ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDebtorsFromDB();
  }, []);

  return (
    <div className="flex">
      {loading ? (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full">
          <p className="text-lg text-center">Debtors List</p>
          <MemberDebtorComponent data={debtors} />
        </div>
      )}
    </div>
  );
};

export default DebtorsPage;
