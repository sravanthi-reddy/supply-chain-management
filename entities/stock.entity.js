const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stock = new Schema({
  stockQty: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
}, {
  timestamps: true,
});
const stockEntity = mongoose.model('Stock', stock);
module.exports = stockEntity;