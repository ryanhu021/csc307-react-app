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

const userIdSet = new Set(users.usersList.map((user) => user.id));

const generateId = () => {
  let id = "";
  do {
    id = Math.random().toString(36).substring(2, 8);
  } while (userIdSet.has(id));
  return id;
};

// get users

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

// get user by id

const findUserById = (id) => users.usersList.find((user) => user.id === id);

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const result = findUserById(id);
  if (!result) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// add user

const addUser = (user) => {
  users.usersList.push(user);
  userIdSet.add(user.id);
  return user;
};

router.post("/", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId();
  const result = addUser(userToAdd);
  res.status(201).send(result);
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
