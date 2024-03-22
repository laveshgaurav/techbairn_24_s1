const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    rate: {
      type: Number,
    },
    count: {
      type: Number,
    },
  },
  quantity: {
    type: Number,
  },
});

module.exports = mongoose.model("inventories", inventorySchema);
