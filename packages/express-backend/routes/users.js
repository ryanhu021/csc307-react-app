import express from "express";
import userServices from "../models/user-services";

const router = express.Router();

const users = {
  usersList: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const userIdSet = new Set(users.usersList.map((user) => user.id));

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
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) {
    res.status(201).send(savedUser);
  } else {
    res.status(500).end();
  }
});

// delete user

const deleteUser = (id) => {
  if (userIdSet.has(id)) {
    users.usersList = users.usersList.filter((user) => user.id !== id);
    userIdSet.delete(id);
    return true;
  }
  return false;
};

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (deleteUser(id)) {
    res.status(204).send();
  } else {
    res.status(404).send("Resource not found.");
  }
});

export default router;
