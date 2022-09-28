const { createProduct,updateProduct,deleteProduct,ViewAllProducts,ViewProduct } = require("../model/product.model");
const { createUser, userLogin } = require("../model/user.model");


//Home URL 
const addProduct = async(req,res) => {
    try {  
        let product = req.body;
        var newProduct = await createProduct(product);
        res.status(201).json({
              message: "Hurry! now you are successfully added Product.",
              success: true,
              data : newProduct
        });
       
      }catch(error){
        return res.status(500).json({
          message: "Unable to add product.",
          success: false,
          error : error
        });
      }
}

//update Product
const updateProductInfo = async (req,res) => {
  try {  

    let product = req.body;
    let productId = req.query.productId
    var updatedProduct = await updateProduct(product,productId);
    res.status(201).json({
          message: "Hurry! now you are successfully updated the product.",
          success: true,
          data : updatedProduct
    });
   
  }catch(error){
    return res.status(500).json({
      message: "Unable to update product info.",
      success: false
    });
  }
};
//delete product
const deleteProductById = async (req,res) => {
  try {  

    let productId = req.query.productId
    var isDeleted = await deleteProduct(productId);
    console.log("is deleted",isdeleted)
    res.status(201).json({
          message: "product deleted successfully",
          success: true,
          data : isDeleted
    });
   
  }catch(error){
    return res.status(500).json({
      message: "Unable to delete product info.",
      success: false
    });
  }
};

//view product by id
const viewProductById = async (req,res) => {
  try {  

    let productId = req.query.productId
    var productInfo = await ViewProduct(productId);
    res.status(201).json({
          message: "product info fetched successfully",
          success: true,
          data : productInfo
    });
   
  }catch(error){
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
    res.status(201).json({
          message: "products info fetched successfully",
          success: true,
          data : productsInfo
    });
   
  }catch(error){
    return res.status(500).json({
      message: "Unable to get product info.",
      success: false
    });
  }
};


module.exports = {updateProductInfo,addProduct,deleteProductById,viewProductById,viewAllProductsInfo}