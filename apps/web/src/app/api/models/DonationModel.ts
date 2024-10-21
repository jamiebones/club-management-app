import mongoose from "mongoose";

const donationModelchema = new mongoose.Schema({
  
  staffID: {
    type: String,
  },

  drinks: [{
    brand : String,
    quantity: Number,
}],
    date: {
        type: Date,
    },

});

const Donation = mongoose.models.Donation || mongoose.model("Donation", donationModelchema);
export { Donation };
