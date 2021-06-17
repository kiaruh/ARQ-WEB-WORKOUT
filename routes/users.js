const express = require("express");
const { validateParams, validatePatchParams } = require('../helpers/validator');
const router = express.Router();

const usersService = require("../services/users");

router.get("/", (req, res) => {
  const users = usersService.getAll();
  res.send(users);
});

router.get("/:id", (req, res) => {
  try {
    const user = usersService.get(req.params.id);
    res.send(user);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

router.post("", (req, res) => {
  if (!req.body || !validateParams(req.body, usersService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const user = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    document: req.body.document,
    role: req.body.role,
  };
  try {
    const createdUser = usersService.create(user);
    res.send(createdUser);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

router.put("/:id", (req, res) => {
  if (!req.params.id || !req.body || !validateParams(req.body, usersService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const user = {
    id: req.params.id,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    document: req.body.document,
    role: req.body.role,
  };
  try {
    const updatedUser = usersService.update(user);
    res.send(updatedUser);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

router.patch("/:id", (req, res) => {
  if (!req.body || !validatePatchParams(req.body, usersService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const user = {
    id: req.params.id,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    document: req.body.document,
    role: req.body.role,
  };
  try {
    const patchedUser = usersService.patch(user);
    res.send(patchedUser);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

router.delete("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Params not defined");
    return;
  }
  try {
    usersService.delete(req.params.id);
    res.send("Deleted " + req.params.id);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;