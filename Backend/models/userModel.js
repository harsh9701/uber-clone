const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First Name should be atleast 3 characters"]
        },
        lastName: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be atleast 5 characters"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password.toString(), this.password);
    } catch (error) {
        throw new Error("Password comparison failed");
    }
}

userSchema.statics.hashPassword = async function (password) {
    try {
        return await bcrypt.hash(password.toString(), 10);
    } catch (error) {
        throw new Error("Password hashing failed");
    }
}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;