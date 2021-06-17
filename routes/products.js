const express = require("express");
const { validateParams, validatePatchParams } = require('../helpers/validator');
const router = express.Router();

const productsService = require("../services/products");

router.get("/", (req, res) => {
  const products = productsService.getAll();
  res.send(products);
});

router.get("/:id", (req, res) => {
  try {
    const product = productsService.get(req.params.id);
    res.send(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("", (req, res) => {
  if (!req.body || !validateParams(req.body, productsService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };
  try {
    const created = productsService.create(product);
    res.send(created);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.put("/:id", (req, res) => {
  if (!req.params.id || !req.body || !validateParams(req.body, productsService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const product = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };
  try {
    const updated = productsService.update(product);
    res.send(updated);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/:id", (req, res) => {
  if (!req.body || !validatePatchParams(req.body, productsService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const product = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };
  try {
    const patched = productsService.patch(product);
    res.send(patched);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Params not defined");
    return;
  }
  try {
    productsService.delete(req.params.id);
    res.send("Deleted " + req.params.id);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;