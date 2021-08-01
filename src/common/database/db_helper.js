const { getConnection } = require('./db_connection');
const { Exception } = require('../../models/Exception');

const _fileName = "db_helper";

const select = async(selectQuery) => {
    if (typeof selectQuery != 'string')
        throw '해당 함수의 매개변수는 string 타입이어야 합니다.'

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(selectQuery);
        connection.release();
        return rows;
    }
    catch (e) {
        return new Exception(e, `${_fileName}/select`);
    }
}

const insert = async(insertQuery, valueArr) => {
    if (typeof insertQuery != 'string')
        throw '해당 함수의 매개변수는 string 타입이어야 합니다.'

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(insertQuery, valueArr);
        connection.release();
        return rows;
    }
    catch (e) {
        return new Exception(e, `${_fileName}/insert`);
    }
}

const update = async(updateQuery, valueArr) => {
    if (typeof updateQuery != 'string')
        throw '해당 함수의 매개변수는 string 타입이어야 합니다.'

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(updateQuery, valueArr);
        connection.release();
        return rows;
    }
    catch (e) {
        return new Exception(e, `${_fileName}/update`);
    }
}

const deleteQuery = async(deleteQuery, valueArr) => {
    if (typeof deleteQuery != 'string')
        throw '해당 함수의 매개변수는 string 타입이어야 합니다.'

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(deleteQuery, valueArr);
        connection.release();
        return rows;
    }
    catch (e) {
        return new Exception(e, `${_fileName}/delete`);
    }
}

module.exports = { select, insert, update, deleteQuery }