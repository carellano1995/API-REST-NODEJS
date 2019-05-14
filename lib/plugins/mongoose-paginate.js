const defaultOptions = {
  select: '',
  sort: '',
  populate: '',
  page: 1,
  size: 10,
  lean: true
};

async function paginate(criteria, options) {
  const opts = { ...defaultOptions, ...options };
  const skipFrom = (opts.page - 1) * opts.size;
  const query = this.find(criteria)
    .skip(skipFrom)
    .limit(opts.size)
    .sort(opts.sort)
    .populate(opts.populate)
    .select(opts.select);

  if (opts.lean) {
    query.lean();
  }

  try {
    const [results, count] = await Promise.all([query.exec(), this.count(criteria).exec()]);
    const page = {
      results,
      count,
      pageSize: opts.size,
      currentPage: opts.page,
      pageCount: Math.ceil(count / opts.size) || 1
    };

    return Promise.resolve(page);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = schema => {
  // eslint-disable-next-line no-param-reassign
  schema.statics.paginate = paginate;
};
