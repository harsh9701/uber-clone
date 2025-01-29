const { validationResult } = require("express-validator")
const { createUser } = require("../services/userServices");
const userModel = require("../models/userModel");
const blacklistJwtTokenModel = require("../models/blacklistJwtTokens");

module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, password } = req.body;

        const isUserExist = await userModel.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "User already exist" });
        }

        const hashPassword = await userModel.hashPassword(password);

        const user = await createUser({ firstName, lastName, email, password: hashPassword });

        const token = user.generateAuthToken();

        return res.status(200).json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = await user.generateAuthToken();

        res.cookie("token", token);

        return res.status(200).json({ token, user });
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

module.exports.getUserProfile = (req, res) => {
    return res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie("token");

    const blacklistToken = await blacklistJwtTokenModel.create({ token });

    return res.status(200).json({ message: "Logged Out" });
}