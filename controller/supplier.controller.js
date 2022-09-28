const { ViewAllSuppliers } = require("../model/user.model");



//view all products
const viewAllSupplierInfo = async (req,res) => {
  try {  
    var supplierInfo = await ViewAllSuppliers();
    res.status(201).json({
          message: "supplier info fetched successfully",
          success: true,
          data : supplierInfo
    });
   
  }catch(error){
    return res.status(500).json({
      message: "Unable to get product info.",
      success: false
    });
  }
};


module.exports = {viewAllSupplierInfo}