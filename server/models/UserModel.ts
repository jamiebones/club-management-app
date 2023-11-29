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

  userType: {
    type: String
  },
});

const User = mongoose.model("Users", userSchema);
export { User };
