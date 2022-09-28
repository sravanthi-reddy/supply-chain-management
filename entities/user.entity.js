const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
  roleId : {type : mongoose.Schema.Types.ObjectId, ref:"Role"},
  name: { type: String, required: true,unique : false,trim : true, minlength : 3 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  addressLine1: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
}, {
  timestamps: true,
});

const userEntity = mongoose.model('User', user);

module.exports = userEntity;