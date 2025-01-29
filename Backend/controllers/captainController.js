const captainModel = require("../models/captainModel");
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