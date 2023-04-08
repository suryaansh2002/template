const express = require("express");
const router = express.Router();
const {
  baseRoute,
  loginRoute,
  signupRoute,
  getAllUsersRoute,
  getUserByIdRoute,
  verifyUserRoute,
  authenticateRoute
} = require("../controllers/auth");

router.get("/", baseRoute);
router.post("/login", loginRoute);
router.post("/authenticate", authenticateRoute);
router.post("/signup", signupRoute);
router.get("/allUsers", getAllUsersRoute);
router.get("/userById/:id", getUserByIdRoute);
router.get("/verify/:id", verifyUserRoute);

module.exports = router;
