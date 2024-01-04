import React from "react";

interface ItemComponentProps {
  brand: string;
  quantity: number;
  numberOfBottles: number;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ brand, quantity, numberOfBottles }) => {
  return (
    <div className="border rounded p-4 bg-gray-200">
      <h2 className="text-lg font-semibold">{brand}</h2>
      <p className="text-gray-600">Quantity: {quantity}</p>
      <p className="text-gray-600">Total Bottles: {numberOfBottles}</p>
    </div>
  );
};

export default ItemComponent;
