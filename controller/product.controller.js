const { logger } = require("../config/logger");
const { createProduct,updateProduct,deleteProduct,ViewAllProducts,ViewProduct } = require("../model/product.model");
const { isNullOrEmpty, isEmptyObject } = require("../utils");

/**
 * 
 * @param {request Object} req 
 * @param {response object} res 
 * @returns added Product information
 */
const addProduct = async(req,res) => {
    try {  
        let product = req.body;
        if(isNullOrEmpty(product) || isEmptyObject(product)){
          return res.status(500).json({
            message: "Please provide valid input data.",
            success: false,
          });
        }
        var newProduct = await createProduct(product);
        if(isNullOrEmpty(newProduct) || isEmptyObject(newProduct)){
          return res.status(500).json({
            message: "Unable to add the product. Please try after some time",
            success: false,
          });
        }else{
          delete newProduct.stockId
        res.status(201).json({
              message: "Hurry! now you are successfully added Product.",
              success: true,
              data : newProduct
        });
      }
      }catch(error){
        logger.error(`${error.status || 500}- ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(500).json({
          message: "Unable to add product.",
          success: false,
          error : error
        });
      }
}

//update Product info
const updateProductInfo = async (req,res) => {
  try {  

    let product = req.body;
    if(isNullOrEmpty(product) || isEmptyObject(product) || isNullOrEmpty(req.query) || isNullOrEmpty(req.query.productId) ){
      return res.status(500).json({
        message: "Please provide valid input data.",
        success: false,
      });
    }
    let productId = req.query.productId

    var updatedProduct = await updateProduct(product,productId);
    if(isNullOrEmpty(updatedProduct) || isEmptyObject(updatedProduct)){
      return res.status(500).json({
        message: "Unable to update the product info. Please try after some time",
        success: false,
      });
    }else{
      delete updatedProduct.stockId

    res.status(201).json({
          message: "Hurry! now you are successfully updated the product.",
          success: true,
          data : updatedProduct
    });
  }
   
  }catch(error){
    logger.error(`${error.status || 500}- ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(500).json({
      message: "Unable to update product info.",
      success: false
    });
  }
};
//delete product given Id
const deleteProductById = async (req,res) => {
  try {  
    if(isNullOrEmpty(req.query) || isNullOrEmpty(req.query.productId)){
      return res.status(500).json({
        message: "Please provide valid input data.",
        success: false,
      });
    }
    let productId = req.query.productId
    var isDeleted = await deleteProduct(productId);
    if(isDeleted) {
    res.status(201).json({
          message: "product deleted successfully",
          success: true,
          isdeleted : isDeleted
    });
  }else{
    return res.status(500).json({
      message: "Unable to delete the product at the moment.",
      success: false,
    });
    }
   
  }catch(error){

    logger.error(`${error.status || 500}- ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    return res.status(500).json({
      message: "Unable to delete product info.",
      success: false
    });
  }
};

//view product by id
const viewProductById = async (req,res) => {
  try {  

    if(isNullOrEmpty(req.query) || isNullOrEmpty(req.query.productId)){
      return res.status(500).json({
        message: "Please provide valid input data.",
        success: false,
      });
    }
    let productId = req.query.productId
    var productInfo = await ViewProduct(productId);
    if(isNullOrEmpty(productInfo) || isEmptyObject(productInfo)){
      return res.status(500).json({
        message: "Unable to get the product info. Please try after some time",
        success: false,
      });
    }else{
      delete productInfo.stockId

    res.status(201).json({
          message: "product info fetched successfully",
          success: true,
          data : productInfo
    });
  }
  }catch(error){
    logger.error(`${error.status || 500}- ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    return res.status(500).json({
      message: "Unable to get product info.",
      success: false
    });
  }
};


//view all products
const viewAllProductsInfo = async (req,res) => {
  try {  

    var productsInfo = await ViewAllProducts();
    if(isNullOrEmpty(productsInfo) || productsInfo.length < 1){
      return res.status(500).json({
        message: "No products available to view. Please try after some time",
        success: false,
      });
    }else{
    res.status(201).json({
          message: "products info fetched successfully",
          success: true,
          data : productsInfo
    });
  }
   
  }catch(error){
    logger.error(`${error.status || 500}- ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    return res.status(500).json({
      message: "Unable to get product info.",
      success: false
    });
  }
};


module.exports = {updateProductInfo,addProduct,deleteProductById,viewProductById,viewAllProductsInfo}