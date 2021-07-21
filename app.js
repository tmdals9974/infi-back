const express = require("express");
const app = express();
const cors = require('cors');
const { select, insert } = require('./src/common/database/db_helper');
const { ResponseSwitch } = require('./src/models/Response');
const { Exception } = require("./src/models/Exception");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/getRestaurants', async (req, res) => {
    const restaurants = await select("SELECT * FROM restaurant");
    const reviews = await select("SELECT * FROM review");

    reviews.forEach((review) => {
        const index = restaurants.findIndex(r => r.id === review.restaurant_id);
        if (index !== -1) {
            if (!restaurants[index].reviews) restaurants[index].reviews = [];
            restaurants[index].reviews.push(review);
        }
    });

    res.json(ResponseSwitch(restaurants));
});

app.post('/createRestaurant', async (req, res) => {
    const valueArr = [req.body.type, req.body.position, req.body.name];
    if (!valueArr.every(val => val)) res.json(ResponseSwitch(new Exception('매개 변수를 확인해주세요.', 'app.js/createRestaurant')));
    
    const restaurant = await insert("INSERT INTO restaurant(type, position, name) VALUES (?, ?, ?)", valueArr);
    
    res.json(ResponseSwitch(restaurant));
})

app.listen(5000, () => {
    console.log('express started');
});