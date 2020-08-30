const Logger = require('./logger');

const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  BadGatewayError,
  ServiceError,
  renderBackendError,
} = require('./errors');

const {
  renderOk,
  renderCreated,
  renderDeleted,
  renderBadRequest,
  renderForbidden,
  renderUnauthorized,
  renderNotFound,
  renderConflict,
  renderBadGatewayError,
  renderInternalServerError,
  renderServiceUnavailable,
  renderRedirect,
} = require('./responses');

module.exports = {
  Logger,
  renderOk,
  renderCreated,
  renderDeleted,
  renderBadRequest,
  renderForbidden,
  renderUnauthorized,
  renderNotFound,
  renderConflict,
  renderBadGatewayError,
  renderInternalServerError,
  renderServiceUnavailable,
  renderRedirect,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  BadGatewayError,
  ServiceError,
  renderBackendError,
};