const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productDescription: String,
    images: {
      type: String,
    },
    category: String,
    subCategory: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    //brand
    //stock
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
