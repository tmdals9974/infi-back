const express = require("express");
const app = express();
const cors = require('cors');
const { select } = require('./src/common/database/db_helper');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/getResturants', async (req, res) => {
    const rows = await select("SELECT * FROM restaurant");
    res.json(rows);
});

app.listen(5000, () => {
    console.log('express started');
});