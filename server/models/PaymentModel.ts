import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  receiverID: {
    type: mongoose.Schema.ObjectId,
  },

  amountPaid: {
    type: String,
  },

  paymentFor: {
    type: String,
  },

  paymentType: {
    type: String,
    enum: ["SALARY", "PALLIATIVE", "PURCHASES", "WORKMANSHIP PAYMENT"]
  },
date: {
    type: Date,
  },

});

const Payment = mongoose.model("Payments", paymentSchema);
export { Payment };
