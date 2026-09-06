const express = require("express");
const router = express.Router();

const { signupUser, loginUser, forgetPassword,resetPassword } = require("../controllers/user-controllers");


router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
