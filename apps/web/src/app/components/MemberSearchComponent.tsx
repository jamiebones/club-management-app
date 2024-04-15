import React, { useState } from "react";

interface MemberSearchInput {
  firstname?: string;
  surname?: string;
  memberID?: string;
}

interface MemberSearchPanelProps {
  onSearch: (input: MemberSearchInput) => void;
}

const MemberSearchComponent: React.FC<MemberSearchPanelProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState<MemberSearchInput>({});

  const handleInputChange = (field: keyof MemberSearchInput, value: string) => {
    setSearchInput(prevInput => ({ ...prevInput, [field]: value }));
  };

  const handleSearch = () => {
    onSearch(searchInput);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h1 className="text-lg bg-gray-700 p-2 text-white">Members Search</h1>
      </div>

      <div
        className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 
                      sm:space-x-2 bg-white p-4 shadow-md">
        <div className="mx-auto">
          <input
            type="text"
            placeholder="First Name"
            onChange={e => handleInputChange("firstname", e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none 
          focus:ring-2 focus:ring-blue-500 w-full sm:w-auto mr-2"
          />
          <input
            type="text"
            placeholder="Surname"
            onChange={e => handleInputChange("surname", e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none 
            focus:ring-2 focus:ring-blue-500 w-full sm:w-auto mr-2"
          />
          <input
            type="text"
            placeholder="Member ID"
            onChange={e => handleInputChange("memberID", e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none 
            focus:ring-2 focus:ring-blue-500 w-full sm:w-auto mr-2"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded
         hover:bg-blue-600 focus:outline-none focus:ring-2
          focus:ring-blue-500 focus:ring-opacity-50 w-full sm:w-auto"
            onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div></div>
    </div>
  );
};
export default MemberSearchComponent;
