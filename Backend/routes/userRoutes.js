const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { registerUser } = require("../controllers/userController");

router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstName").isLength({ min: 3 }).withMessage("First Name must be atleast 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 character long")
], registerUser);

module.exports = router;