const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const data = require("./data.json");

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("tiny"));

app.post("/:id/:name", (req, res) => {
  console.log("PARAMS", req.params); //Pre defined
  console.log("QUERY", req.query); // Embedded in request url
  console.log("BODY", req.body);
  return res.send({
    status: true,
    data: {
      params: req.params,
      query: req.query,
      body: req.body,
    },
  });
});

app.get("/get-user", (req, res) => {
  const userData = data;
  return res.send({
    data: userData,
    status: true,
  });
});

app.get("/get-user-by-id/:id", (req, res) => {
  let id = Number(req.params.id);
  let userFound = data.find((d) => d.id === id);
  if (!userFound) {
    return res.send({
      data: "User not found!",
      status: false,
    });
  }
  return res.send({
    data: userFound,
    status: true,
  });
});

app.delete("/delete-user-by-id/:id", (req, res) => {
  let id = Number(req.params.id);
  let userFound = data.find((d) => d.id === id);
  if (!userFound) {
    return res.send({
      data: "User not found!",
      status: false,
    });
  }
  let updatedUser = data.filter((d) => d.id !== id);
  return res.send({
    data: updatedUser,
    status: true,
  });
});

app.post("/create-user", (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.send({
      data: "User id is missing.",
      status: false,
    });
  }
  let userFound = data.find((d) => d.id === id);
  if (userFound) {
    return res.send({
      data: "User id exists",
      status: false,
    });
  }

  let newData = [...data, { ...req.body }];

  return res.send({
    data: newData,
    status: true,
  });
});

app.post("/update-user-by-id/:id");

app.listen(8000, () => {
  console.clear();
  console.log("Server Running on 8000..");
});
