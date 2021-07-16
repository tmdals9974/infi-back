const { getConnection } = require('./db_connection');
const { Exception } = require('../../models/Exception');

const select = async(selectQuery) => {
    if (typeof selectQuery != 'string')
        return '해당 함수의 매개변수는 string 타입이어야 합니다.'

    try {
        const connection = await getConnection();
        const [rows] = await connection.query(selectQuery);
        connection.release();
        return rows;
    }
    catch (e) {
        return new Exception(e, 'db_helper/select');
    }
}

module.exports = { select }