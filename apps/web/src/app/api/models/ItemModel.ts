import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name : {
    type: String,
  },

  sellingPrice: {
    type: Number,
  },

  totalStock: {
    type: Number,
  },

  numberInCrate: {
    type: Number,
  }

});

const Items = mongoose.models.Items || mongoose.model("Items", itemSchema);
export { Items };
