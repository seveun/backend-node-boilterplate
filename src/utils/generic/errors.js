// eslint-disable-next-line max-classes-per-file
const {
  renderBadRequest,
  renderForbidden,
  renderUnauthorized,
  renderNotFound,
  renderConflict,
  renderInternalServerError,
  renderBadGateway,
  renderServiceUnavailable,
} = require('./responses');

const Logger = require('./logger');

function filterStackTrace(stack) {
  return stack;
}

class DefaultError extends Error {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    this.message = message;
    this.data = typeof data === 'object' ? JSON.stringify(data) : data;
    this.content = {
      name: this.name,
      message: this.message,
      data: filterStackTrace(data),
      // stack: filterStackTrace(this.stack),
    };
  }

}

exports.BadRequestError = class BadRequestError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, BadRequestError);
    this.name = BadRequestError.name;
    this.content.statusCode = 400;
  }

};

exports.UnauthorizedError = class UnauthorizedError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, UnauthorizedError);
    this.name = UnauthorizedError.name;
    this.content.statusCode = 401;
  }

};

exports.ForbiddenError = class ForbiddenError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, ForbiddenError);
    this.name = ForbiddenError.name;
    this.content.statusCode = 403;
  }

};

exports.NotFoundError = class NotFoundError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, NotFoundError);
    this.name = NotFoundError.name;
    this.content.statusCode = 404;
  }

};

exports.ConflictError = class ConflictError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, ConflictError);
    this.name = ConflictError.name;
    this.content.statusCode = 409;
  }

};

exports.InternalServerError = class InternalServerError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, InternalServerError);
    this.name = InternalServerError.name;
    this.content.statusCode = 500;
  }

};

exports.BadGatewayError = class BadGatewayError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, BadGatewayError);
    this.name = BadGatewayError.name;
    this.content.statusCode = 502;
  }

};

exports.ServiceError = class ServiceError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, ServiceError);
    this.name = ServiceError.name;
    this.content.statusCode = 503;
  }

};

exports.renderBackendError = (res, err) => {
  if (res.headersSent) return;
  if (err.data) Logger.error(err.data);
  if (err.stack) {
    Logger.error(err.stack);
  }
  else {
    Logger.error(err);
  }
  switch (err.name) {
    case 'NotFoundError':
      return renderNotFound(res, err.content);
    case 'BadRequestError':
      return renderBadRequest(res, err.content);
    case 'ForbiddenError':
      return renderForbidden(res, err.content);
    case 'UnauthorizedError':
      return renderUnauthorized(res, err.content);
    case 'ConflictError':
      return renderConflict(res, err.content);
    case 'BadGatewayError':
      return renderBadGateway(res, err.content);
    case 'ServiceError':
      return renderServiceUnavailable(res, err.content);
    case 'InternalServerError':
      return renderInternalServerError(res, err.content);

    default:
      return renderInternalServerError(res, err);
  }

};