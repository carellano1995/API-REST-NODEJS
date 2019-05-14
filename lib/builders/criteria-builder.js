const getFilterFields = value => {
  /*
        Exclude all params for paginations and other issues
    */
  const { select, sort, page, size, filter, ...others } = value;
  return others;
};

const getSearchValueInMultipleFields = (value, ...fields) => {
  const regex = new RegExp(value, 'i');
  const $or = fields.map(field => {
    const statement = {};
    statement[field] = regex;
    return statement;
  });
  return {
    $or
  };
};

const getFilterValueInFields = values => {
  let $and = [];
  if (values) {
    $and = Object.keys(values).map(field => {
      const statement = {};
      statement[field] = values[field];
      return statement;
    });
  }
  return {
    $and
  };
};

/**
 * Query builder for db operations
 */
const criteriaBuilder = {
  /**
   * Search value in multiple fields
   * @param {String} value - search value
   * @param {Array} fields - field names to search into
   */

  build(value, ...fields) {
    const searchValueInMultipleFields = getSearchValueInMultipleFields(value.filter, ...fields);
    const valueFields = getFilterFields(value);
    const filterValueInFields = getFilterValueInFields(valueFields);
    const query = {
      $and: []
    };
    if (filterValueInFields.$and.length > 0) {
      query.$and.push(filterValueInFields);
    }
    if (searchValueInMultipleFields.$or.length > 0) {
      query.$and.push(searchValueInMultipleFields);
    }

    return query;
  }
};

module.exports = criteriaBuilder;
