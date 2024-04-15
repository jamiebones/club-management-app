"use client";
import React, { useState, useEffect } from "react";
import { GetBarSaleData } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
import ErrorDiv from "@/app/components/ErrorDiv";
import { request } from "graphql-request";
import MemberSearchComponent from "@/app/components/MemberSearchComponent";


const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface Beer {
  brand?: string;
  quantity: number;
}


const MemberSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  interface MemberSearchInput {
    firstname?: string;
    surname?: string;
    memberID?: string;
  }
  


const onSearch = (searchInput: MemberSearchInput) => {
   console.log("search input => ", searchInput)
}


 

  return (
    <div className="c">
        <MemberSearchComponent onSearch={onSearch} />
    </div>
      
  );
};

export default MemberSearch;

