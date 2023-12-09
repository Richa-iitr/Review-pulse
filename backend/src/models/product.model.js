import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  seller: { type: String, required: true },
  rounds: { type: Number, default: 2 },
  tokens: { type: Number, required: true },
  product_id: { type: Number },
  uri: { type: String },
  reviews: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", ProductSchema);
