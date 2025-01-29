const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { registerUser, loginUser, getUserProfile, logoutUser } = require("../controllers/userController");
const { userAuthentication } = require("../middlewares/authMiddleware");

router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstName").isLength({ min: 3 }).withMessage("First Name must be atleast 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 character long")
], registerUser);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters")
], loginUser);

router.get("/profile", userAuthentication, getUserProfile);
router.get("/logout", userAuthentication, logoutUser);

module.exports = router;