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

date: {
    type: Date,
  },

});

const BarStock = mongoose.models.BarStock || mongoose.model("BarStock", barStockSchema);
export { BarStock };
