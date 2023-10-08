import mongoose from "mongoose";
import UserModel from "./user";

mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://rhu02:n6thhrNSy1BJv25i@cluster0.lw4k4y0.mongodb.net/users/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then((result) => console.log(`Connected to MongoDB: ${result.connection}`))
  .catch((error) => console.log(error));

function findUserById(id) {
  return UserModel.findById(id);
}

function addUser(user) {
  const userToAdd = new UserModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return UserModel.find({ name });
}

function findUserByJob(job) {
  return UserModel.find({ job });
}

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = UserModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
};
