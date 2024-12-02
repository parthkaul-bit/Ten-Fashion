const express = require("express");
const Wishlist = require("../models/wishlist");
const router = express.Router();

router.post("/wishlist", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      if (!wishlist.productIds.includes(productId)) {
        wishlist.productIds.push(productId);
        await wishlist.save();
      }
    } else {
      await Wishlist.create({ userId, productIds: [productId] });
    }
    res.status(200).json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Error adding to wishlist" });
  }
});

router.delete("/wishlist", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      wishlist.productIds = wishlist.productIds.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
    }
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Error removing from wishlist" });
  }
});

router.get("/wishlist/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      userId: req.params.userId,
    }).populate("productIds");
    res.status(200).json(wishlist ? wishlist.productIds : []);
  } catch (error) {
    res.status(500).json({ error: "Error fetching wishlist" });
  }
});

module.exports = router;
