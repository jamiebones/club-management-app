import React from 'react';

interface Payment {
  amountPaid: number;
  date: string;
  paymentCategory: string;
  paymentFor: string;
  receiver: {
    name: string;
  };
  _id: string;
}

interface PaymentTableProps {
  payments: Payment[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
  if (payments.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No payments made yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Amount Paid</th>
            <th className="py-2 px-4 border-b">Payment For</th>
            <th className="py-2 px-4 border-b">Date</th>

          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="text-center">
              <td className="py-2 px-4 border-b">₦ {payment.amountPaid}</td>
              <td className="py-2 px-4 border-b">{payment.paymentFor}</td>
              <td className="py-2 px-4 border-b">
                {new Date(payment.date).toLocaleDateString()}
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;