const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./src/api/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.listen(5000, () => {
	console.log('express started');
});