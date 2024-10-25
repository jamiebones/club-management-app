import mongoose from "mongoose";

const barSaleSchema = new mongoose.Schema({
  memberID: {
    type: String,
  },

  staffID: {
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

  // paymentType: {
  //   type: String,
  //   enum: ["CASH", "POS", "TRANSFER" ]
  // },
    
  // saleType: {
  //    type: String,
  //    enum: ["CASH", "CREDIT"]
  // },

});

const BarSales = mongoose.models.BarSales || mongoose.model("BarSales", barSaleSchema);
export { BarSales };
