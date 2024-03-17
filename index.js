const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { default: mongoose } = require("mongoose");
const InventoryModel = require("./models/inventoryModel");

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("tiny"));

// app.post("/create-inventory", async (req, res) => {
//   try {
//     let data = req.body.data;
//     let resp = await InventoryModel.insertMany(data);
//     console.log("Resp", resp);
//     return res.send({
//       message: "Data Inserted",
//       status: true,
//       resp,
//     });
//   } catch (e) {
//     console.log("Errror", e);
//     return res.send({
//       message: e,
//       status: false,
//     });
//   }
// });

app.listen(8000, () => {
  console.clear();
  console.log("Server Running on 8000..");
  mongoose
    .connect(
      "mongodb+srv://webmonk:webmonk@cluster0.gp38f.mongodb.net/ecommerce?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));
});
