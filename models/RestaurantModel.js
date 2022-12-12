const mongoose = require('mongoose');

//define schema
const restaurantSchema = mongoose.Schema({
    name: String,
    description: String,
    street: String,
    city: String,
    province: String,
    postal_code: String,
    phone_number: String,
    rating: Number,
    picture: String,
    coordinates: {
        latitude: Number,
        longitude: Number
    }
})

//creating model from schema
module.exports = mongoose.model("restaurant", restaurantSchema)