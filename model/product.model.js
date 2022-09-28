const productEntity = require("../entities/product.entity");
const stockEntity = require("../entities/stock.entity");


/**
 * 
 * @param {productEntity - information to be added into the Database} product 
 * @returns productEntity : created product info
 */
const createProduct = async (product) => {
    const newStock = await createStock(product);
    const newProduct = new productEntity({
    "stockId" : newStock._id,
    "productName" : product.productName,
    "categoryName" : product.productCategory
  });

  return await newProduct.save()
}

/**
 * 
 * @param {stock information - stockEntity} stock 
 * @returns stockEntity - created stock infromation
 */
const createStock = async (stock) => {
    const newStock = new stockEntity({
    "stockQty" : stock.stockQuantity,
    "unitPrice" : stock.unitPrice
  });
  return await newStock.save()
}

/**
 * 
 * @param {stock id for which stock needs to be checked} stockId 
 * @returns stockEntity - information of the stock
 */

const getStockInfo = async (stockId) => {
   var stockInfo = stockEntity.findById(stockId)
   return stockInfo;
}

/**
 * 
 * @param {updated product information} newProduct 
 * @param {product id} id 
 * @returns  Productentity - updated product information
 */
const updateProduct = async (newProduct,id) => {

      var product = productEntity.findById(id)
      product.productName = newProduct.productName,
      product.categoryName = newProduct.categoryName
      return await product.save()
  }

/**
 * 
 * @param {product Id to delete the product} id 
 * @returns boolean - deleted or not
 */

const deleteProduct = async (id) => {
  
    var isDelete = productEntity.findByIdAndDelete(id)
    return isDelete
  }
/**
 * 
 * @param {product Id to view it's information} id 
 * @returns product entity with information
 */
const ViewProduct = async (id) => {
  var product = productEntity.findById(id)
    return product
}
  
/**
 * 
 * @returns List product entities
 */
const ViewAllProducts = async () => {
  var products = productEntity.find()
  return products
}

module.exports = {ViewAllProducts, ViewProduct, deleteProduct,updateProduct,createProduct, getStockInfo}