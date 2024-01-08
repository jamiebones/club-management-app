import React from 'react';

interface MemberInfo {
  surname: string;
  firstname: string;
  memberID: string;
  title: string;
  membershipType: string;
}

const MemberDisplay: React.FC<{ member: MemberInfo }> = ({ member }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Member Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 block">Member ID</label>
            <p className="text-lg font-medium">{member.memberID}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 block">Title</label>
            <p className="text-lg font-medium">{member.title}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 block">Firstname</label>
            <p className="text-lg font-medium">{member.firstname}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 block">Surname</label>
            <p className="text-lg font-medium">{member.surname}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 block">Membership Type</label>
            <p className="text-lg font-medium">{member.membershipType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDisplay;