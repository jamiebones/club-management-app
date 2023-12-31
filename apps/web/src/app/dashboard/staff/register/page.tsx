"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { request } from "graphql-request";
import { FaSpinner, FaSave, FaTrash } from "react-icons/fa";
import ErrorDiv from "@/app/components/ErrorDiv";
import { CreateNewStaff } from "@/app/graphqlRequest/mutation";
const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

const StaffForm: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    employeeID: "",
    firstname: "",
    surname: "",
    jobTitle: "",
    dateOfEmployment: new Date(),
    nextOfKin: {
      name: "",
      contact: [""],
    },
    contact: [""],
    employmentType: "FULLTIME",
    employmentStatus: "ACTIVE",
    sex: "MALE",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if ( e.target.name == "nextOfKinName") {
        setFormData({
            ...formData,
            nextOfKin : {name: e.target.value, contact: formData.nextOfKin.contact}
          });
    } else {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
   
  };

  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      dateOfEmployment: date,
    });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    if (name == "nextOfKin") {
      const newContact = [...formData.nextOfKin.contact];
      newContact[index] = value;
      setFormData({
        ...formData,
        nextOfKin: { contact: newContact, name: formData.nextOfKin.name },
      });
    } else if (name == "contact") {
      const newContact = [...formData.contact];
      newContact[index] = value;
      setFormData({
        ...formData,
        contact: newContact,
      });
    }
  };

  const handleAddContact = () => {
    setFormData({
      ...formData,
      nextOfKin: { contact: [...formData.nextOfKin.contact, ""], name: formData.nextOfKin.name },
    });
  };

  const handleAddContactFoStaff = () => {
    setFormData({
      ...formData,
      contact: [...formData.contact, ""],
    });
  };

  const removeContact = (e: any, index: number) => {
    const oldcontact = formData.nextOfKin.contact;
    oldcontact.splice(index, 1);
    setFormData({
      ...formData,
      nextOfKin: { contact: [...oldcontact], name: formData.nextOfKin.name },
    });
  };

  const removeContactOfStaff = (e: any, index: number) => {
    const oldcontact = formData.contact;
    oldcontact.splice(index, 1);
    setFormData({
      ...formData,
      contact: [...oldcontact],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      employeeID,
      firstname,
      surname,
      jobTitle,
      dateOfEmployment,
      contact,
      employmentType,
      employmentStatus,
      sex,
      nextOfKin,
    } = formData;
    //check the required fields;
    const fielsToConfirm = `
       Employee ID : ${employeeID} 
       First name : ${firstname} 
       Surname : ${surname} 
       Contact : ${contact} 
       Employment Type : ${employmentType} 
       Employment Status : ${employmentStatus} 
       Sex : ${sex}
       Job Title: ${jobTitle}
       Date of Employment: ${dateOfEmployment}
       Next of Kin: ${nextOfKin.name}
       Next of Kin Contact: ${nextOfKin.contact}
     `;
    const confirmMe = confirm(fielsToConfirm);
    if (!confirmMe) return;
    if (!employeeID || !firstname || !surname) {
      alert("The employeeID firstname and surname are all required fields");
      return;
    }
    const variables = { request: { ...formData } };
    try {
      setLoading(true);
      const response = await request({
        url: graphqlURL,
        document: CreateNewStaff,
        variables: variables,
      });
      const { addStaff } = response as any;
      if (addStaff.employeeID) {
        alert("New staff account created succesfully");
      }
      setFormData({
        employeeID: "",
        firstname: "",
        surname: "",
        jobTitle: "",
        dateOfEmployment: new Date(),
        nextOfKin: {
          name: "",
          contact: [""],
        },
        contact: [""],
        employmentType: "FULLTIME",
        employmentStatus: "ACTIVE",
        sex: "MALE",
      });
    } catch (error: any) {
      setError(`Error creating staff data : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white rounded shadow-md">
      <ErrorDiv errorMessage={error} />
      <h1 className="text-2xl font-bold mb-4">Staff Information Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Employee ID</label>
          <input
            type="text"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Firstname</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date of Employment</label>
          <DatePicker
            selected={formData.dateOfEmployment}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Next of Kin Name</label>
          <input
            type="text"
            name="nextOfKinName"
            value={formData.nextOfKin.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <div className="bg-gray p-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
              Next of Kin Contact
            </label>
            {formData.nextOfKin.contact.map((contact, index) => (
              <div className="flex justify-evenly items-center">
                <input
                  key={index}
                  type="text"
                  name="nextOfKin"
                  value={contact}
                  onChange={e => handleContactChange(e, index)}
                  className="w-full px-3 py-2 border rounded mb-2"
                />
                <div className="flex justify-center" onClick={e => removeContact(e, index)}>
                  <FaTrash className="ml-2" style={{ color: "red" }} />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddContact}
            className="bg-blue-500 text-white px-3 py-2 rounded">
            Add Next of Kin Contact
          </button>
        </div>
        <hr className="border-t-2 border-gray-500 w-full my-6" />

        {formData.contact.map((contact, index) => (
          <div className="flex justify-evenly items-center">
            <input
              key={index}
              type="text"
              name="contact"
              value={contact}
              onChange={e => handleContactChange(e, index)}
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <div className="flex justify-center" onClick={e => removeContactOfStaff(e, index)}>
              <FaTrash className="ml-2" style={{ color: "red" }} />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddContactFoStaff}
          className="bg-blue-500 text-white px-3 py-2 rounded mb-4">
          Add Contact
        </button>

        <hr className="border-t-2 border-gray-500 w-full my-6" />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Employment Type</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded">
            <option value="FULLTIME">Full-time</option>
            <option value="PARTTIME">Part-time</option>
            <option value="CONTRACT">Contract</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Employment Status</label>
          <select
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded">
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Sex</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>

        <div className="col-span-2 text-center mt-6">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            {loading ? (
              <div className="flex justify-between items-center">
                <FaSpinner className="animate-spin" />
                <label>Saving.......</label>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <FaSave className="mr-2" />
                <label>Save Staff Information</label>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffForm;
