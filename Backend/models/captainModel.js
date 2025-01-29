const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First name must be atleast 3 character long"]
        },
        lastName: {
            type: String,
            minLength: [3, "Last name must be atleast 3 character long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"]
        }
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password.toString(), this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password.toString(), 10);
}

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;