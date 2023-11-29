import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  
  name: {
    type: String,
    maxlength: 100,
  },

  contact: [
    String
  ],
    
  address: {
     type: String,
  },
});

const Supplier = mongoose.model("Suppliers", supplierSchema);
export { Supplier };
