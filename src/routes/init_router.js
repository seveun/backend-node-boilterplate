const express = require('express');
const Promise = require('bluebird');
const { renderOk } = require('../utils');
const routes = require('./index');

module.exports = (app) => {
  const router = express.Router();
  Object.keys(routes)
    .map(key => routes[key]).forEach((rs) => rs.forEach(r => {
      router[r.method.toLowerCase()](r.path, (req, res, next) => {
        Promise.each(r.validators, validator => validator(req, res))
          .then(() => r.handler(req, res))
          .then(data => renderOk(res, data))
          .catch(next);
      });
    }));
  app.use(router);
};