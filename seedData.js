const permissionEntity = require("./entities/permission.entity")
const { createPermission } = require("./model/permission.model")
const { createRole, getRoleByName } = require("./model/role.model")
const { configureUser } = require("./model/user.model")


const  populateRolesAndPermissions = async (req, res) => {

    var roles = ["Admin","Supplier","Customer"]
    var allPermissions = ["login","registerCustomer","registerSupplier",
                    "updateProduct","deleteProduct","addProduct","ViewProduct","ViewAllProducts",
                    "updateSupploer", "deleteSupplier","addSupplier","viewSupplier","ViewAllSupplier",
                    "placeCustomerOrder","placeStockOrder","trackCustomerOrder","trackStockOrder"]
    var adminPermissions = allPermissions
    var customerPermissions = ["login","registerCustomer",
                               ,"ViewProduct","ViewAllProducts","placeCustomerOrder","trackCustomerOrder"]

    var supplierPermissions = [""]

     roles.forEach(async eachRole => {
        var permissionForRole = new permissionEntity()
        var permissionsList = []

        console.log("element",eachRole)
        //req.body = {"name" : eachRole}
        var newRole = await createRole(eachRole)
        console.log("new role ", newRole)
        if(eachRole == "Admin"){
            console.log("admin")
            permissionsList = adminPermissions
        }
        else if(eachRole == "Customer"){
            permissionsList = customerPermissions
        }
        else if(eachRole == "Supplier"){
            permissionsList = supplierPermissions
        }
        allPermissions.forEach( async eachPermission => {
            if(permissionsList.includes(eachPermission)){
                
                permissionForRole[eachPermission] = true
            }else{
              permissionForRole[eachPermission] = false
            }
            permissionForRole["roleId"] = newRole._id;
        })
        console.log("saving data",permissionForRole)
        var newPermission = await createPermission(permissionForRole)
        console.log("after saving data", newPermission)

     });
}
/* populateAdminUser */

const populateAdminUser = async (req, res) => {

    var adminRole = await getRoleByName("Admin");
    console.log("all roles",adminRole)
    var adminUser = {
        name: "sravanthi",
       email: "sravanthi@gmail.com",
       password : process.env.ADMIN_PASS,
       phoneNumber: 1234567890,
       addressLine1: "7 Crescent Place",
       province: "Ontario",
       city: "Scarborough" ,
       postalCode: "M4C5L7"
     }
     await configureUser(adminUser,adminRole[0]._id)

}

/* Populate Supplier */
const populateDefaultSupplier = async (req,res) => {

    var supplierRole = await getRoleByName("Supplier");

    console.log("all roles",supplierRole)
    var supplier = {
        name: "ClothingSupplier",
       email: "clothingSupplier@gmail.com",
       password: process.env.SUPP_PASS,
       phoneNumber: 1223355567,
       addressLine1: "255 Penetanguishe road",
       province: "Ontario",
       city: "Barrie" ,
       postalCode: "L4M7C2"
     }
    
     await configureUser(supplier,supplierRole[0]._id)
     res.status(201).json({
        message: `successfully populated the data.`,
        success: true
    });
}


const configureData = async (req, res) => {
   
    await populateRolesAndPermissions(req, res);
    await populateAdminUser(req, res);
    await populateDefaultSupplier(req, res)
 
 }

 module.exports = configureData;

