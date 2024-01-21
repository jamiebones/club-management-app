"use client";
import React, { useState, useEffect, useRef } from "react";
import { FindMemberFullDetails } from "@/app/graphqlRequest/queries";
import { request } from "graphql-request";
import EditMemberComponent from "@/app/components/EditMemberComponent";
import { Member } from "@/app/api/generated/graphqlStaffClub";
import { useSearchParams } from "next/navigation";
const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

const EditMember = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [member, setMember] = useState<Member | null>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonRef = useRef(null);

  const searchParams = useSearchParams();

  const firstname = searchParams.get("firstname");
  const surname = searchParams.get("surname");

  const handleSearchMember = async () => {
    if (!firstName && !lastName) return;
    let variables = {
      request: {
        firstname: "",
        surname: "",
      },
    };
    if (firstName) {
      variables.request.firstname = firstName;
    }

    if (lastName) {
      variables.request.surname = lastName;
    }
    try {
      setLoading(true);
      const response = await request({
        url: graphqlURL,
        document: FindMemberFullDetails,
        variables: variables,
      });
      const { findMember } = response as any;
      console.log("response ", response);
      if (findMember?.message) {
        setMessage("User not found");
        setMember(null);
      } else {
        setMember(findMember);
        setMessage("");
      }
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firstname && surname) {
      setFirstName(firstname);
      setLastName(surname);
    }
  }, [firstname, surname]);

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-16 p-6 bg-white rounded shadow-md">
      <p className="text-center text-lg">Get Member Details</p>
      <div className="flex justify-center items-center space-x-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <button
          ref={buttonRef}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearchMember}
          //   onClick={handleSearch}
        >
          Search
        </button>

        {loading && <p className="text-lg">Retrieving member details.........</p>}
        {message && <p className="text-lg">Member details not found</p>}
      </div>

      {member && <EditMemberComponent member={member} />}
    </div>
  );
};

export default EditMember;
