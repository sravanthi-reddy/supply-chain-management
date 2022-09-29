
const { ViewAllSuppliers } = require("../model/user.model");
const { isNullOrEmpty } = require("../utils");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns list of available supplier information.
 */
const viewAllSupplierInfo = async (req,res) => {
  try {  
    var supplierInfo = await ViewAllSuppliers();
    if(isNullOrEmpty(supplierInfo) || supplierInfo.length < 1){
      return res.status(500).json({
        message: "No suppliers available in the system",
        success: false,
      });
    }else{
    res.status(201).json({
          message: "supplier info fetched successfully",
          success: true,
          data : supplierInfo
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


module.exports = {viewAllSupplierInfo}