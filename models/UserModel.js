const mongoose = require('mongoose');


//define schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        maxLength: 100
    },
    email: {
        type: String,
        unique: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
    }
})

//creating model from schema
module.exports = mongoose.model("user", userSchema)