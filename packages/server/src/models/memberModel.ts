import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  memberID: {
    type: String,
    index: {
      unique: true,
    },
  },

  title: {
    type: String,
    maxlength: 50,
  },

  name: {
    type: String,
    maxlength: 100,
  },
  jobTitle: {
    type: String,
    maxlength: 100,
  },

  nextOfKin: {
    type: String
  },

  contact: [
    String
  ],

  email: {
    type: String
  },
    
  memberShipType: {
     type: String,
     enum: ["FULL", "ASSOCIATE"]
  },

  employer: {
    type: String
  },

  sex: {
    type: String,
    enum: ["MALE", "FEMALE"]
  },

  birthDay: {
    type: String //format => day=>month eg 10-05 10 of May
  },
});

const Members = mongoose.model("Members", memberSchema);
export { Members };
