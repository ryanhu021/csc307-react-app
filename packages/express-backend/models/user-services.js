import mongoose from "mongoose";
import UserModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://rhu02:n6thhrNSy1BJv25i@cluster0.lw4k4y0.mongodb.net/users?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

function findUserByNameAndJob(name, job) {
  return UserModel.find({ ...(name && { name }), ...(job && { job }) });
}

function getUsers(name, job) {
  return findUserByNameAndJob(name, job);
}

function findUserById(id) {
  return UserModel.findById(id);
}

function addUser(user) {
  const userToAdd = new UserModel(user);
  return userToAdd.save();
}

function deleteUser(id) {
  return UserModel.findByIdAndDelete(id);
}

export default {
  findUserByNameAndJob,
  findUserById,
  getUsers,
  addUser,
  deleteUser,
};
