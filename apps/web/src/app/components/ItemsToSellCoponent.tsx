"use client";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

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
  deleteItem(item: number): void;
}> = ({ drinks, addItem, removeItem, deleteItem }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalAmount = 0;
    drinks.map(drink => {
      totalAmount += +drink.price * +drink.quantity;
    });
    setTotal(totalAmount);
  }, [drinks]);

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
              <td className="flex items-center justify-center py-2 px-2">
                <button
                  className="bg-blue-200 hover:bg-green-300 text-gray-600 font-medium py-2 px-4 rounded-l-lg"
                  onClick={() => onItemDecrease(index)}>
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  className="w-20 text-center focus:outline-none border border-gray-300 bg-gray-200 rounded-md py-2 px-4"
                />
                <button
                  className="bg-green-200 hover:bg-green-300 text-gray-600 font-medium py-2 px-4 rounded-r-lg"
                  onClick={() => onItemIncreased(index)}>
                  +
                </button>
              </td>
              <td className="py-4 px-4 text-center"> &#x20A6;{+item.price}</td>
              <td className="py-4 px-4 text-center"> &#x20A6;{+item.quantity * +item.price}</td>
              <td className="py-4 px-4 text-center">
                <FaTrash
                  className="text-center"
                  onClick={() => onItemDelete(index)}>
                
                </FaTrash>
              </td>
            </tr>
          ))}
        </tbody>
        <tr className="bg-red-200">
           <td></td>
           <td></td>
           <td className="py-4 px-4 text-right">Total : </td>
           <td className="py-4 px-4 text-center">&#x20A6;<b>{total}</b></td>
           <td></td>
        </tr>
      </table>
    )
  );
};

export default ItemToSellComponent;
