const express = require("express");
const upload = require("../config/multer.js");
const {
  createProduct,
  getProducts,
  getProductinfo,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");
const {
  addToCart,
  getCart,
  deleteFromCart,
  updateQuantity,
} = require("../controllers/cartController.js");

const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Define routes
router.post("/api/product", upload.single("images"), createProduct); // POST /api/products
router.get("/api/product/:id", getProductinfo); // POST /api/products
router.get("/api/products", getProducts); // GET /api/products
router.put("/api/product/:id", upload.none(), updateProduct);
router.delete("/api/product/:id", deleteProduct);

router.post("/cartItem", authMiddleware, addToCart); // POST route for adding to cart
router.get("/cartItems", authMiddleware, getCart); // GET route for retrieving the cart
router.delete("/cartItems", authMiddleware, deleteFromCart); // DELETE route for removing the cart
router.patch("/cartItem", authMiddleware, updateQuantity); // PATCH route for updating quantity in cart

module.exports = router;
