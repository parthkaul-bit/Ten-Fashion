const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    const productWithImage = {
      ...req.body,
      images: req.file.path,
    };

    const createdProduct = await Product.create(productWithImage);

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Error saving product", error });
  }
};

const getProductinfo = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

module.exports = { createProduct, getProducts, getProductinfo };
