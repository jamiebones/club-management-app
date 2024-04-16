import React from "react";
import Link from "next/link";

interface MembersInfo {
  surname: string;
  firstname: string;
  memberID: string;
  title: string;
}

interface MembersTableProps {
  members: MembersInfo[];
}

const MemberDisplayTable: React.FC<MembersTableProps> = ({ members }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Member ID
            </th>

            <th scope="col" className="py-3 px-6">
              Title
            </th>

            <th scope="col" className="py-3 px-6">
              Firstname
            </th>

            <th scope="col" className="py-3 px-6">
              Surname
            </th>
            <th scope="col" className="py-3 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {member.memberID}
              </th>
              <td className="py-4 px-6">{member.title}</td>
              <td className="py-4 px-6">{member.firstname}</td>
              <td className="py-4 px-6">{member.surname}</td>
              <td className="py-4 px-6 space-x-2">
                <Link
                  className="font-semibold text-blue-500 hover:text-blue-700"
                  href={`/dashboard/member/edit?firstname=${member.firstname}&surname=${member.surname}`}
                  target="_blank">
                  View Details
                </Link>
                &nbsp;|
                <Link
                  className="font-semibold text-blue-500 hover:text-blue-700"
                  href={`/dashboard/member/edit?firstname=${member.firstname}&surname=${member.surname}`}
                  target="_blank">
                  Edit Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberDisplayTable;
