const { logger } = require("../config/logger");
const { placeCustOrder, trackCustOrder, placeStkOrder, trackStkOrder } = require("../model/order.model");
const { getStockInfo, ViewProduct } = require("../model/product.model");
const { isNullOrEmpty, isEmptyObject } = require("../utils");


/**
 * 
 * @param {request object from postman} req 
 * @param {responce object to send back} res 
 * @returns Success response if the order is placed successfully
 */
const placeCustomerOrder = async (req, res) => {
  try {
    let orderInfo = req.body;
    if (isNullOrEmpty(orderInfo) || isEmptyObject(orderInfo)) {
      return res.status(500).json({
        message: "Please provide valid input data.",
        success: false,
      });
    }
    var productInfo = await ViewProduct(orderInfo.productId);
    if (isNullOrEmpty(productInfo) || isEmptyObject(productInfo)) {
      return res.status(500).json({
        message: "product id is not valid.",
        success: false,
      });
    }
    var stockInfo = await getStockInfo(productInfo.stockId)
    if (isNullOrEmpty(stockInfo) || isEmptyObject(stockInfo)) {
      return res.status(500).json({
        message: "Product information is not valid.",
        success: false,
      });
    }
    orderInfo.orderAmount = orderInfo.orderQty * stockInfo.unitPrice;
    orderInfo.userId = req.user.userId
    var newOrder = await placeCustOrder(orderInfo)
    if (isNullOrEmpty(newOrder) || isEmptyObject(newOrder)) {
      return res.status(500).json({
        message: "Unable to place the order. Please try after some time",
        success: false,
      });
    } else {
      res.status(201).json({
        message: "Order placed successfully.",
        success: true,
        data: newOrder
      });
    }
  } catch (error) {
    logger.error(`${error.status || 500} - Unable to place the order - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(500).json({
      message: "Unable to place the order.",
      success: false,
      error: error
    });
  }
}

//track customer order
const trackCustomerOrder = async (req, res) => {
  try {
    if (isNullOrEmpty(req.query)) {
      return res.status(500).json({
        message: "Please provide valid order id.",
        success: false,
      });
    }

    let orderId = req.query.customerOrderId
    if (isNullOrEmpty(orderId)) {
      return res.status(500).json({
        message: "Please provide valid order id.",
        success: false,
      });
    }
    var orderInfo = await trackCustOrder(orderId);

    if (isNullOrEmpty(orderInfo) || isEmptyObject(orderInfo)) {
      return res.status(500).json({
        message: "Unable to retrieve the order information at the moment. Please try after sometime",
        success: false,
      });
    } else {
      res.status(201).json({
        message: "successfully retreived the order information.",
        success: true,
        data: orderInfo
      });
    }

  } catch (error) {
    logger.error(`${error.status || 500}- ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(500).json({
      message: "Unable to get the order info.",
      success: false
    });
  }
};


//Place stock Order
const placeStockOrder = async (req, res) => {
  try {
    let orderInfo = req.body;

    if (isNullOrEmpty(orderInfo) || isEmptyObject(orderInfo)) {
      return res.status(500).json({
        message: "Please provide valid input data",
        success: false,
      });
    }
    if (isNullOrEmpty(orderInfo.stockId)) {
      return res.status(500).json({
        message: "Please provide valid input data",
        success: false,
      });
    }
    var stockInfo = await getStockInfo(orderInfo.stockId)
    if (isNullOrEmpty(stockInfo) || isEmptyObject(stockInfo)) {
      return res.status(500).json({
        message: "Please provide valid input data",
        success: false,
      });
    }
    orderInfo.orderAmount = orderInfo.stockOrderQty * stockInfo.unitPrice;
    orderInfo.userId = req.user.userId
    var newOrder = await placeStkOrder(orderInfo)
    if (isNullOrEmpty(newOrder) || isEmptyObject(newOrder)) {
      return res.status(500).json({
        message: "Unable to place the order at the moment. Please try later",
        success: false,
      });
    } else {
      res.status(201).json({
        message: "Order placed successfully.",
        success: true,
        data: newOrder
      });
    }
  } catch (error) {
    logger.error(`${error.status || 500}- ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(500).json({
      message: "Unable to place the order.",
      success: false,
      error: error
    });
  }
}

//track stock order
const trackStockOrder = async (req, res) => {
  try {
    if (isNullOrEmpty(req.query)) {
      return res.status(500).json({
        message: "Please provide valid order Id",
        success: false,
      });
    }
    let orderId = req.query.stockOrderId
    if (isNullOrEmpty(orderId)) {
      return res.status(500).json({
        message: "Please provide valid order Id",
        success: false,
      });
    }
    var orderInfo = await trackStkOrder(orderId);
    if (isNullOrEmpty(orderInfo) || isEmptyObject(orderInfo)) {
      return res.status(500).json({
        message: "Unable to retreive the order information. Please try after some time",
        success: false,
      });
    } else {
      res.status(201).json({
        message: "successfully retreived the order information.",
        success: true,
        data: orderInfo
      });
    }

  } catch (error) {
    logger.error(`${error.status || 500}- ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(500).json({
      message: "Unable to get the order info.",
      success: false
    });
  }
};
module.exports = { trackCustomerOrder, placeCustomerOrder, placeStockOrder, trackStockOrder }