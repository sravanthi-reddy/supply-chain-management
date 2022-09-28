const { placeCustOrder,trackCustOrder, placeStkOrder, trackStkOrder } = require("../model/order.model");
const { getStockInfo } = require("../model/product.model");
const { viewProductById } = require("./product.controller");


//Place customer Order
const placeCustomerOrder = async(req,res) => {
    try {  
        let orderInfo = req.body;
        var productInfo = await viewProductById(orderInfo.productId);
        var stockInfo = await getStockInfo(productInfo.stockId)
        orderInfo.orderAmount = stockInfo.unitPrice;
        orderInfo.userId = req.user.userId
        var newOrder = await placeCustOrder(orderInfo)
        res.status(201).json({
              message: "Order placed successfully.",
              success: true,
              data : newOrder
        });
      }catch(error){
        return res.status(500).json({
          message: "Unable to place the order.",
          success: false,
          error : error
        });
      }
}

//track customer order
const trackCustomerOrder = async (req,res) => {
  try {  
    let orderId = req.query.productId
    var orderInfo = await trackCustOrder(orderId);
    res.status(201).json({
          message: "successfully retreived the order information.",
          success: true,
          data : orderInfo
    });
   
  }catch(error){
    return res.status(500).json({
      message: "Unable to update product info.",
      success: false
    });
  }
};


//Place stock Order
const placeStockOrder = async(req,res) => {
    try {  
        let orderInfo = req.body;
        //var productInfo = await viewProductById(orderInfo.productId);
        var stockInfo = await getStockInfo(orderInfo.stockId)
        orderInfo.orderAmount = orderInfo.stockOrderQty*stockInfo.unitPrice;
        orderInfo.userId = req.user.userId
        var newOrder = await placeStkOrder(orderInfo)
        res.status(201).json({
              message: "Order placed successfully.",
              success: true,
              data : newOrder
        });
      }catch(error){
        return res.status(500).json({
          message: "Unable to place the order.",
          success: false,
          error : error
        });
      }
}

//track stock order
const trackStockOrder = async (req,res) => {
  try {  
    let orderId = req.query.productId
    var orderInfo = await trackStkOrder(orderId);
    res.status(201).json({
          message: "successfully retreived the order information.",
          success: true,
          data : orderInfo
    });
   
  }catch(error){
    return res.status(500).json({
      message: "Unable to update product info.",
      success: false
    });
  }
};
module.exports = {trackCustomerOrder,placeCustomerOrder,placeStockOrder,trackStockOrder}