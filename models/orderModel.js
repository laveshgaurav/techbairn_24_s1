const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventories",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered"],
  },
  // address: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "addresses",
  //   required: true,
  // },
});

module.exports = mongoose.model("orders", orderSchema);
