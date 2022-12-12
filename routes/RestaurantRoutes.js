const express = require("express")
const mongoose = require('mongoose');

const RestaurantModel = require('../models/RestaurantModel');
const UserRestaurantModel = require('../models/UserRestaurantModel')
const routes = express.Router()



//Get All Restaurants
//http://localhost:8081/api/res/restaurants
//GET
routes.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find()
        res.status(200).send(restaurants)
    } catch (error) {
        res.status(400).send(error)
    }
});

/*
{
    "name": "Test",
    "description": "Test",
    "street": "140 Kendall Ave",
    "city": "Toronto",
    "province": "ON",
    "postal_code": "M5R 1M1",
    "phone_number": "000-000-0000",
    "rating": 0,
    "picture": "",
    "coordinates": {
        "latitude": 43.6753067,
        "longitude": -79.412226
    }
}
*/
//Create New Restaurant
//http://localhost:8081/api/res/restaurant
//POST
routes.post('/restaurant', async (req, res) => {
    try {
        const newRestaurant = new RestaurantModel(req.body)
        const restaurant = await newRestaurant.save()
        res.status(201).send(restaurant)
    } catch (error) {
        res.status(400).send(error)
    }
});

//Add Favourite
//http://localhost:8081/api/res/favorite
routes.post('/favorite', async (req, res) => {
    try {
        const newUserRestaurant = new UserRestaurantModel(req.body)
        const userRestaurant = await newUserRestaurant.save()
        res.status(201).send(userRestaurant)
    } catch (error) {
        res.status(400).send(error)
    }
});

//Update Restaurant Rating
//http://localhost:8081/api/res/rating
//PUT
routes.put('/rating/:id', async (req, res) => {
    try {
        const newUserRating = await UserRestaurantModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(newUserRating)
    } catch (error) {
        res.status(400).send(error)
    }
});

//Get User Restaurant
//http://localhost:8081/api/res/favorite?username=xxx&id=xxx
routes.get('/favorite/', async (req, res) => {
    try {
        const userRestaurant = await UserRestaurantModel.find({username : req.query.username, restaurant_id : req.query.id})
        if(!userRestaurant){
            res.status(400).send({message: "No Restaurant Found"})
        }
        res.status(200).send(userRestaurant)
    } catch (error) {
        res.status(400).send(error)
    }
});

//Get Details by Restaurant ID
//http://localhost:8081/api/res/restaurant/{id}
//GET
routes.get('/restaurant/:id', async (req, res) => {
    try {
        const restaurant = await RestaurantModel.findById(req.params.id)
        if(!restaurant){
            res.status(400).send({message: "No Restaurant Found"})
        }
        res.status(200).send(restaurant)
    } catch (error) {
        res.status(400).send(error)
    }
});


//Update Restaurant Details and/or Rating
//http://localhost:8081/api/res/restaurant/{id}
//PUT
routes.put('/restaurant/:id', async (req, res) => {
    try {
        const newRestaurant = await RestaurantModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(newRestaurant)
    } catch (error) {
        res.status(400).send(error)
    }
});

//Delete Restaurant by ID
//http://localhost:8081/api/res/restaurant?id=xxx
//DELETE
routes.delete('/restaurant', async (req, res) => {
    try {
        const deletedRestaurant = await RestaurantModel.findByIdAndDelete(req.query.id)
        if(!deletedRestaurant){
            res.status(400).send({message: "No Restaurant to Delete"})
        }
        res.status(204).send(deletedRestaurant)
    } catch (error) {
        res.status(400).send(error)
    }
});


module.exports = routes