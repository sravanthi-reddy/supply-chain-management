const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerOrder = new Schema({
    productId : {type : mongoose.Schema.Types.ObjectId, ref:"Product"},
    userId : {type : mongoose.Schema.Types.ObjectId, ref:"User"},
    orderAmount: { type: Number, required: true, min : 1 },
    status: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    paymentMode: { type: String, required: true },
}, {
    timestamps: true,
});
const customerOrderEntity = mongoose.model('CustomerOrder', customerOrder);
module.exports = customerOrderEntity;