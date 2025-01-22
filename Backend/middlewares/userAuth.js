const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const blacklistJwtTokenModel = require("../models/blacklistJwtTokens");

module.exports.userAuthentication = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    const isBlacklistToken = await blacklistJwtTokenModel.find({ token });

    if (isBlacklistToken.length > 0) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode._id);

        req.user = user;

        return next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}