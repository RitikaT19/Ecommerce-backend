import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    parentId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("category", categorySchema);