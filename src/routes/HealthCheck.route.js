const controllers = require('../controllers');

module.exports = [
  {
    method: 'GET',
    path: '/healthCheck',
    validators: [],
    handler: controllers.HealthCheck.check,
  },
];