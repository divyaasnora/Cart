const express = require("express");
const router = express.Router();
const axios = require("axios");

const Product = require("../models/Product");

router.get("/fetch", async (req, res) => {
  try {
   
    const response = await axios.get("https://fakestoreapi.com/products");

   
    await Product.deleteMany();

  
    await Product.insertMany(response.data);

    res.json({
      message: "Products Saved Into MongoDB",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
