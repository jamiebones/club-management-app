import React from "react";

interface ItemComponentProps {
  brand: string;
  quantity: number;
  numberOfBottles: number;
  index: number;
  onDelete: (index: number) => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({
  brand,
  quantity,
  numberOfBottles,
  index,
  onDelete,
}) => {
  const handleDelete = (index: number) => {
    onDelete(index);
  };

  return (
    <div className="flex justify-between border rounded bg-gray-200 w-full mb-5">
      <div className="flex items-center border rounded p-4 mr-4 w-full">
        <h2 className="text-lg font-semibold">{brand}</h2>
      </div>
      <div className="flex items-center border rounded p-4 mr-4 w-full">
        <p className="text-gray-600">Quantity: {quantity}</p>
      </div>
      <div className="flex items-center border rounded p-4 w-full">
        <p className="text-gray-600">Total Bottles: {numberOfBottles}</p>
        {/* Add remove icon here */}
        <span className="text-red-500 cursor-pointer ml-auto" onClick={() => handleDelete(index)}>
          &#10006;
        </span>
      </div>
    </div>
  );
};

export default ItemComponent;
