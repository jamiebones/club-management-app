"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaVenusMars,
  FaCalendarAlt,
} from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const MemberForm: React.FC = () => {
  const [formData, setFormData] = useState({
    memberID: '',
    title: '',
    firstname: '',
    surname: '',
    jobTitle: '',
    nextOfKin: '',
    contact: [''],
    email: '',
    membershipType: 'FULL',
    employer: '',
    sex: 'MALE',
    birthDay: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newContact = [...formData.contact];
    newContact[index] = e.target.value;
    setFormData({
      ...formData,
      contact: newContact,
    });
  };

  const handleAddContact = () => {
    setFormData({
      ...formData,
      contact: [...formData.contact, ''],
    });
  };

  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      birthDay: date,
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded shadow-md">
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
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaUser className="mr-2" />
            Firstname
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

        <div className="mb-4">
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
        </div>

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
              type="text"
              value={contact}
              onChange={(e) => handleContactChange(e, index)}
              className="w-full px-3 py-2 border rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAddContact}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
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
            className="w-full px-3 py-2 border rounded"
          >
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>

        {/* BirthDay */}
        <div className="col-span-2 mb-4">
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
            <FaUser className="mr-2" />
            Membership Type
          </label>
          <select
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="FULL">FULL</option>
            <option value="ASSOCIATE">ASSOCIATE</option>
          </select>
        </div>

        {/* Additional Fields Go Here */}
      </form>

      {/* Submit Button */}
      <div className="col-span-2 text-center mt-6">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Member
        </button>
      </div>
    </div>
  );
};

export default MemberForm;