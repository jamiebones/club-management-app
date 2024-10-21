import React from "react";

interface DonatedStock {
  brand: string;
  quantity: number;
}

interface DonatedStockListProps {
  stocks: DonatedStock[];
}

const DonatedStockList: React.FC<DonatedStockListProps> = ({ stocks }) => {
  return (
<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Donated Stocks</h1>
      <div className="flex flex-col space-y-4">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-center w-full">
              <span className="text-lg font-semibold">{stock.brand}</span>
              <span className="ml-auto text-gray-600"> {stock.quantity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 export default DonatedStockList;