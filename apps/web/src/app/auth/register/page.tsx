"use client";
import { useState } from "react";
import { request } from "graphql-request";
import { FindMember, FindStaff } from "@/app/graphqlRequest/queries";
import { CreateUserAccount } from "@/app/graphqlRequest/mutation";
import { FaSearch, FaSpinner, FaTools } from "react-icons/fa";
import ErrorDiv from "@/app/components/ErrorDiv";

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
  const [isSelected, setIsSelected] = useState(false);
  const [bioID, setBioID] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [processing, setProcessing ] = useState(false)
  const [error, setError ] = useState("")
  const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

  const onTextChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target;
    if (name == "firstname") {
      setFirstname(value);
    } else if (name == "surname") {
      setSurname(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "username") {
      setUsername(value);
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
        setSurname("");
      }
    }
  };

  const selectionChange = (e: any) => {
    const { value, name } = e.target;
    if (name == "userType") {
      setUserType(e.target.value);
    } else if (name == "role") {
      setRole(value);
    }
  };

  const createUserAccount = async () => {
     //check if everthing is selected
     if (bioID == ""){
        alert("Click on the Member/Staff name to select it");
        return;
     }
     if ( role == ""){
        alert("Select the account role");
        return;
     }
     if ( username == ""){
        alert("The username is required");
        return;
     }
     if ( password == ""){
        alert("Input your password");
        return;
     }
     try {
        const input = {
            request: {
                username,
                password,
                bioDataId: bioID,
                role
            }
        }
        const response = await request({
            url: graphqlURL,
            document: CreateUserAccount,
            variables: input,
          });
      console.log("response=>", response);
      alert("Account created successfully");
     } catch (error: any) {
        console.log("There was an error creating the account : ", error);
        setError(`There was an error creating the account : ${error?.message as string}`)
     }finally{
        setProcessing(false);
        setPassword("");
        setUserType("")
        setBio({ surname: "", firstname: "", _id: "" });
        setRole("");
        setBioID("");
     }
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      
      <h2 className="text-2xl font-bold mb-6">Create User Account</h2>

      <ErrorDiv errorMessage={error}/>

      {/* Role dropdown box */}
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
          User Type
        </label>
        <select
          id="role"
          className="w-full p-2 border border-gray-300 rounded-md"
          defaultValue=""
          name="userType"
          onChange={selectionChange}>
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
          onChange={onTextChange}
        />

        <input
          type="text"
          id="search"
          className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter surname"
          name="surname"
          onChange={onTextChange}
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
          <p
            className={`border p-2 ${
              isSelected ? "border-green-500 focus:outline-none" : "border-gray-300"
            } cursor-pointer`}
            onClick={() => {
              setIsSelected(!isSelected);
              setBioID(bio._id);
            }}
            tabIndex={0}>
            {bio.firstname} {bio.surname}
          </p>
        </div>
      )}

      {/* Role dropdown box */}
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
          Role
        </label>
        <select
          id="role"
          className="w-full p-2 border border-gray-300 rounded-md"
          defaultValue=""
          name="role"
          onChange={selectionChange}>
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
          type="email"
          name="username"
          onChange={onTextChange}
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
          onChange={onTextChange}
          id="password"
          name="password"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter password"
        />
      </div>

      {/* Create Account button */}
      <button
        onClick={createUserAccount}
        type="button"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
             {processing ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Loading
              </>
            ) : (
              <>
                <FaTools className="mr-2" /> Create Account
              </>
            )}
      </button>
    </div>
  );
};

export default RegisterForm;
