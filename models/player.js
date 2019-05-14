const mongoose = require('mongoose');
const paginate = require('../lib/plugins/mongoose-paginate');

const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    name: { type: String },
    rut: { type: String },
    enabled: { type: Boolean, default: true }
  },
  { timestamps: true }
);

playerSchema.plugin(paginate);
playerSchema.index({ name: 1, enabled: 1 });

module.exports = mongoose.model('Player', playerSchema);
