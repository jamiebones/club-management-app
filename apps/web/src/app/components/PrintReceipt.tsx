import React, { useRef, forwardRef, useImperativeHandle } from "react";

interface ReceiptPayments {
  date: string;
  amount: number;
  collectedBy: string | null | undefined;
  paymentMethod: string;
  buyer: string;
}

interface ReceiptProps {
  receiptPayment: ReceiptPayments;
}

// Use forwardRef to allow the parent component to access the handlePrint method
const Receipt = forwardRef(({ receiptPayment }: ReceiptProps, ref) => {
  const printRef = useRef<HTMLDivElement>(null);

  // Print handler function
  const handlePrint = () => {
    if (printRef.current) {
      //printRef.current.classList.remove("hidden");
      const originalContent = document.body.innerHTML;
      const printContent = printRef.current.innerHTML;
      document.body.innerHTML = printContent;
      window.print();

      printRef.current.classList.add("hidden");
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  // Expose handlePrint to the parent component
  useImperativeHandle(ref, () => ({
    printReceipt: handlePrint,
  }));

  return (
    <div className="flex flex-col p-4">
      <div
        ref={printRef}
        className="hidden w-full max-w-xs p-4 border-2 border-gray-300 rounded shadow-md bg-white text-gray-700">
        <h2 className="text-center font-bold text-lg mb-2">Receipt</h2>

        <div className="text-sm">
          <p>
            <span className="font-semibold">Date:</span> {receiptPayment.date}
          </p>
          <p>
            <span className="font-semibold">Amount:</span> ₦ {receiptPayment.amount.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Collected By:</span> {receiptPayment.collectedBy}
          </p>
          <p>
            <span className="font-semibold">Payment Method:</span> {receiptPayment.paymentMethod}
          </p>
          <p>
            <span className="font-semibold">Buyer:</span> {receiptPayment.buyer}
          </p>
        </div>
      </div>

      {/* Optional manual print button inside the component */}
      <div className="w-5">
        <button
          onClick={handlePrint}
          className="mt-4 px-4 py-2 bg-gray-600
         text-white rounded-sm
         focus:outline-none focus:ring-2 
        ">
          Print Receipt
        </button>
      </div>
    </div>
  );
});

export default Receipt;
