const mongoose = require("mongoose");

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL).then((res) => {
            console.log("connected To DB");
        }).catch((err) => {
            console.log(err.message);
        })
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = connectToDb;