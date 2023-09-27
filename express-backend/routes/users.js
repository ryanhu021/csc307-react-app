import express from "express";

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

const filterUsersByName = (usersList, name) =>
  usersList.filter((user) => user.name === name);

const filterUsersByJob = (usersList, job) =>
  usersList.filter((user) => user.job === job);

router.get("/", (req, res) => {
  const { name, job } = req.query;
  let result = users.usersList;
  if (name) {
    result = filterUsersByName;
  }
  if (job) {
    result = filterUsersByJob;
  }
  res.send({ usersList: result });
});

const findUserById = (id) => users.usersList.find((user) => user.id === id);

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
  users.usersList.push(user);
  return user;
};

router.post("/", (req, res) => {
  const userToAdd = req.body;
  const result = addUser(userToAdd);
  res.status(201).send(result);
});

const deleteUser = (id) => {
  const index = users.usersList.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.usersList.splice(index, 1);
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
