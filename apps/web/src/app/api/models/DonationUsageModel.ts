import mongoose from "mongoose";

const donationUsageModelchema = new mongoose.Schema({

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

const DonationUsage = mongoose.models.DonationUsage || mongoose.model("DonationUsage", donationUsageModelchema);
export { DonationUsage };
