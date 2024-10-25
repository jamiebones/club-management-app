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
    <div className="flex justify-center items-start space-x-8 p-8 bg-gray-100">
      <div className="w-1/2">
        {purchases?.length <= 0 && <p className="text-center text-lg">No purchases made yet!</p>}
        {purchases?.length > 0 && (
          <div>
            <p className="text-lg text-left">Drinks Bought</p>
            <table className="min-w-full border border-gray-300 bg-white shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600"># SN</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Items</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((pur, index) => (
                  <>
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={index + 222222222}>
                      <td className="py-3 px-6 text-left">
                        <p>{index + 1}</p>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <p>
                          {pur.seller.firstname.toUpperCase()} {pur.seller.surname.toUpperCase()}{" "}
                        </p>
                      </td>

                      <td className="py-3 px-6 text-left">
                        <ul className="list-item ml-4">
                          {pur.items.map((item, index) => (
                            <li key={index}>
                              {item.brand}: {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="py-3 px-6 text-left">
                        {new Date(pur.date).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-6 text-left">
                        <p>₦ {pur.amount}</p>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="px-4 py-2 font-semibold" colSpan={4}>
                    <p className="text-lg text-red-800">Debt: ₦ {purchaseTotal - paymentTotal}</p>
                  </td>
                  <td className="px-4 py-2 font-semibold">&nbsp; ₦ {purchaseTotal}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      {/* Table 1 */}

      {/* Table 2 */}

      <div className="w-1/2">
        {payments.length <= 0 && <p className="text-lg text-center">No payment made yet</p>}
        {payments?.length > 0 && (
          <div>
            <p className="text-lg text-center">Payment Made</p>
            <table className="w-full border border-gray-300 bg-white shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">#SN</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Paid to
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((pay, index) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100" key={index + 5555555}>
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{pay.collectedBy}</td>
                    <td className="py-3 px-6 text-left">
                      {new Date(pay.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-left">₦ {pay.amount}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td className="px-4 py-2 font-semibold" colSpan={3}></td>
                  <td className="px-4 py-2 font-semibold">&nbsp; ₦ {paymentTotal}</td>
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

// getMemberPurchase(request: $request){
//     purchase{
//       seller{
//         firstname
//         surname
//       }
//       items{
//           brand
//           quantity
//        }
//       date
//       amount
//     }
//     payments{
//       amount
//       date
//       collectedBy
//     }
//     memberDetails{
//       memberID
//       title
//       firstname
//       surname
//     }
// }
