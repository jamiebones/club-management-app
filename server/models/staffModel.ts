import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    employeeID: {
    type: String,
    index: {
      unique: true,
    },
  },

  name: {
    type: String,
    maxlength: 100,
  },

  jobTitle: {
    type: String,
    maxlength: 100,
  },

  dateOfEmployment: {
    type: Date
  },

  nextOfKin: {
    name: String,
    contact: [ String ]
  },

  contact: [
    String
  ],
    
  employmentType: {
     type: String,
     enum: ["FULL TIME", "PART TIME", "CONTRACT"]
  },

  employmentStatus: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "SUSPENDED"]
 },

  employer: {
    type: String
  },

  sex: {
    type: String,
    enum: ["MALE", "FEMALE"]
  },
});

const Staff = mongoose.model("Staff", staffSchema);
export { Staff };
