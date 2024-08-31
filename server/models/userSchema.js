import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true },
    displayName: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("userdb", userSchema);
