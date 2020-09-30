'use strict';
class AppError {
  constructor(msg, error) {
    this.msg = msg;
    this.error = error;
  }
}

module.exports = AppError;