import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", UserSchema);
