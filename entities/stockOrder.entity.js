const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockrOrder = new Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref:"User"},
    stockId : {type : mongoose.Schema.Types.ObjectId, ref:"Stock"},
    orderAmount: { type: Number, required: true },
    status: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    paymentMode: { type: String, required: true },
    stockOrderQty : { type: Number, required: true }
}, {
    timestamps: true,
});
const stockrOrderEntity = mongoose.model('StockrOrder', stockrOrder);
module.exports = stockrOrderEntity;