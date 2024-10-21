"use client";
import React from "react";
import { FaTrash } from "react-icons/fa";

interface Stock {
  brand: string;
  quantity: number;
}

const BringDonatedStocksComponent: React.FC<{
  drinks: Stock[];
  addItem(index: number): void;
  removeItem(item: number): void;
  deleteItem(item: number): void;
  total: number;
}> = ({ drinks, addItem, removeItem, deleteItem, total }) => {
  const onItemIncreased = (index: number) => {
    addItem(index);
  };

  const onItemDecrease = (index: number) => {
    removeItem(index);
  };

  const onItemDelete = (index: number) => {
    deleteItem(index);
  };

  return (
    drinks &&
    drinks.length > 0 && (
      <table className="w-full table-auto border border-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-1/3 py-2 px-4 text-center font-medium text-gray-500 uppercase tracking-wider">
              Brand
            </th>
            <th className="w-1/3 py-2 px-4 font-medium text-gray-500 uppercase tracking-wider text-center">
              Qty
            </th>
            <th className="w-20 py-2 px-4 text-center font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {drinks.map((stock: Stock, index) => (
            <tr key={stock.brand} className="border-b border-gray-200">
              <td className="py-4 px-4 text-center">
                {stock?.brand?.toUpperCase()}: <b>{stock.quantity}</b>{" "}
              </td>
              <td className="flex items-center justify-center py-2 px-2">
                <button
                  className="bg-blue-200 hover:bg-green-300 text-gray-600 font-medium py-2 px-4 rounded-l-lg"
                  onClick={() => onItemDecrease(index)}>
                  -
                </button>
                <input
                  type="number"
                  value={stock.quantity}
                  className="w-20 text-center focus:outline-none border border-gray-300 bg-gray-200 rounded-md py-2 px-4"
                />
                <button
                  className="bg-green-200 hover:bg-green-300 text-gray-600 font-medium py-2 px-4 rounded-r-lg"
                  onClick={() => onItemIncreased(index)}>
                  +
                </button>
              </td>

              <td className="py-4 px-4 text-center">
                <FaTrash className="text-right" onClick={() => onItemDelete(index)}></FaTrash>
              </td>
            </tr>
          ))}
        </tbody>
        <tr className="bg-slate-400">
          <td></td>
          <td className="py-4 px-4 text-center">
            <p className="text-lg">
              <b>{total}</b>
            </p>
          </td>
          <td></td>
        </tr>
      </table>
    )
  );
};

export default BringDonatedStocksComponent;
