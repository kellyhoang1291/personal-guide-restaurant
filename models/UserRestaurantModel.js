const mongoose = require('mongoose');


//define schema
const userRestaurantSchema = mongoose.Schema({
    username: String,
    restaurant_id: String,
    restaurant_rating: Number,
    is_favorite: Boolean
})

//creating model from schema
module.exports = mongoose.model("userRestaurant", userRestaurantSchema)