const express = require('express');
const router = express.Router();
const { select, insert } = require('../../common/database/db_helper');
const { ResponseSwitch } = require('../../models/Response');
const { Exception } = require('../..//models/Exception');

const path = "src/api/routes/restaurant.js";

router.get('/', async (req, res) => {
	const restaurants = await select('SELECT * FROM restaurant');
	const reviews = await select('SELECT * FROM review');

	reviews.forEach(review => {
		const index = restaurants.findIndex(r => r.id === review.restaurant_id);
		if (index !== -1) {
			if (!restaurants[index].reviews) restaurants[index].reviews = [];
			restaurants[index].reviews.push(review);
		}
	});

	restaurants.forEach(restaurant => {
		let averaged = 0;
		let count = 0;

		if (restaurant.reviews)
			restaurant.reviews.forEach(review => {
				averaged += review.rating;
				count++;
			});
        else restaurant.reviews = [];

		restaurant.ratingAverage =
			count === 0 ? 0 : +(Math.round(averaged / count + 'e+2') + 'e-2');
	});

	res.json(ResponseSwitch(restaurants));
});

router.post('/', async (req, res) => {
	const valueArr = [req.body.type, req.body.position, req.body.name];
	if (!valueArr.every(val => val))
		return res.json(
			ResponseSwitch(
				new Exception('매개 변수를 확인해주세요.', path + '/')
			)
		);

	const restaurant = await insert(
		'INSERT INTO restaurant(type, position, name) VALUES (?, ?, ?)',
		valueArr
	);

	res.json(ResponseSwitch(restaurant));
});


module.exports = router;
