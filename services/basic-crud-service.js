/**
 * Implements basic CRUD operations to DB.
 * DB is represented by Model so all objects
 * need a Model object to use it.
 */
const basicCrudService = {
  /**
   * Get all elements
   * @returns {Model[]} model list
   */
  async findAll(query) {
    return this.Model.find(query);
  },

  /**
   * Find Page with a list of objects that match criteria
   * @param {Object} criteria - Query where clause.
   * @param {Object} options - Pagination, populate, select fields options.
   * @param {Number} [options.page = 1] - Page requested. Starts on 1.
   * @param {Number} [options.size = 10] - Size of page.
   * @param {String} [options.sort = ''] - Sort value. Ex: -name,lastName.
   * @param {String} [options.select = ''] - Sort value. Ex: -name,lastName.
   * @param {String} [options.populate = ''] - Sort value. Ex: -name,lastName.
   * @param {Boolean} [options.lean = true] - Returns plain object when true
   * @returns {Page[]} model list
   */
  findPage(criteria, options) {
    return this.Model.paginate(criteria, options);
  },

  /**
   * Find object by Id with all information
   * @param {String} id - object id
   * @returns {Object} object found
   */
  findOne(id) {
    return this.Model.findOne({ _id: id, enabled: true })
      .select(`${this.selectFields}`)
      .exec();
  },

  /**
   * Find object by Id
   * @param {String} id - object id
   * @returns {Object} object found
   */
  findById(id) {
    return this.Model.findOne({ _id: id, enabled: true })
      .populate(`${this.populateFields()}`)
      .lean()
      .exec();
  },

  create(json) {
    return this.Model.create(json);
  },

  update(id, json) {
    return this.Model.findOneAndUpdate({ _id: id, enabled: true }, json, {
      new: true,
      runValidators: true
    });
  },
  activate(id, json) {
    return this.Model.findOneAndUpdate(
      { _id: id },
      { enabled: true },
      {
        new: true,
        runValidators: true
      }
    );
  },
  delete(id) {
    return this.Model.findOneAndUpdate(
      { _id: id, enabled: true },
      { enabled: false },
      { new: true }
    ).select(`${this.selectFields}`);
  },
  activate(id) {
    return this.Model.findByIdAndUpdate(id, { enabled: true }, { new: true });
  }
};

module.exports = basicCrudService;
