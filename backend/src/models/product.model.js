import mongoose from "mongoose";
import { v4 } from "uuid";
const FolderSchema = new mongoose.Schema({
  folder_id: { type: String, unique: true, default: v4 },
  user_id: { type: String, required: true },
  parent_id: { type: String, ref: "Folder" },
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  starred: { type: Boolean, default: false },
});

export const Folder = mongoose.model("Folder", FolderSchema);
