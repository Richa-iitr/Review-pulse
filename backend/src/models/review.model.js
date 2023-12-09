import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  anon_id: { type: String, required: true },
  review: { type: String },
  rating: { type: Number },
  stake: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Review = mongoose.model("Review", ReviewSchema);
