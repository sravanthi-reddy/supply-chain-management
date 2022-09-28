
const passport = require("passport");
const customerOrderEntity = require("./entities/customerOrder.entity");
const stockrOrderEntity = require("./entities/stockOrder.entity");
const userEntity = require("./entities/user.entity");
const { getPermissions } = require("./model/permission.model");

const userAuth = passport.authenticate("jwt", { session: false });

const checkPermission =  endpoint => async (req, res, next) => {
   
  var permissions = await getPermissions(req.user.roleId)
  if(!permissions[endpoint]){
    res.status(401).json("Unauthorized to access url. Your account is not authorized to access this url")
    if(endpoint == "trackCustomerOrder"){
      var orderId = req.query.customerOrderId;
      var orderInfo = customerOrderEntity.findOne({_id : orderId})
      if(orderInfo.userId != req.user._id){
        res.status(401).json("this order is not associated with your account")
      }
    }
    if(endpoint == "trackStockOrder"){
      var orderId = req.query.stockOrderId;
      var orderInfo = stockrOrderEntity.findOne({_id : orderId})
      if(orderInfo.userId != req.user._id){
        res.status(401).json("this order is not associated with your account")
      }
    }
  }else{
    return next()
  }
}

const validateUsername = async email => {
  let user = await userEntity.findOne({ email: email });
   return user ? false : true;
  
  };
module.exports = {userAuth,checkPermission,validateUsername}


  

const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
  };

//       const serializeUser = user => {
//         return {
//           username: user.username,
//           email: user.email,
//           name: user.name,
//           _id: user._id,
//           updatedAt: user.updatedAt,
//           createdAt: user.createdAt
//         };
//       };