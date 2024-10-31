import React from "react";

interface Purchases {
  seller: {
    firstname: string;
    surname: string;
  };
  items: [
    {
      brand: string;
      quantity: number;
    },
  ];
  date: string;
  amount: number;
}

interface Payments {
  date: string;
  amount: number;
  collectedBy: string;
}

interface MemberPurchaseProps {
  purchases: [Purchases];
  payments: [Payments];
  purchaseTotal: number;
  paymentTotal: number;
}

let total = 0;

const MemberPurchaseComponent: React.FC<MemberPurchaseProps> = ({
  purchases,
  payments,
  purchaseTotal,
  paymentTotal,
}) => {
  return (
    <div className="flex flex-col sm:flex-row bg-gray-100">
  {/* Purchases Table */}
  <div className="w-full sm:w-1/2 p-2">
    {purchases?.length <= 0 ? (
      <p className="text-center text-lg">No purchases made yet!</p>
    ) : (
      <div>
        <p className="text-lg text-left">Drinks Bought</p>
        <table className="w-full border border-gray-300 bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600"># SN</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Seller</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Items</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((pur, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-2 text-left">{index + 1}</td>
                <td className="px-4 py-2 text-left">
                  {pur.seller.firstname.toUpperCase()} {pur.seller.surname.toUpperCase()}
                </td>
                <td className="px-4 py-2 text-left">
                  <ul className="list-disc ml-4">
                    {pur.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.brand}: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 text-left">
                  {new Date(pur.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-left">₦ {pur.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="px-4 py-2 font-semibold text-right">Debt:</td>
              <td className="px-4 py-2 font-semibold text-red-800">₦ {purchaseTotal - paymentTotal}</td>
            </tr>
            <tr>
              <td colSpan={4} className="px-4 py-2 font-semibold text-right">Total:</td>
              <td className="px-4 py-2 font-semibold">₦ {purchaseTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )}
  </div>

  {/* Payments Table */}
  <div className="w-full sm:w-1/2 p-2">
    {payments.length <= 0 ? (
      <p className="text-center text-lg">No payment made yet!</p>
    ) : (
      <div>
        <p className="text-lg text-left">Payment Made</p>
        <table className="w-full border border-gray-300 bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600"># SN</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Paid to</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="px-4 py-2 text-left">{index + 1}</td>
                <td className="px-4 py-2 text-left">{pay.collectedBy}</td>
                <td className="px-4 py-2 text-left">
                  {new Date(pay.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-left">₦ {pay.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="px-4 py-2 font-semibold text-right">Total:</td>
              <td className="px-4 py-2 font-semibold">₦ {paymentTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )}
  </div>
</div>
  );
};

export default MemberPurchaseComponent;

