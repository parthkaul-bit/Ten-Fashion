const Cart = require("../models/cart");
const Product = require("../models/product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, productTitle, price, images } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        userId: req.user._id,
        products: [{ productId, quantity, productTitle, price, images }],
      });
    } else {
      // If cart exists, check if the product is already in the cart
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex === -1) {
        // If product not in cart, add it
        cart.products.push({ productId, quantity, productTitle, price, images });
      } else {
        // If product exists in cart, update quantity
        cart.products[productIndex].quantity += quantity;
      }
    }

    // Save the updated cart
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

const getCart = async (req, res) => {
  try {
    // Find the cart and populate the product information
    const cart = await Cart.find({ userId: req.user._id });

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving cart", error });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { productId } = req.body; // Extract productId from the request body

    // Find the cart
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if the product exists in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

const updateQuantity = async (req, res) => {
  const {productId, quantity} =  req.body;
  
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).send('Item not found in Cart');
    }

    const product = cart.products.find(item => item.productId.toString() === productId)
    if (!product) {
      return res.status(404).send('Product not found in cart.');
    }

    product.quantity += quantity;

    if(product.quantity < 1) {
      return res.status(400).send('Quantity must be at least 1');
    }

    await cart.save();
    
    res.status(200).send(cart);

  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).send('Internal server error');
  }
};


module.exports = { addToCart, getCart, deleteFromCart, updateQuantity };