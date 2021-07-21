const express = require('express');
const router = express.Router();
const { select, insert } = require('../../common/database/db_helper');
const { ResponseSwitch } = require('../../models/Response');
const { Exception } = require('../../models/Exception');

const path = "src/api/routes/review.js";

router.post('/', async (req, res) => {
	const valueArr = [
		req.body.writer,
		req.body.restaurants_id,
		req.body.reviews,
		req.body.rating,
		req.body.menu,
		req.body.price
	];
	if (!valueArr.every(val => val))
		return res.json(
			ResponseSwitch(
				new Exception('매개 변수를 확인해주세요.', path + '/')
			)
		);

	const restaurant = await insert(
		'INSERT INTO review(writer, restaurant_id, reviews, rating, menu, price) VALUES (?, ?, ?, ?, ?, ?)',
		valueArr
	);

	res.json(ResponseSwitch(restaurant));
});

module.exports = router;