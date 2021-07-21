const express = require('express');
const router = express.Router();

const restaurant = require('./routes/restaurant');
const review = require('./routes/review');
const user = require('./routes/user');

require('date-utils');

router.use(function (req, res, next) {
    console.info(`[${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')}] ${req.path}`);
    next();
});

router.use('/restaurant', restaurant);
router.use('/review', review);
router.use('/user', user);

module.exports = router;