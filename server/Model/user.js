import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  age: { type: Number },
});

const User = mongoose.model("User", UserSchema);
export default User;
