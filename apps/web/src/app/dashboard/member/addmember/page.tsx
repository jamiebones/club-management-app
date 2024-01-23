"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaVenusMars,
  FaCalendarAlt,
  FaTableTennis,
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { CreateNewMemberAccount } from "@/app/graphqlRequest/mutation";
import ErrorDiv from "@/app/components/ErrorDiv";
import { FaSpinner, FaTools } from "react-icons/fa";
import { request } from "graphql-request";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

const MemberForm: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    memberID: "",
    title: "",
    firstname: "",
    surname: "",
    jobTitle: "",
    //nextOfKin: "",
    contact: [""],
    sports: [""],
    email: "",
    membershipType: "FULL",
    employer: "",
    sex: "MALE",
    birthDay: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newContact = [...formData.contact];
    newContact[index] = e.target.value;
    setFormData({
      ...formData,
      contact: newContact,
    });
  };

  const handleSportsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const sports = [...formData.sports];
    sports[index] = e.target.value;
    setFormData({
      ...formData,
      sports: sports,
    });
  };

  const handleAddContact = () => {
    setFormData({
      ...formData,
      contact: [...formData.contact, ""],
    });
  };

  const handleAddSport = () => {
    setFormData({
      ...formData,
      sports: [...formData.sports, ""],
    });
  };

  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      birthDay: date,
    });
  };

  const saveNewMember = async () => {
    const {
      memberID,
      title,
      firstname,
      surname,
      jobTitle,
      //nextOfKin,
      contact,
      email,
      membershipType,
      employer,
      sex,
      birthDay,
      sports,
    } = formData;
    //check the required fields;
    const fielsToConfirm = `
       Member ID : ${memberID} 
       Title : ${title} 
       First name : ${firstname} 
       Surname : ${surname} 
       Job Title : ${jobTitle} 
       Contact : ${contact} 
       Sports : ${sports}
       Email : ${email} 
       Membership Type: ${membershipType} 
       Employer : ${employer} 
       Sex : ${sex}
       BirthDay : ${birthDay}
     `;
    const confirmMe = confirm(fielsToConfirm);
    if (!confirmMe) return;
    if (!firstname || !surname || !membershipType) {
      alert("membership type, firstname and surname are all required fields");
      return;
    }
    const options = { month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(formData.birthDay).toLocaleString("en-US", options as any);
    const variables = { request: { ...formData, birthDay: formattedDate } };
    try {
      setLoading(true);
      const response = await request({
        url: graphqlURL,
        document: CreateNewMemberAccount,
        variables: variables,
      });
      console.log("response => ", response);
      alert("New member details added successfully");
      setFormData({
        memberID: "",
        title: "",
        firstname: "",
        surname: "",
        jobTitle: "",
        //nextOfKin: "",
        contact: [""],
        sports: [""],
        email: "",
        membershipType: "FULL",
        employer: "",
        sex: "MALE",
        birthDay: new Date(),
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-16 p-6 bg-white rounded shadow-md">
      <ErrorDiv errorMessage={error} />
      <h1 className="text-2xl font-bold mb-4">Member Form</h1>
      <form className="grid grid-cols-2 gap-4">
        {/* First Column */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaUser className="mr-2" />
            Member ID
          </label>
          <input
            type="text"
            name="memberID"
            value={formData.memberID}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaUser className="mr-2" />
            Title
          </label>

          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded">
            <option value="" disabled>
              Select title
            </option>
            <option value="MR">MR</option>
            <option value="MISS">MISS</option>
            <option value="MS">MS</option>
            <option value="MRS">MRS</option>
            <option value="DR">DR</option>
            <option value="PROF">PROF</option>
            <option value="ASSO PROF">ASSO PROF</option>
            <option value="PROF (SIS)">PROF (SIS)</option>
            <option value="ENGR">ENGR</option>
            <option value="ARCHITECT">ARCHITECT</option>
            <option value="PHARM">PHARM</option>
            <option value="HON">HON</option>
            <option value="SURV">SURV</option>
            <option value="SIR">SIR</option>
            <option value="BARR">BARR</option>
            <option value="REAL ADMIRAL (RTD)">REAL ADMIRAL (RTD)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaUser className="mr-2" />
            First name
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaUser className="mr-2" />
            Surname
          </label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaUser className="mr-2" />
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaUser className="mr-2" />
            Next of Kin
          </label>
          <input
            type="text"
            name="nextOfKin"
            value={formData.nextOfKin}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div> */}

        {/* Second Column */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaEnvelope className="mr-2" />
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaPhone className="mr-2" />
            Contact
          </label>
          {formData.contact.map((contact, index) => (
            <input
              key={index}
              type="number"
              value={contact}
              onChange={e => handleContactChange(e, index)}
              className="w-full px-3 py-2 border rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAddContact}
            className="bg-blue-500 text-white px-3 py-2 rounded">
            Add Contact
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaBuilding className="mr-2" />
            Employer
          </label>
          <input
            type="text"
            name="employer"
            value={formData.employer}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaVenusMars className="mr-2" />
            Sex
          </label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>

        {/* BirthDay */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaCalendarAlt className="mr-2" />
            BirthDay
          </label>
          <DatePicker
            selected={formData.birthDay}
            onChange={handleDateChange}
            dateFormat="MM-dd"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaTableTennis className="mr-2" />
            Sports
          </label>
          {formData.sports.map((sport, index) => (
            <input
              key={index}
              type="text"
              value={sport}
              onChange={e => handleSportsChange(e, index)}
              className="w-full px-3 py-2 border rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAddSport}
            className="bg-blue-500 text-white px-3 py-2 rounded">
            Add Sports
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaUser className="mr-2" />
            Membership Type
          </label>
          <select
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded">
            <option value="FULL">FULL</option>
            <option value="ASSOCIATE">ASSOCIATE</option>
          </select>
        </div>

        {/* Additional Fields Go Here */}
      </form>

      {/* Submit Button */}
      <div className="col-span-2 text-center mt-6">
        <button
          onClick={saveNewMember}
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-green-600">
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              <label>Loading</label>
            </>
          ) : (
            <>
              <FaTools className="mr-2" />
              <label>Save Member</label>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MemberForm;
