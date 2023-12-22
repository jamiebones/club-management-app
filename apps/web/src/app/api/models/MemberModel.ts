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

  firstname: {
    type: String,
    maxlength: 50,
  },
  surname: {
    type: String,
    maxlength: 150,
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
    
  membershipType: {
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

const Members = mongoose.models.Members || mongoose.model("Members", memberSchema);
export { Members };
