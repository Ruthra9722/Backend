import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import User from "./model/user.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost/banking')

mongoose
  .connect("mongodb://localhost/example")

  .then(() => console.log("db connected"))
  .catch((e) => console.log("error"));

app.get("/", (req, res) => {
  res.send("server connected");
});
app.post("/user/insert", async (req, res) => {
  try {
    const data = await User.insertMany({
      name: req.body.name,
      id: req.body.id,
      age: req.body.age,
    });
    if (data) return res.send(data);
  } catch (error) {
    return res.send(error.message);
  }
});
app.get("/users/name/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const data = await User.findOne({ name: name });
    console.log(data);
    if (data) return res.send(data);
    return res.send("No data found");
  } catch (error) {
    return res.send(error.message);
  }
});

app.get("/users/sort/:sortOrder", async (req, res) => {
  // console.log(age);
  const sortOrder = req.params.sortOrder;
  const page = 1;
  const perPage = 1;
  //   console.log(age);
  let sort;
  if (sortOrder === "asc") {
    sort = { age: 1 };
  } else {
    sort = { age: -1 };
  }

  const data = await User.find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort(sort);

  if (data) return res.send(data);
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
