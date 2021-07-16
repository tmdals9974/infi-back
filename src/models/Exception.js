require('date-utils');

class Exception {
  constructor(message, path) {
    this.name = "Exception";
    this.time = new Date().toFormat("YYYY-MM-DD HH24:MI:SS");
    this.message = message;
    this.path = path;

    console.log(this.toString());
  }

  toString() {
    return `[${this.time}] ${this.path} / ${this.name} : ${this.message}`;
  }
}


module.exports = { Exception }