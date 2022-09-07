const express = require("express");
const router = express.Router();
const userSchema = require("../model");

// fetch data

router.get("/", async (req, resp, next) => {
  let data;
  data = await userSchema.find();
  return resp.status(200).json({ data });
});

router.get("/find/:id", async (req, resp, next) => {
  let data;
  let id = req.params.id;
  data = await userSchema.findOne({ _id: id });
  return resp.status(200).json({ data });
});

// add data

router.post("/add", async (req, resp, next) => {
  let product = new userSchema(req.body);
  let result = await product.save();
  console.log(result);
  resp.send(result);
});

// delete data

router.delete("/delete/:id", async (req, resp) => {
  const result = await userSchema.deleteOne({ _id: req.params.id });
  console.log(result);
  resp.send(result);
});

// update data

router.put("/update/:id", async (req, resp) => {
  const { name, subject, userChecked } = req.body;
  const dataId = req.params.id;
  let data;
  try {
    data = await userSchema.findByIdAndUpdate(dataId, {
      name,
      subject,
      userChecked,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!data) {
    return resp.status(500).json({ message: "Unable to update the blog" });
  }
  return resp.status(200).json({ data });
});

module.exports = router;
