const captainModel = require("../models/captainModel");
const blacklistJwtTokenModel = require("../models/blacklistJwtTokens");
const { createCaptain } = require("../services/captainService");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
    const error = validationResult(req);
    if (!error) {
        return res.status(400).json({ error: error.array() })
    }

    const { firstName, lastName, email, password, vehicle } = req.body;

    const isCaptainExist = await captainModel.findOne({ email });

    if (isCaptainExist) {
        return res.status(400).json({ message: "Captain already exist" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(200).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const error = validationResult(req);

    if (!error) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await captain.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);

    return res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    return res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blacklistJwtTokenModel.create({ token });

    res.clearCookie("token");
    
    return res.status(200).json({ message: "Logged Out" });
}