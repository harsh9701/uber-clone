const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require("../controllers/captainController");
const { captainAuthentication } = require("../middlewares/authMiddleware");


router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstName").isLength({ min: 3 }).withMessage("First Name must be at least 3 character long"),
    body("password").isLength({ min: 6 }).withMessage("password must be atleast 6 character long"),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Invalid vehicle type")
], registerCaptain);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 character long")
], loginCaptain);

router.get("/profile", captainAuthentication, getCaptainProfile);
router.get("/logout", captainAuthentication, logoutCaptain);

module.exports = router;