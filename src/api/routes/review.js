const express = require('express');
const router = express.Router();
const { select, insert, update, deleteQuery } = require('../../common/database/db_helper');
const { ResponseSwitch } = require('../../models/Response');
const { Exception } = require('../../models/Exception');

const path = "src/api/routes/review.js";

router.post('/', async (req, res) => {
	const valueArr = [
		req.body.writer,
		req.body.restaurant_id,
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

	const review = await insert(
		'INSERT INTO review(writer, restaurant_id, reviews, rating, menu, price) VALUES (?, ?, ?, ?, ?, ?)',
		valueArr
	);

	res.json(ResponseSwitch(review));
});

router.put('/', async (req, res) => {
	const valueArr = [
		req.body.writer,
		req.body.restaurant_id,
		req.body.reviews,
		req.body.rating,
		req.body.menu,
		req.body.price,
		req.body.id
	];

	if (!valueArr.every(val => val))
		return res.json(
			ResponseSwitch(
				new Exception('매개 변수를 확인해주세요.', path + '/')
			)
		);

	const review = await update(
		'UPDATE review SET writer = ?, restaurant_id = ?, reviews = ? ,rating = ?, menu = ?, price = ? where id = ?',
		valueArr
	);

	res.json(ResponseSwitch(review));
});

router.delete('/', async (req, res) => {
	const valueArr = [req.body.id];
	if (!valueArr.every(val => val))
		return res.json(
			ResponseSwitch(
				new Exception('매개 변수를 확인해주세요.', _path + '/')
			)
		);

	const review = await deleteQuery('DELETE FROM review WHERE id = ?', valueArr);

	res.json(ResponseSwitch(review));
});

module.exports = router;