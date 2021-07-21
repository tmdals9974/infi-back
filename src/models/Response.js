const { Exception } = require("./Exception");

class Response {
	constructor(statusCode, message) {
		this.statusCode = statusCode;
		this.message = message;
	}
}

const ResponseError = function (message) {
	return new Response(404, message);
};

const ResponseSuccess = function () {
	return new Response(200);
};

const ResponseSwitch = function (val) {
    if (val instanceof Exception) {
        return [ResponseError(val.message)];
    }
    else {
        return [ResponseSuccess(), val];
    }
}

module.exports = { ResponseSwitch };
