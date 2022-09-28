const User = require("../entities/user.entity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const productEntity = require("../entities/product.entity");
const stockEntity = require("../entities/stock.entity");


//create product
const createProduct = async (product) => {

    const newStock = await createStock(product);
    const newProduct = new productEntity({
    "stockId" : newStock._id,
    "productName" : product.productName,
    "categoryName" : product.productCategory
  });

  return await newProduct.save()
}

const createStock = async (stock) => {
    console.log("inside stock validation")
    const newStock = new stockEntity({
    "stockQty" : stock.stockQuantity,
    "unitPrice" : stock.unitPrice
  });
  return await newStock.save()
}

const getStockInfo = async (stockId) => {
   var stockInfo = stockEntity.findById(stockId)
   return stockInfo;
}

//update product
const updateProduct = async (newProduct,id) => {

      var product = productEntity.findById(id)
      product.productName = newProduct.productName,
      product.categoryName = newProduct.categoryName
      return await product.save()
  }

const deleteProduct = async (id) => {
  
    var isDelete = productEntity.findByIdAndDelete(id)
    return isDelete
  }

const ViewProduct = async (newProduct,id) => {
  var product = productEntity.findById(id)
    return product
}
  
const ViewAllProducts = async () => {
  var products = productEntity.find()
  return products
}

module.exports = {ViewAllProducts, ViewProduct, deleteProduct,updateProduct,createProduct, getStockInfo}