import mongoose from "mongoose";

const donatedStockSchema = new mongoose.Schema({

  brand: {
    type: String,
  },

  quantity: {
    type: Number,
  },

});

const DonatedStock = mongoose.models.DonatedStock || mongoose.model("DonatedStock", donatedStockSchema);
export { DonatedStock };
