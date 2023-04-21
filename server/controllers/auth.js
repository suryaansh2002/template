const Users = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { mailer } = require("../utils/mailer");
const baseRoute = (req, res) => {
  try {
    res.json({
      endpoints: {
        login: "post /login",
        signup: "post /signup",
        getAllUsers: "get /allUsers",
        authenitcate: "post /authenticate",
      },
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const authenticateRoute = async (req, res) => {
  const { token } = req.body;
  try {
    var payload = jwt_decode(token);
    const id = payload.id;
    const user = await Users.findOne({ _id: id });
    if (user) {
      return res.json({ error: false, message: "user authenticated" });
    } else {
      return res.json({ error: true, message: "Authentication error" });
    }
  } catch (err) {
    return res.json({ error: true, message: "Authentication error" });
  }
};

const loginRoute = async (req, res) => {
  const { email, password } = req.body;
  if (!email || typeof email !== "string" || email.indexOf("@") == -1) {
    return res.json({ error: true, message: "Enter a valid email Id" });
  }
  if (!password || typeof password !== "string") {
    return res.json({ error: true, message: "Enter a valid password" });
  }

  const user = await Users.findOne({ email }).lean();

  if (!user) {
    return res.json({
      error: true,
      message: "User does not exist",
    });
  } else {
    if (user.verified == false) {
      return res.json({
        error: true,
        message: "Not verified",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET
      );
      var payload = jwt_decode(token);

      return res.json({
        error: false,
        message: "Login successful",
        data: token,
      });
    } else {
      return res.json({
        error: true,
        message: "Incorrect Password",
      });
    }
  }
};

const signupRoute = async (req, res) => {
  const { name, email, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    if (!name || typeof name !== "string") {
      return res.json({ error: true, message: "Enter a valid name" });
    }
    if (!email || typeof email !== "string" || email.indexOf("@") == -1) {
      return res.json({ error: true, message: "Enter a valid email" });
    }

    if (!plainTextPassword || typeof plainTextPassword !== "string") {
      return res.json({ error: true, message: "Enter Password" });
    }
    if (plainTextPassword.length < 6) {
      return res.json({
        error: true,
        message: "Password should be atleast 6 characters long.",
      });
    }
    const response = await Users.create({
      name,
      email,
      password,
    });
    const user = await Users.findOne({ email });

    const userId = user._id.toString();
    const subject = "Please Verify Your Account";
    const content = `Click on http://localhost:5000/api/auth/verify/${userId} to verify your account`;
    const mailResponse = await mailer(email, subject, content);

    return res.json({
      error: false,
      message:
        "Signed up Successfully, please check email to verify your account",
      data: user,
      mailer: mailResponse,
    });
  } catch (error) {
    console.log(error);
    if ((error.code = 11000)) {
      return res.json({
        error: true,
        message: "Email ID already used.",
      });
    }
    throw error;
  }
};

const getAllUsersRoute = async (req, res) => {
  try {
    const users = await Users.find();
    return res.json({ error: false, message: "Users data", data: users });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserByIdRoute = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findOne({ _id: id });
    return res.json({ error: false, message: "Single user data", data: user });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const verifyUserRoute = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Users.updateOne(
      { _id: id },
      {
        $set: { verified: true },
        function(err, res) {
          if (err) {
            console.log(err);
            throw err;
          }
        },
      }
    );
    const user = await Users.findOne({ _id: id });
    return res.json({ error: false, message: "User verified", data: user });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  baseRoute,
  loginRoute,
  signupRoute,
  getAllUsersRoute,
  getUserByIdRoute,
  verifyUserRoute,
  authenticateRoute,
};
