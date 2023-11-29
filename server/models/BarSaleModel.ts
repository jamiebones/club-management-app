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
    type: String
  },

  paymentType: {
    String,
    enum: ["CASH", "BANK", "CREDIT"]
  },
    
  saleType: {
     type: String,
     enum: ["PRESIDENTIAL", "NORMAL"]
  },

});

const BarSales = mongoose.model("BarSales", barSaleSchema);
export { BarSales };
