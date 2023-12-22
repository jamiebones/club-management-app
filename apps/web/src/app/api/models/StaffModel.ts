import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    employeeID: {
    type: String,
    index: {
      unique: true,
    },
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
     enum: ["FULLTIME", "PARTTIME", "CONTRACT"]
  },

  employmentStatus: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "SUSPENDED"]
 },

  sex: {
    type: String,
    enum: ["MALE", "FEMALE"]
  },
});

const Staff = mongoose.models.Staff || mongoose.model("Staff", staffSchema);
export { Staff };
