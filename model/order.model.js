

const productEntity = require("../entities/product.entity");
const customerOrderEntity = require("../entities/customerOrder.entity");
const stockrOrderEntity = require("../entities/stockOrder.entity");


//place customer order
const placeCustOrder = async (orderInfo) => {
    const newOrder = new customerOrderEntity({
        productId : orderInfo.productId,
        userId : orderInfo.userId,
        orderAmount: orderInfo.orderAmount,
        status: "In Progress",
        deliveryAddress: orderInfo.deliveryAddress,
        paymentMode: orderInfo.paymentMode,
  });
  return await newOrder.save()
}

//track customer order
const trackCustOrder = async (orderId) => {

      var orderInfo = customerOrderEntity.findById(orderId)
      return orderInfo.status
  }

  
//place stock order
const placeStkOrder = async (orderInfo) => {
    const newOrder = new stockrOrderEntity({
        stockId : orderInfo.stockId,
        userId : orderInfo.userId,
        orderAmount: orderInfo.orderAmount,
        status: "In Progress",
        shippingAddress: orderInfo.shippingAddress,
        paymentMode: orderInfo.paymentMode,
  });
  return await newOrder.save()
}

//track customer order
const trackStkOrder = async (orderId) => {

      var orderInfo = stockrOrderEntity.findById(orderId)
      return orderInfo.status
  }

module.exports = {placeCustOrder, trackCustOrder,placeStkOrder,trackStkOrder}
