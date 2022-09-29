const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
  roleId : {type : mongoose.Schema.Types.ObjectId, ref:"Role"},
  name: { type: String, required: true,unique : false,trim : true, minLength : 3 },
  email: { type: String, required: true, },
  password: { type: String, required: true, minLength : 6},
  phoneNumber: { type: String, required: true ,minLength : 10, maxLength:10},
  addressLine1: { type: String, required: true , minLength : 3},
  province: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true,minLength:6,maxLength:6 },
}, {
  timestamps: true,
});

const userEntity = mongoose.model('User', user);

module.exports = userEntity;