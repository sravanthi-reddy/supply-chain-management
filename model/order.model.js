

const customerOrderEntity = require("../entities/customerOrder.entity");
const stockrOrderEntity = require("../entities/stockOrder.entity");


//place customer order
const placeCustOrder = async (orderInfo) => {
    const newOrder = new customerOrderEntity({
        productId : orderInfo.productId,
        userId : orderInfo.userId,
        orderAmount: orderInfo.orderAmount,
        status: "Order Confirmed",
        deliveryAddress: orderInfo.deliveryAddress,
        paymentMode: orderInfo.paymentMode,
  });
  return await newOrder.save()
}

//track customer order
const trackCustOrder = async (orderId) => {

      var orderInfo = await customerOrderEntity.findById(orderId)
      return orderInfo
  }

  
//place stock order
const placeStkOrder = async (orderInfo) => {
    const newOrder = new stockrOrderEntity({
        stockId : orderInfo.stockId,
        userId : orderInfo.userId,
        orderAmount: orderInfo.orderAmount,
        status: "Order Confirmed",
        shippingAddress: orderInfo.shippingAddress,
        paymentMode: orderInfo.paymentMode,
        stockOrderQty : orderInfo.stockOrderQty
  });
  return await newOrder.save()
}

//track customer order
const trackStkOrder = async (orderId) => {

      var orderInfo = await stockrOrderEntity.findById(orderId)
      return orderInfo
  }

module.exports = {placeCustOrder, trackCustOrder,placeStkOrder,trackStkOrder}
