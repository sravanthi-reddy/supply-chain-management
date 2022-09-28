const express  = require("express");
const configureData  = require("../seedData");
const { addProduct, updateProductInfo, deleteProductById, viewProductById, viewAllProductsInfo } = require("../controller/product.controller");
const { home, registerUser, login } = require("../controller/user.controller");
const {userAuth, checkRole, checkPermission} = require("../utils");
const { placeCustomerOrder, trackCustomerOrder, placeStockOrder, trackStkOrder, trackStockOrder } = require("../controller/order.controller");
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
router.get("/ViewAllSupplier",userAuth,viewAllSupplierInfo)

//Order related enpoints
router.post("/placeCustomerOrder",userAuth,placeCustomerOrder)
router.get("/trackCustomerOrder",userAuth,trackCustomerOrder)

router.post("/placeStockOrder",userAuth,placeStockOrder)
router.get("/trackStockOrder",userAuth,trackStockOrder)

// /** out of scope for current milestone 

// router.get("/viewSupplier",registerCustomer)
// router.put("/updateSupploer",registerCustomer)
// router.delete("/deleteSupplier",registerCustomer)
// router.post("/addSupplier",registerCustomer)
 
// **/

module.exports = router;