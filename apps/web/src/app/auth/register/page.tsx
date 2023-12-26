"use client";
import { useState } from "react";
import { request } from "graphql-request";
import { FindMember, FindStaff } from "@/app/graphqlRequest/queries";
import { FaSearch, FaSpinner } from "react-icons/fa";

interface FetchOptions {
  query: string;
  variables: any;
  next: {
    revalidate: number;
  };
}

interface Bio {
  surname: string;
  firstname: string;
  _id: string;
}

interface NotFound {
  message: string;
}

const RegisterForm = () => {
  const [userType, setUserType] = useState("");
  const [surname, setSurname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [bio, setBio] = useState<Bio>({ surname: "", firstname: "", _id: "" });
  const [message, setMessage] = useState("");
  const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

  const onSearchTermChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target;
    if (name == "firstname") {
      setFirstname(value);
    } else if (name == "surname") {
      setSurname(value);
    }
  };

  const getStaffData = async () => {
    //call the App
    if (userType != "") {
      let document;
      let variables = {};
      if (firstname && surname) {
        variables = { request: { firstname: firstname, surname: surname } };
      } else if (firstname && surname == "") {
        variables = { request: { firstname: firstname } };
      } else if (surname && firstname == "") {
        variables = { request: { surname: surname } };
      }

      if (userType == "STAFF") {
        document = FindStaff;
      } else if (userType == "MEMBER") {
        document = FindMember;
      }
      try {
        setLoading(true);
        const response = await request({
          url: graphqlURL,
          document: document!,
          variables: variables,
        });
        setLoading(false);
        console.log("data from the method : ", response);
        if (userType == "STAFF") {
          const { findStaff } = response as any;
          if (findStaff?.message) {
            setMessage(findStaff.messsage);
          } else {
            setBio({
              firstname: findStaff.firstname,
              surname: findStaff.surname,
              _id: findStaff._id,
            });
          }
        } else {
          const { findMember } = response as any;
          if (findMember?.message) {
            setMessage(findMember.messsage);
          } else {
            setBio({
              firstname: findMember.firstname,
              surname: findMember.surname,
              _id: findMember._id,
            });
          }
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
        setFirstname("");
        setSurname("")
      }
    }
  };

  const changeData = (e: any) => {
    setUserType(e.target.value);
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create User Account</h2>

      {/* Role dropdown box */}
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
          User Type
        </label>
        <select
          id="role"
          className="w-full p-2 border border-gray-300 rounded-md"
          defaultValue=""
          onChange={changeData}>
          <option value="" disabled>
            Select User Type
          </option>
          <option value="STAFF">Staff</option>
          <option value="MEMBER">Member</option>
        </select>
      </div>

      {/* Search textbox */}
      <div className="mb-4 flex-column">
        <label htmlFor="search" className="block text-gray-700 text-sm font-bold mr-2">
          Search using firstname and surname
        </label>
        <input
          type="text"
          id="search"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="enter firstname"
          name="firstname"
          onChange={onSearchTermChange}
        />

        <input
          type="text"
          id="search"
          className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter surname"
          name="surname"
          onChange={onSearchTermChange}
        />
        <div className="text-center">
          <button
            disabled={loading}
            type="button"
            onClick={getStaffData}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Loading
              </>
            ) : (
              <>
                <FaSearch className="mr-2" /> Search
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mb-4">{message && <p>{message}</p>}</div>

      {bio && (
        <div className="mb-4">
          <p>
            {bio.firstname} {bio.surname}
          </p>
        </div>
      )}

      {/* Role dropdown box */}
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
          Role
        </label>
        <select id="role" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="">
          <option value="" disabled>
            Select Role
          </option>
          <option value="SALES">Sales</option>
          <option value="PRESIDENT">President</option>
          <option value="BAR-SECRETARY">Bar Secretary</option>
          <option value="TREASURER">Treasurer</option>
          <option value="SECRETARY">Secretary</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Username textbox */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter username"
        />
      </div>

      {/* Password textbox */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter password"
        />
      </div>

      {/* Create Account button */}
      <button
        type="button"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
        Create Account
      </button>
    </div>
  );
};

export default RegisterForm;
