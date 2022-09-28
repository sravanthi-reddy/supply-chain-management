const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
  stockId : {type : mongoose.Schema.Types.ObjectId, ref:"Stock"},
  productName: { type: String, required: true },
  categoryName: { type: String, required: true },
}, {
  timestamps: true,
});
const productEntity = mongoose.model('Product', product);
module.exports = productEntity;