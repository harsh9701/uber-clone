const { validationResult } = require("express-validator")
const { createUser } = require("../services/userServices");
const userModel = require("../models/userModel");

module.exports.registerUser = async (req, res) => {
    try {
        console.log("Body: ", req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        const { firstName, lastName, email, password } = req.body;

        const hashPassword = await userModel.hashPassword(password);

        const user = await createUser({ firstName, lastName, email, password: hashPassword });

        const token = user.generateAuthToken();

        return res.status(200).json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}