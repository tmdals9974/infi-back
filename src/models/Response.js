const { Exception } = require("./Exception");

class Response {
	constructor(statusCode, message) {
		this.name = 'Response';
		this.statusCode = statusCode;
		this.message = message;
	}
}

const ResponseError = function (message) {
	return new Response(404, message);
};

const ResponseSuccess = function (data) {
	return new Response(200, data);
};

const ResponseSwitch = function (val) {
    if (val instanceof Exception) {
        return ResponseError(val);
    }
    else {
        return ResponseSuccess(val);
    }
}

module.exports = { ResponseSwitch };
