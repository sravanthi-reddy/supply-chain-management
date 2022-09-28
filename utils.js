
const passport = require("passport");
const { getPermissions } = require("./model/permission.model");

const userAuth = passport.authenticate("jwt", { session: false });

const checkPermission =  endpoint => async (req, res, next) => {
   
  var permissions = await getPermissions(req.user.roleId)
  if(!permissions[endpoint]){
    res.status(401).json("Unauthorized to access url")
  }else{
    return next()
  }
}
module.exports = {userAuth,checkPermission}

// const validateUsername = async username => {
//     let user = await User.findOne({ username });
//     return user ? false : true;
//   };

  

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