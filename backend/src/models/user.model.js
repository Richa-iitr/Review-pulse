import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  anon_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", UserSchema);
