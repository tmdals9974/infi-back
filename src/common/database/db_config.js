require('dotenv').config();

let config = {
    host: process.env.db_host,
    port: process.env.db_port,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    connectionLimit: 6
};

module.exports = { config };