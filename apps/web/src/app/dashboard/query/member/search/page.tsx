"use client";
import React, { useState, useEffect } from "react";
import { SearchMemberQuery } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
import ErrorDiv from "@/app/components/ErrorDiv";
import { request } from "graphql-request";
import MemberSearchComponent from "@/app/components/MemberSearchComponent";
import MemberDisplayTable from "@/app/components/MemberDisplayTable";
const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface MembersInfo {
  surname: string;
  firstname: string;
  memberID: string;
  title: string;
}

interface MemberSearchInput {
  firstname?: string;
  surname?: string;
  memberID?: string;
}

const MemberSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);

  const onSearch = (searchInput: MemberSearchInput) => {
    console.log("search input => ", searchInput);
  };

  const onSearchTermChange = (searchInput: MemberSearchInput) => {
    if (
      searchInput &&
      ((searchInput.firstname && searchInput.firstname.length > 2) ||
        (searchInput.surname && searchInput.surname.length > 2) ||
        (searchInput.memberID && searchInput.memberID.length > 2))
    ) {
      setTimeout(() => {
        getMembersBySearching(searchInput);
      }, 500);
    }
  };

  const getMembersBySearching = async (searchInput: any) => {
    try {
      setLoading(true);
      const response: any = await request({
        url: graphqlURL,
        document: SearchMemberQuery,
        variables: { request: searchInput },
      });

      console.log("search members data ", response.searchMember);
      setMembers(response.searchMember);
    } catch (error) {
      console.log("error from query ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <MemberSearchComponent onSearchTermChange={onSearchTermChange} />
      {loading && <LoadingSpinner />}
      {members && members.length > 0 && <MemberDisplayTable members={members} />}
    </div>
  );
};

export default MemberSearch;
