"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { request } from "graphql-request";
import { GetMembers } from "@/app/graphqlRequest/queries";
import { FindMembersCursorOutput } from "@/app/api/generated/graphqlStaffClub";
import MemberSearchPanel from "@/app/components/MembersSearchPanel";
import LoadingSpinner from "@/app/components/Loading";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface MemberSearchInput {
  jobTitle?: string;
  memberType?: string;
  orderField?: string;
}

const GetMembersDetails = () => {
  const [rowData, setRowData] = useState([]);
  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "memberID" },
    { field: "title" },
    { field: "firstname" },
    { field: "surname" },
    { field: "jobTitle" },
    { field: "nextOfKin" },
    { field: "contact" },
    { field: "email" },
    { field: "membershipType" },
    { field: "employer" },
    { field: "sex" },
    { field: "birthDay" },
  ]);

  const [loading, setLoading] = useState(false);

  const getInitialData = async () => {
    try {
      setLoading(true);
      const input = {
        request: {
          _id: null,
          memberID: null,
          jobTitle: null,
          memberType: null,
        },
        orderBy: {
          direction: null,
          field: null,
        },
        after: "",
        before: "",
        limit: 20,
      };
      const response: any = await request({
        url: graphqlURL,
        document: GetMembers,
        variables: input,
      });

      setRowData(response?.findMembers?.members);
      console.log("data from query => ", response?.findMembers?.members);
    } catch (error) {
      console.log("Error => ", error);
    } finally {
      setLoading(false);
    }
  };

//   useEffect(() => {
//     getInitialData();
//   }, []);

  const handleSearch = async (
    input: MemberSearchInput,
    sortOrder: "ASC" | "DESC",
    limit: number,
  ) => {
    try {
      setLoading(true);
      let jobTitleArray:string[] = []
    if (input.jobTitle){
        const splitArray = input?.jobTitle?.split(",");
        splitArray.map((val:string)=> {
           jobTitleArray.push(val.trim());
        })
       
      }
      console.log("jobTitle Array ", jobTitleArray)

      const dataInput = {
        request: {
          jobTitle: jobTitleArray.length > 0 ? jobTitleArray : null,
          memberType: input.memberType,
        },
        orderBy: {
          direction: input.orderField,
          field: sortOrder,
        },
        after: "",
        before: "",
        limit: limit,
      };
      const response: any = await request({
        url: graphqlURL,
        document: GetMembers,
        variables: dataInput,
      });

      setRowData(response?.findMembers?.members);
    } catch (error) {
      console.log("error =>", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-10 p-10">
      <MemberSearchPanel onSearch={handleSearch} />
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        {/* The AG Grid component */}
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
};

export default GetMembersDetails;
