import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cartItems: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("cart", cartSchema)
