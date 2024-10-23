import React from "react";

// Define interfaces
interface ItemSupplied {
  brand: string;
  quantity: number;
  numberOfBottles: number;
}

interface BarStock {
  amount: number;
  date: Date;
  itemsSupplied: ItemSupplied[];
  _id: string;
}

interface BarStockTableProps {
  barStockData: BarStock[];
}

const BarStockTable: React.FC<BarStockTableProps> = ({ barStockData }) => {
  return (
    <div className="mx-auto px-4 py-6">
      {barStockData && barStockData?.length === 0 && (
        <div>
          <p className="text-lg text-center">No supplied made yet by the selected supplier!</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className=" bg-white shadow-md rounded-lg w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Items Supplied</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {barStockData.map(barStock => (
              <tr key={barStock._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  <ul className="list-item ml-4">
                    {barStock.itemsSupplied.map((item, index) => (
                      <li key={index}>
                        {item.brand}: {item.quantity} cartons ({item.numberOfBottles} bottles)
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(barStock.date).toLocaleDateString()}
                </td>

                <td className="py-3 px-6 text-left">₦ {barStock.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BarStockTable;
