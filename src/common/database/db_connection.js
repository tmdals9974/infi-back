const mysql = require('mysql2/promise');
const { config } = require('./db_config.js');

let pool = mysql.createPool(config);

const getConnection = async function() {
    return await pool.getConnection(async conn => conn);
};

module.exports = { getConnection };