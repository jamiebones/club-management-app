import React from "react";

interface MemberData {
  memberID: string;
  amount: number;
  payment: number;
  name: string;
  debt: number
}

interface MemberSalesTableProps {
  data: MemberData[];
}

const MemberDebtorComponent: React.FC<MemberSalesTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className=" bg-white shadow-md rounded-lg border border-gray-300 w-full">
        <thead>
          <tr className="">
            <th className="py-3 px-5 text-left font-semibold">Name</th>
            <th className="py-3 px-5 text-left font-semibold">Purchase</th>
            <th className="py-3 px-5 text-left font-semibold">Payment</th>
            <th className="py-3 px-5 text-left font-semibold">Debt</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.memberID}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition-colors`}
            >
              
              <td className="py-3 px-5 border-b border-gray-300">{item.name.toUpperCase()}</td>
              <td className="py-3 px-5 border-b border-gray-300">₦ {item.amount.toFixed(2)}</td>
              <td className="py-3 px-5 border-b border-gray-300">₦ {item.payment.toFixed(2)}</td>
              <td className="py-3 px-5 border-b border-gray-300">₦ {item.debt.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberDebtorComponent;