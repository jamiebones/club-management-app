import mongoose from "mongoose";

const barSaleSchema = new mongoose.Schema({
  memberID: {
    type: String,
  },

  staffID: {
    type: String,
  },

  staffUsername: {
    type: String,
  },

  items: [{
    brand : String,
    quantity: Number
}],


date: {
    type: Date,
  },


  amount: {
    type: Number
  },

  paymentType: {
    String,
    enum: ["CASH", "POS", "TRANSFER", "CREDIT"]
  },
    
  saleType: {
     type: String,
     enum: ["CASH", "CREDIT"]
  },

});

const BarSales = mongoose.models.BarSales || mongoose.model("BarSales", barSaleSchema);
export { BarSales };
