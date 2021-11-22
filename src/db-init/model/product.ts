import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
      trim: true,
    },
    quantity:{
      type: Number
    },
    description: {
      type: String,
      trim: true,
    },
    productPicture: { img: { type: String } },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedAt: Date,
  },
  { timestamps: true }
);

export const Product = mongoose.model("product", productSchema);
