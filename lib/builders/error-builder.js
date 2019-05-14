const status = require('../constants/http-status');
const { DB_ERRORS, VALIDATION_MESSAGE, DEFAULT_ERROR } = require('./../constants/errors-name');

const isDBError = err => DB_ERRORS[err.name];

const isMongoError = err => err.name === 'MongoError';

const isDuplicatedError = err => err.name === 'MongoError' && err.code === 11000;

const isCastError = err => err.name === 'CastError';

const isRequired = err => err.kind === 'required';

const isValidationError = err => err.name === 'ValidationError';

const getMessage = err => {
  if (isCastError(err)) {
    return `${err.path} is not valid`;
  }
  if (isRequired(err)) {
    return `${err.path} is required`;
  }
  return err.message;
};

const getValidationErrorList = err => Object.values(err.errors).map(value => getMessage(value));

const errorBody = err => {
  if (!isDBError(err)) {
    return DEFAULT_ERROR;
  }
  if (isDuplicatedError(err) || isCastError(err)) {
    return DB_ERRORS[err.name];
  }

  if (isValidationError(err)) {
    return {
      message: VALIDATION_MESSAGE,
      errors: getValidationErrorList(err)
    };
  }
  return DEFAULT_ERROR;
};

const statusCode = err => {
  if (isDuplicatedError(err) || (isDBError(err) && !isMongoError(err))) {
    return status.BAD_REQUEST;
  }
  return status.INTERNAL_SERVER_ERROR;
};

/**
 * Error builder for http responses
 */
const errorBuilder = {
  /**
   * Making error response
   * @param {Object} err - error object
   */
  build(err) {
    return [statusCode(err), errorBody(err)];
  }
};

module.exports = errorBuilder;
