const express = require("express");
const orderModel = require("../models/orderModel");
const inventoryModel = require("../models/inventoryModel");
const router = express.Router();

router.post("/create-new-order", async (req, res) => {
  try {
    const newOrder = await new orderModel(req.body);
    await newOrder.save();

    req.body.products.forEach(async (product) => {
      console.log("p", product);
      let existingProduct = await inventoryModel.findById(product.itemId);
      console.log("Existing", existingProduct);
      await inventoryModel.findByIdAndUpdate(product.itemId, {
        quantity: existingProduct.quantity - product.quantity,
      });
    });

    return res.send({
      status: true,
      message: "Order Created",
    });
  } catch (e) {
    return res.send({
      status: false,
      message: e.message,
    });
  }
});

router.get("/get-order-by-id/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let order = await orderModel.findById(id).populate("products.itemId");

    return res.send({
      status: true,
      message: "Order details fetched.",
      data: order,
    });
  } catch (e) {
    return res.send({
      status: false,
      message: e.message,
    });
  }
});

module.exports = router;
