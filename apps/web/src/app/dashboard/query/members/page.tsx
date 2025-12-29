"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { request } from "graphql-request";
import { GetMembers } from "@/app/graphqlRequest/queries";
import MemberSearchPanel from "@/app/components/MembersSearchPanel";
import LoadingSpinner from "@/app/components/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
const XLSX = require("xlsx");
import { useSession } from "next-auth/react";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

const filterData = (data: any = []) => {
  let arrayToReturn = [["Title", "Name", "Birthday", "Sex", "Job Title", "Email", "Phone Number"]];
  for (let i = 0; i < data.length; i++) {
    const { title, firstname, surname, birthDay, sex, jobTitle, email, contact } = data[i];
    const memberArray = [
      title,
      `${firstname?.toUpperCase()} ${surname.toUpperCase()}`,
      birthDay,
      sex,
      jobTitle || "",
      email || "",
      contact ? contact.join(", ") : "",
    ];
    arrayToReturn.push(memberArray);
  }
  return arrayToReturn;
};

interface MemberSearchInput {
  jobTitle?: string;
  memberType?: string;
  sports?: string;
  sex?: string;
  startBirthDate?: Date | null | undefined;
  endBirthDate?: Date | null | undefined;
  orderField?: string;
}

const GetMembersDetails = () => {
  const { data: session } = useSession();
  const [rowData, setRowData] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();
  const buttonRenderer = (params: any) => {
    return (
      <Link
        href={`/dashboard/member/edit?firstname=${params.data.firstname}&surname=${params.data.surname}`}
        target="_blank">
        Edit
      </Link>
      // <button
      //   onClick={() => params.onClick(params)}
      //   className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-1 m-2 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
      //   Edit
      // </button>
    );
  };

  const handleRowSelect = (rowData: any) => {
    router.push(`/dashboard/member/edit?firstname=${rowData.firstname}&surname=${rowData.surname}`);
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    {
      headerName: "#",
      width: 60,
      valueGetter: (params: any) => {
        return params.node.rowIndex + 1;
      }, // Access row index for number
      //cellRenderer: 'serialNumberRenderer'  // Use custom renderer for formatting
    },
    { field: "memberID" },
    { field: "title" },
    { field: "firstname" },
    { field: "surname" },
    { field: "jobTitle" },
    { field: "contact" },
    { field: "email" },
    { field: "membershipType" },
    { field: "employer" },
    { field: "sex" },
    { field: "birthDay" },
    { field: "sports" },
    {
      headerName: "Actions",
      width: 100,
      cellRenderer: buttonRenderer,
      cellRendererParams: {
        onClick: (params: any) => {}, // Pass row data to handler
      },
    },
  ]);

  const [loading, setLoading] = useState(false);

  const getInitialData = async () => {
    try {
      setLoading(true);
      const input = {
        request: {
          _id: null,
          jobTitle: null,
          memberType: null,
          birthDay: null,
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

  useEffect(() => {
    getInitialData();
  }, []);

  const handleSearch = async (
    input: MemberSearchInput,
    sortOrder: "ASC" | "DESC",
    limit: number,
  ) => {
    try {
      setLoading(true);
      let jobTitleArray: string[] = [];
      if (input.jobTitle) {
        const splitArray = input?.jobTitle?.split(",");
        splitArray.map((val: string) => {
          jobTitleArray.push(val.trim());
        });
      }

      let sportsArray: string[] = [];
      if (input.sports) {
        const splitSports = input.sports.split(",");
        splitSports.map((val: string) => {
          sportsArray.push(val.trim());
        });
      }
      let startDate = null;
      let endDate = null;
      if (input.startBirthDate && input.endBirthDate) {
        const options = { month: "2-digit", day: "2-digit" };

        startDate = new Date(input.startBirthDate).toLocaleString("en-US", options as any);
        console.log("start date", startDate);
        endDate = new Date(input.endBirthDate).toLocaleString("en-US", options as any);
      }

      const dataInput = {
        request: {
          jobTitle: jobTitleArray.length > 0 ? jobTitleArray : null,
          memberType: input.memberType,
          sex: input.sex,
          sports: sportsArray.length > 0 ? sportsArray : null,
          startBirthDate: startDate,
          endBirthDate: endDate,
        },
        orderBy: {
          direction: sortOrder,
          field: input.orderField,
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

  const exportToExcel = () => {
    setDownloading(true);
    const memberData = [...rowData];
    const data = filterData(memberData);
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Add a worksheet to the workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // Generate the Excel file buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    // Trigger the download of the Excel file
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "members.xlsx";
    link.click();
    setDownloading(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-10 p-10">
      <MemberSearchPanel onSearch={handleSearch} />
      <div className="ag-theme-quartz" style={{ height: 1000 }}>
        {/* The AG Grid component */}
        <AgGridReact rowData={rowData} columnDefs={colDefs as any} rowSelection="single" />

        {rowData?.length > 0 && session && session?.user?.role! == "ADMIN" && (
          <button
            disabled={downloading}
            onClick={exportToExcel}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            {downloading ? "Exporting to Excel....." : "Export to Excel "}
          </button>
        )}
      </div>
    </div>
  );
};

export default GetMembersDetails;
