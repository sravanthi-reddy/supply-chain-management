const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
  stockId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock" },
  productName: { type: String, required: true, trim: true, minLength: 3 },
  categoryName: { type: String, trim: true, minLength: 3 },
}, {
  timestamps: true,
});
const productEntity = mongoose.model('Product', product);
module.exports = productEntity;