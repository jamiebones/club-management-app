import React, { useState } from "react";

interface Payment {
  amountPaid: number;
  paymentFor: string;
  paymentCategory: "SALARY" | "PALLIATIVE" | "PURCHASES" | "WORKMANSHIP";
  date: string;
}

interface PaymentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payment: Payment) => void;
}

const PaymentFormModal: React.FC<PaymentFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [paymentDetails, setPaymentDetails] = useState<Payment>({
    amountPaid: 0,
    paymentFor: "",
    paymentCategory: "PURCHASES", // default category
    date: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      paymentDetails.amountPaid !== 0 &&
      paymentDetails.date !== "" &&
      paymentDetails.paymentFor !== ""
    ) {
      setPaymentDetails({
        amountPaid: 0,
        paymentFor: "",
        paymentCategory: "PURCHASES",
        date: "",
      });
      onSubmit(paymentDetails);
      onClose();
    }
    return;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Submit Payment Details</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Amount Paid</label>
            <input
              type="number"
              name="amountPaid"
              value={paymentDetails.amountPaid}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Payment For</label>
            <input
              type="text"
              name="paymentFor"
              value={paymentDetails.paymentFor}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Payment Category
            </label>
            <select
              name="paymentCategory"
              value={paymentDetails.paymentCategory}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="SALARY">Salary</option>
              <option value="PALLIATIVE">Palliative</option>
              <option value="PURCHASES">Purchases</option>
              <option value="WORKMANSHIP">Workmanship</option>
            </select>
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={paymentDetails.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentFormModal;
