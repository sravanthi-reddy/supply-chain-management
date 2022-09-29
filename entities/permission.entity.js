const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const permission = new Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  updateProduct: { type: Boolean },
  deleteProduct: { type: Boolean },
  getSuppliers: { type: Boolean },
  login: { type: Boolean },
  registerCustomer: { type: Boolean },
  registerSupplier: { type: Boolean },
  updateProduct: { type: Boolean },
  deleteProduct: { type: Boolean },
  addProduct: { type: Boolean },
  ViewProduct: { type: Boolean },
  ViewAllProducts: { type: Boolean },
  updateSupploer: { type: Boolean },
  deleteSupplier: { type: Boolean },
  addSupplier: { type: Boolean },
  viewSupplier: { type: Boolean },
  ViewAllSupplier: { type: Boolean },
  placeCustomerOrder: { type: Boolean },
  placeStockOrder: { type: Boolean },
  trackCustomerOrder: { type: Boolean },
  trackStockOrder: { type: Boolean },
}, {
  timestamps: true,
});
const permissionEntity = mongoose.model('Permission', permission);
module.exports = permissionEntity;