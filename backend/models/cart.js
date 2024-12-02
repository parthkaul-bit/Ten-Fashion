const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
        productTitle: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        images: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
