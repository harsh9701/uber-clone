const mongoose = require("mongoose");

const blacklistTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400 * 60 // 2 months in seconds
    }
});

const blacklistJwtToken = mongoose.model("BlacklistToken", blacklistTokenSchema);
module.exports = blacklistJwtToken;