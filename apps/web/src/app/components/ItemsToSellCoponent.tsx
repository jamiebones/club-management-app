"use client";
import React, { useState } from "react";

interface Item {
  name: string;
  quantity: number;
  price: number;
  _id: number;
  total: number;
}

const ItemToSellComponent: React.FC<{
  drinks: Item[];
  addItem(index: number): void;
  removeItem(item: number): void;
  deleteItem(item:number): void
}> = ({ drinks, addItem, removeItem, deleteItem }) => {

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
              Item
            </th>
            <th className="w-1/3 py-2 px-4 font-medium text-gray-500 uppercase tracking-wider text-center">
              Qty
            </th>
            <th className="w-1/3 py-2 px-4 text-center font-medium text-gray-500 uppercase tracking-wider">
              Unit Price
            </th>
            <th className="w-1/3 py-2 px-4 text-center font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="w-30 py-2 px-4 text-center font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {drinks.map((item: Item, index) => (
            <tr key={item.name} className="border-b border-gray-200">
              <td className="py-4 px-4">{item.name}</td>
              <td className="flex items-center justify-between py-4 px-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium py-2 px-4 rounded-l-lg"
                  onClick={() => onItemDecrease(index)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  className="w-24 text-center focus:outline-none border border-gray-300 bg-gray-200 rounded-md py-2 px-4"
                  
                />
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium py-2 px-4 rounded-r-lg"
                  onClick={() => onItemIncreased(index)}>
                  +
                </button>
              </td>
              <td className="py-4 px-4 text-center"> &#x20A6;{+item.price}</td>
              <td className="py-4 px-4 text-center"> &#x20A6;{+item.quantity * +item.price}</td>
              <td className="py-4 px-4 text-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => onItemDelete(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

export default ItemToSellComponent;
