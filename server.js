const express = require('express');
const restaurantRoutes = require("./routes/RestaurantRoutes")
const usersRoutes = require("./routes/UserRoutes")
const mongoose = require('mongoose');

const app = express();

const DB_URL = "mongodb+srv://diemphuong1291:Di3mphuong@cluster0.rdmmjv6.mongodb.net/comp3074_project?retryWrites=true&w=majority"

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(express.json())
app.use(express.urlencoded())
app.use(allowCrossDomain)
  
mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use("/api/user/", usersRoutes)
app.use("/api/res/", restaurantRoutes)


app.get('/', (req, res) => {
    res.send("<h1>Welcome to Personal Restaurant Guide</h1>");
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});