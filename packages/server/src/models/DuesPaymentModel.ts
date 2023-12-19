import mongoose from "mongoose";

const duesPaymentSchema = new mongoose.Schema({
    memberID: {
    type: String,
  },

  amountPaid: {
    type: String,
  },

  paymentFor: [
    {
        month: String,
        year: String
    }
  ],

  paymentType: {
    type: String,
    enum: ["BANK", "CASH", "TRANSFER"]
  },
  
  date: {
    type: Date
  },
});

const DuesPayment = mongoose.model("DuesPayments", duesPaymentSchema);
export { DuesPayment };
