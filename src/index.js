const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const express = require('express');
const Promise = require('bluebird');
const cors = require('cors');
const Controllers = require('./controllers');
const Services = require('./services');
const { renderBackendError, Logger } = require('./utils');
const createRouter = require('./routes/init_router');
const { DbsIniter } = require('./databases/db_initer');

global.Promise = Promise;
global.controllers = Controllers;
global.services = Services;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

DbsIniter.init().then(() => {
  app.listen(process.env.PORT, () => {
    Logger.info(`Listen on port ${process.env.PORT}`);
  });
});

createRouter(app);

app.use((err, req, res, next) => renderBackendError(res, err));