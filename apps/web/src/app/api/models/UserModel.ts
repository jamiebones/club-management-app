import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: {
        unique: true,
      },
  },

  password: {
    type: String,
  },

  bioDataId : {
    type: mongoose.Schema.ObjectId
  },

  role: {
    type: String,
    enum: ["SALES", "PRESIDENT", "BAR-SECRETARY", "TREASURER", "SECRETARY", "ADMIN"]
  },
});

const User =  mongoose.models.Users || mongoose.model("Users", userSchema);
export { User };
