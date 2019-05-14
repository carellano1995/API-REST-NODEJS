const basicCrudService = require('./basic-crud-service');
const Model = require('./../models/player');

const entityPrimaryService = {
  populateFields: () => ''
};

const entityService = {
  ...basicCrudService,
  ...entityPrimaryService,
  Model
};

module.exports = entityService;
