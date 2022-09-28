const express  = require("express");
const configureData  = require("../seedData");
const { addProduct, updateProductInfo, deleteProductById, viewProductById, viewAllProductsInfo } = require("../controller/product.controller");
const { home, registerUser, login } = require("../controller/user.controller");
const {userAuth,checkPermission} = require("../utils");
const { placeCustomerOrder, trackCustomerOrder, placeStockOrder,trackStockOrder } = require("../controller/order.controller");
const { viewAllSupplierInfo } = require("../controller/supplier.controller");
const router = express.Router();

router.get('/seedData',configureData)
router.get("/login",login)
router.post("/registerCustomer",registerUser)
router.get("/",home)


//Product CRUD
router.put("/updateProduct",userAuth,checkPermission("updateProduct"),updateProductInfo)
router.delete("/deleteProduct",userAuth,checkPermission("deleteProduct"),deleteProductById)
router.post("/addProduct",userAuth,checkPermission("addProduct"), addProduct)
router.get("/ViewProduct",userAuth,checkPermission("ViewProduct"),viewProductById)
router.get("/ViewAllProducts",userAuth,checkPermission("ViewAllProducts"),viewAllProductsInfo)

//Supplier
router.get("/ViewAllSupplier",userAuth,checkPermission("ViewAllSupplier"),viewAllSupplierInfo)

//Order related enpoints
router.post("/placeCustomerOrder",userAuth,checkPermission("placeCustomerOrder"),placeCustomerOrder)
router.get("/trackCustomerOrder",userAuth,checkPermission("trackCustomerOrder"),trackCustomerOrder)

router.post("/placeStockOrder",checkPermission("placeStockOrder"),userAuth,placeStockOrder)
router.get("/trackStockOrder",checkPermission("trackStockOrder"),userAuth,trackStockOrder)

// /** out of scope for current milestone 

// router.get("/viewSupplier",registerCustomer)
// router.put("/updateSupploer",registerCustomer)
// router.delete("/deleteSupplier",registerCustomer)
// router.post("/addSupplier",registerCustomer)
 
// **/

module.exports = router;