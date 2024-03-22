require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { default: mongoose } = require("mongoose");
const InventoryModel = require("./models/inventoryModel");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  return res.send({
    status: true,
    message: "Server is running on 8000",
  });
});
app.use(express.json());
app.use(morgan("tiny"));

app.use("/user", userRoutes);
app.use("/order", orderRoutes);
// app.post("/create-inventory", async (req, res) => {
//   try {
//     let data = req.body.data;
//     data = data.map((i) => ({
//       ...i,
//       quantity: 20,
//     }));
//     console.log(data);
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

app.listen(process.env.PORT, () => {
  // console.clear();
  console.log("Server Running on 8000..");
  mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));
});
