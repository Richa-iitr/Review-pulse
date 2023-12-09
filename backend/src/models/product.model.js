import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  product_id: { type: String, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  seller: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Folder", ProductSchema);
