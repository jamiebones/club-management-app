import React from "react";

interface Donation {
  seller: {
    firstname: string;
    surname: string;
  };
  drinks: {
    brand: string;
    quantity: number;
  }[];
  date: string;
}

const DonationTable: React.FC<{ donations: Donation[] }> = ({ donations }) => {
  console.log("donation:: ", donations);
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left p-4 font-semibold">Seller</th>
            <th className="text-left p-4 font-semibold">Drinks</th>
            <th className="text-left p-4 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-4">
                {donation.seller.firstname?.toUpperCase()} {donation.seller.surname?.toUpperCase()}
              </td>
              <td className="p-4">
                <ul>
                  {donation.drinks.map((drink, i) => (
                    <li key={i}>
                      {drink?.brand?.toUpperCase()} - {drink.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-4">{new Date(donation.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {donations?.length === 0 && (
        <p className="text-center text-gray-700">No donations found for the selected date range.</p>
      )}
    </div>
  );
};

export default DonationTable;
