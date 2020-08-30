const { HealthCheckService } = require('../services');
const { InternalServerError } = require('../utils');

module.exports = class HealthCheckController {

  static async check() {
    try {
      return HealthCheckService.check();
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

};