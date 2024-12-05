const Order = require("../models/order");
const Cart = require("../models/cart");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      totalAmount,
      shippingAddress,
      paymentMethod,
      CustomerName,
      Email,
      Phone,
      notes,
    } = req.body;

    // Fetch the authenticated user's cart
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate the total amount
    // const totalAmount = cart.products.reduce(
    //   (sum, item) => sum + item.price * item.quantity,
    //   0
    // );

    // Create an order
    const order = new Order({
      userId: req.user._id,
      products: cart.products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      CustomerName,
      Email,
      Phone,
      notes,
    });

    await order.save();

    // Clear the cart after creating the order
    cart.products = [];
    await cart.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get all orders for the logged-in user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate(
      "products.productId"
    );
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update the status of an order
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Check if the logged-in user is authorized to update this order
//     if (order.userId.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ message: "Unauthorized to update this order" });
//     }

//     order.status = status;
//     await order.save();

//     res
//       .status(200)
//       .json({ message: "Order status updated successfully", order });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    console.log("Order ID:", orderId);
    console.log("Status:", status);
    console.log("User:", req.user);

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // if (order.userId.toString() !== req.user._id.toString()) {
    //   return res
    //     .status(403)
    //     .json({ message: "Unauthorized to update this order" });
    // }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find({}); // Adjust populate as per your schema
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};
module.exports = {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
};
