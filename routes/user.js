import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { getUser, getUsers, insertUser } from "../helper.js";
import { createConnection } from "../index.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// get all users
router.route("/").get(auth, async (request, response) => {
  const client = await createConnection();
  const contestants = await getUsers(client, {});
  response.send(contestants);
});

// user password - create a user
router.route("/signup").post(async (request, response) => {
  const { username, password, phone, email } = request.body;
  //console.log(username, password);
  const client = await createConnection();
  // checking for user exists
  const user = await getUser(client, { email: email });
  //console.log(user);
  if (user) {
    response.send({ message: "User already exists !" });
  } else {
    const hashedPassword = await genPassword(password);
    const newUser = await insertUser(client, {
      username: username,
      password: hashedPassword,
      phone: phone,
      email: email,
    });
    // console.log(hashedPassword, newUser);
    response.send({ newUser, message: "User added !" });
  }
});

// Make check if user already exists - task

// login
router.route("/login").post(async (request, response) => {
  const { username, password } = request.body;
  const client = await createConnection();
  const user = await getUser(client, { email: username });

  if (!user) {
    response.send({
      message: "User not exists, Please Sign Up ! ",
      username: "",
    });
  } else {
    const inDbStorePassword = user.password;
    const isPasswordMatch = await bcrypt.compare(password, inDbStorePassword);
    if (isPasswordMatch) {
      const token = jwt.sign({ id: user._id }, process.env.SECERET_KEY);
      response.send({
        message: "Successfull login",
        token: token,
        username: user.username,
      });
    } else {
      response.send({ message: "Invalid login" });
    }
  }
});

// list all the users in database

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); // More rounds secure - dowside it will time - user
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const userRouter = router;
