import express from "express";

const router = express.Router();

const users = {
  users_list: [
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

const findUserByName = (name) =>
  users.users_list.filter((user) => user.name === name);

router.get("/", (req, res) => {
  const { name } = req.query;
  if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) => users.users_list.find((user) => user.id === id);

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

router.post("/", (req, res) => {
  const userToAdd = req.body;
  const result = addUser(userToAdd);
  res.status(201).send(result);
});

const deleteUser = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.users_list.splice(index, 1);
  }
  return null;
};

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (deleteUser(id)) {
    res.status(204);
  } else {
    res.status(404).send("Resource not found.");
  }
});

export default router;
