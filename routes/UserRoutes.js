const bcrypt = require("bcrypt")
const express = require("express")
const mongoose = require('mongoose')

const UsersModel = require('../models/UserModel')

const routes = express.Router()

/* 
{
"username": "admin",
"email": "admin@emai.com",
"password": "admin123"
}
*/
//Create new user
//http://localhost:8081/api/user/signup
//POST
routes.post('/signup', async (req, res) => {
    try {
        if (req.body.password.length > 50) {
            return res.status(400).send({error: "Password must less than 50 characters"})
        }
        const newUser = new UsersModel(req.body)
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)
        const user = await newUser.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})


//Allow user to access the system
//http://localhost:8081/api/user/login
//POST
routes.post('/login', async (req, res) => {
    try {
        const user = await UsersModel.findOne({username: req.body.username})
        if (user){
            const validPasssword = await bcrypt.compare(req.body.password, user.password)
            if (validPasssword){
                res.status(201).send({
                    "status": true,
                    "username": user.username,
                    "message": "User logged in successfully",
                })
            } else {
                res.status(400).send({
                    "status": false,
                    "message": "Invalid Username and password"
                })
            }
        } else {
            res.status(400).send({
                "status": false,
                "message": "Invalid Username and password"
            })
        }
    } catch {
        res.status(400).send(error)
    }
})

module.exports = routes