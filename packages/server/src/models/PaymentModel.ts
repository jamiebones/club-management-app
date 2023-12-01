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

  paymentCategory: {
    type: String,
    enum: ["SALARY", "PALLIATIVE", "PURCHASES", "WORKMANSHIP"]
  },
date: {
    type: Date,
  },

});

const Payment = mongoose.model("Payments", paymentSchema);
export { Payment };
