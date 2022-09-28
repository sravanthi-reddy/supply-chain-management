
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleEntity = new Schema({
  name: { type: String, required: true },
}, {
  timestamps: true,
});
const role = mongoose.model('Role', roleEntity);
module.exports = role;