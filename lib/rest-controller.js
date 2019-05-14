const status = require('./constants/http-status');
const errorBuilder = require('./builders/error-builder');

/**
 * Controller for common operations for CRUD controllers
 */
const restController = {
  async findAll(req, res, fn) {
    try {
      const results = await fn.findAll(req.query);
      res.json({ results });
    } catch (error) {
      const [statusError, contentError] = errorBuilder.build(error);
      res.status(statusError).json(contentError);
    }
  },

  async findPaginated(req, res, fn, criteria) {
    try {
      const options = {
        select: req.query.select,
        sort: req.query.sort,
        page: req.query.page || 1,
        size: req.query.size || 10,
        populate: fn.populateFields(),
        lean: true
      };
      const results = await fn.findPage(criteria, options);
      res.json(results);
    } catch (error) {
      const [statusError, contentError] = errorBuilder.build(error);
      res.status(statusError).json(contentError);
    }
  },

  async findById(req, res, fn) {
    try {
      const result = await fn.findById(req.params.id);

      if (!result) {
        return res.status(status.NOTFOUND).end();
      }
      return res.json(result);
    } catch (error) {
      const [statusError, contentError] = errorBuilder.build(error);
      return res.status(statusError).json(contentError);
    }
  },

  async create(req, res, fn) {
    try {
      const result = await fn.create(req.body);
      const location = req.baseUrl + result.id;
      res
        .status(status.CREATED)
        .location(location)
        .json(result);
    } catch (error) {
      const [statusError, contentError] = errorBuilder.build(error);
      res.status(statusError).json(contentError);
    }
  },

  async update(req, res, fn) {
    try {
      const result = await fn.update(req.params.id, req.body);
      if (!result) {
        return res.status(status.NOTFOUND).end();
      }
      return res.status(status.UPDATED).json(result);
    } catch (error) {
      const [statusError, contentError] = errorBuilder.build(error);
      return res.status(statusError).json(contentError);
    }
  },
  async activate(req, res, fn) {
    try {
      const result = await fn.activate(req.params.id, req.body);
      if (!result) {
        return res.status(status.NOTFOUND).end();
      }
      return res.status(status.UPDATED).json(result);
    } catch (error) {
      const [statusError, contentError] = errorBuilder.build(error);
      return res.status(statusError).json(contentError);
    }
  },

  async delete(req, res, fn) {
    try {
      const result = await fn.delete(req.params.id);
      res.status(result ? status.DELETED : status.NOTFOUND).end();
    } catch (error) {
      const [statusError, contentError] = errorBuilder.build(error);
      res.status(statusError).json(contentError);
    }
  }
};

module.exports = restController;
