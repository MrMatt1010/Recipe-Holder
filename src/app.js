const mongoose = require("mongoose");
const express = require("express");
const app = express();
const recipieModel = require("./models/RecipieModel");
const formatRecipie = require("./formatRecipie");

app.use(express.json());

app.post("/recipies", async (req, res, next) => {
  try {
    const { body } = req;
    const recipie = new recipieModel(body);
    await recipie.save();
    return res.status(201).send(formatRecipie(recipie));
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    }
    next(error);
  }
});

app.get("/recipies", async (req, res) => {
  const recipies = await recipieModel.find({});
  return res.status(200).send(recipies.map(formatRecipie));
});

app.get("/recipies/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "bad id" });
  }
  const recipie = await recipieModel.findById(id);

  if (recipie === null) {
    return res.status(404).send("not found");
  }
  return res.status(200).send(formatRecipie(recipie));
});

module.exports = app;
