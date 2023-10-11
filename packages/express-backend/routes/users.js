import express from "express";
import userServices from "../models/user-services.js";

const router = express.Router();

// get users

router.get("/", async (req, res) => {
  const { name, job } = req.query;
  try {
    const result = await userServices.getUsers(name, job);
    res.send({ usersList: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

// get user by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    res.send({ users_list: result });
  }
});

// add user

router.post("/", async (req, res) => {
  const { name, job } = req.body;
  const savedUser = await userServices.addUser({ name, job });
  if (savedUser) {
    res.status(201).send(savedUser);
  } else {
    res.status(500).end();
  }
});

// delete user

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await userServices.deleteUser(id);
  if (deletedUser) {
    res.status(204).end();
  } else {
    res.status(404).send("Resource not found.");
  }
});

export default router;
