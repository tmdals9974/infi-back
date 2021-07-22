const express = require('express');
const router = express.Router();
const { select, insert, deleteQuery } = require('../../common/database/db_helper');
const { ResponseSwitch } = require('../../models/Response');
const { Exception } = require('../../models/Exception');

const path = "src/api/routes/user.js";

router.get('/', async (req, res) => {
	const users = await select('SELECT * FROM user');
	return res.json(ResponseSwitch(users));
});

router.post('/', async (req, res) => {
	const valueArr = [req.body.name, req.body.back_color, req.body.font_color];
	if (!valueArr.every(val => val))
		return res.json(
			ResponseSwitch(
				new Exception('매개 변수를 확인해주세요.', path + '/')
			)
		);

	await deleteQuery('DELETE FROM user WHERE name = ?', [req.body.name]);

	const restaurant = await insert(
		'INSERT INTO user(name, back_color, font_color) VALUES (?, ?, ?)',
		valueArr
	);

	res.json(ResponseSwitch(restaurant));
});

module.exports = router;