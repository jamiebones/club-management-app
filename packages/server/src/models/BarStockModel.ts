import mongoose from "mongoose";

const barStockSchema = new mongoose.Schema({
  supplierID: {
    type: String,
  },

  amount: {
    type: String,
  },

  saleType: {
    type: String,
    enum: ["CASH", "CREDIT"]
  },

  itemsSupplied: [{
    brand : String,
    quantity: Number,
    numberOfBottles: Number
}],

amountPaidToSupplier: {
    type: String
},

amountOwnedSupplier: {
    type: String
},

fullPaymentMade: {
    type: Boolean
},


date: {
    type: Date,
  },

});

const BarStock = mongoose.model("BarSales", barStockSchema);
export { BarStock };
