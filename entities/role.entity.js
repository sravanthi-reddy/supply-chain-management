
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleEntity = new Schema({
  name: { type: String, required: true, trim: true, minLength: 3 },
}, {
  timestamps: true,
});
const role = mongoose.model('Role', roleEntity);
module.exports = role;