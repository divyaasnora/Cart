const express = require("express");

const router = express.Router();

const Cart = require("../models/Cart");


// GET CART ITEMS
router.get("/", async (req, res) => {

  try {

    const cartItems = await Cart.find();

    res.json(cartItems);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// ADD TO CART
router.post("/add", async (req, res) => {
  try {
    const { title, price, image } = req.body;

    const existingItem = await Cart.findOne({ title });

    if (existingItem) {
      existingItem.quantity += 1;

      await existingItem.save();

      return res.json(existingItem);
    }

    const newItem = new Cart({
      title,
      price,
      image,
      quantity: 1,
    });

    await newItem.save();

    res.json(newItem);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE CART ITEM
router.delete("/:id", async (req, res) => {

  try {

    await Cart.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Item Removed",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;