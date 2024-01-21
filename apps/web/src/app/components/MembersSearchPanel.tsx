import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MemberSearchInput {
  jobTitle?: string;
  memberType?: string;
  sex?: "MALE" | "FEMALE";
  sports?: string;
  startBirthDate?: Date | null | undefined;
  endBirthDate?: Date | null | undefined;
  orderField?: string;
}

interface MemberSearchPanelProps {
  onSearch: (input: MemberSearchInput, sortOrder: "ASC" | "DESC", limit: number | 10) => void;
}

const MemberSearchPanel: React.FC<MemberSearchPanelProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState<MemberSearchInput>({});
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [limit, setLimit] = useState<number | 10>();

  const handleInputChange = (field: keyof MemberSearchInput, value: string) => {
    setSearchInput(prevInput => ({ ...prevInput, [field]: value }));
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(isNaN(newLimit) ? 10 : newLimit);
  };

  const handleSportsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput({
      ...searchInput,
      sports: event.target.value,
    });
  };

  const handleSearch = () => {
    onSearch(searchInput, sortOrder, limit!);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortOrder(event.target.value as "ASC" | "DESC");
  };

  const handleStartDate = (date: any) => {
    setSearchInput({
      ...searchInput,
      startBirthDate: date,
    });
  };

  const handleEndDate = (date: any) => {
    setSearchInput({
      ...searchInput,
      endBirthDate: date,
    });
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="text-center">
        <h1 className="text-lg bg-gray-700 p-2 text-white">Members Search Panel</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 border rounded mb-4">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Job Title:</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full"
              onChange={e => handleInputChange("jobTitle", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Membership Type:</label>
            <select
              id="role"
              className="w-full p-2 border border-gray-300 rounded-md"
              defaultValue=""
              name="memberType"
              onChange={e => handleInputChange("memberType", e.target.value)}>
              <option value="" disabled>
                Select Membership Type
              </option>
              <option value="FULL">FULL MEMBER</option>
              <option value="ASSOCIATE">ASSOCIATE MEMBER</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Sex:</label>
            <select
              id="role"
              className="w-full p-2 border border-gray-300 rounded-md"
              defaultValue=""
              name="sex"
              onChange={e => handleInputChange("sex", e.target.value)}>
              <option value="" disabled>
                Select Sex
              </option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Sports:</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full"
              onChange={handleSportsChange}
            />
          </div>
          <div className="mt-8 p-8 border rounded-lg bg-white">
            <h2 className="text-xl font-semibold mb-4">Select Birthday Range</h2>

            <div className="flex gap-4">
              <DatePicker
                selected={searchInput?.startBirthDate}
                onChange={handleStartDate}
                dateFormat="dd/MM"
                placeholderText="Start Date"
                className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
              />

              <DatePicker
                selected={searchInput?.endBirthDate}
                onChange={handleEndDate}
                dateFormat="dd/MM"
                placeholderText="End Date"
                className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div>
          {" "}
          {/* {second column starts} */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Sort Field:</label>
            <select
              id="role"
              className="w-full p-2 border border-gray-300 rounded-md"
              defaultValue=""
              name="memberType"
              onChange={e => handleInputChange("orderField", e.target.value)}>
              <option value="" disabled>
                Select Sort Field
              </option>
              <option value="memberID">Member ID</option>
              <option value="jobTitle">Job Title</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Sort Order:</label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="mt-1 p-2 border rounded w-full">
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Limit:</label>
            <input
              type="number"
              className="mt-1 p-2 border rounded w-full"
              onChange={handleLimitChange}
            />
          </div>
        </div>
      
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSearch}>
            Search
          </button>

      </div>
    </div>
  );
};
export default MemberSearchPanel;
