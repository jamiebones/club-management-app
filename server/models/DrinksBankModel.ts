import mongoose from "mongoose";

const drinksBankSchema = new mongoose.Schema({
  memberID: {
    type: String,
  },

  staffID: {
    type: String,
  },

  items: {
    type: [{"brand": String, "quantity": Number, "id": Number}]
  },
  
  drinksLeft: {
    type: [{brand: String, quantity: Number}]
  },

  collectedDates: {
    type: [{ staffId: String, date: Date}]
  },
  
  dateBanked: {
    type: Date
  }

});

const DrinksBank = mongoose.model("DrinksBank", drinksBankSchema);
export { DrinksBank };
