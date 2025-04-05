import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
