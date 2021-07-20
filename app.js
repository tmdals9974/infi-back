const express = require("express");
const app = express();
const cors = require('cors');
const { select } = require('./src/common/database/db_helper');
const { ResponseSwitch } = require('./src/models/Response');

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

app.listen(5000, () => {
    console.log('express started');
});