const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userEntity = require("../entities/user.entity");
const { validateUsername } = require("../utils");
const { getRoleByName } = require("./role.model");


//create user
const createUser = async (user) => {
  const hashedPwd = await bcrypt.hash(user.password, 12);
  const newUser = new userEntity({
    "name": user.name,
    "email": user.email,
    "roleId": user.roleId,
    "password": hashedPwd,
    "phoneNumber": user.phoneNumber,
    "addressLine1": user.addressLine1,
    "province": user.province,
    "city": user.city,
    "postalCode": user.postalCode
  });
  return await newUser.save()
}


const configureUser = async (user, roleId) => {

  let usernameNotTaken = await validateUsername(user.email);
  if (!usernameNotTaken) {
    console.log("username is already taken", user)
  }
  const hashedPwd = await bcrypt.hash(user.password, 12);

  const newUser = new userEntity({
    "name": user.name,
    "email": user.email,
    "roleId": roleId,
    "password": hashedPwd,
    "phoneNumber": user.phoneNumber,
    "addressLine1": user.addressLine1,
    "province": user.province,
    "city": user.city,
    "postalCode": user.postalCode
  });
  return await newUser.save()
}


const userLogin = async (loginParams, res) => {

  try {
    var email = loginParams.email;
    const user = await userEntity.findOne({email : email })
    if (user == null) {
      return res.status(404).json({
        message: "Username is not found. Invalid login credentials.",
        success: false
      });
    }
    let isMatch = await bcrypt.compare(loginParams.password, user.password);
    if (isMatch) {
          // Sign in the token and issue it to the user
          let token = jwt.sign(
            {
              userId: user._id,
              role: user.roleId,
              email: user.email,
            },
            process.env.SECRET,
            { expiresIn: "2d" } //number of milli seconds,100s, 1h, 1d, 2 days,
          );

          let result = {
            username: user.email,
            //role: user.roleId,
            token: `Bearer ${token}`,
            expiresIn: "2 days"
          };

          return res.status(200).json({
            ...result,
            message: "Hurray! You are now logged in.",
            success: true
          });
    } else {
      return res.status(403).json({
        message: "Incorrect password.",
        success: false
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Unable to process",
      success: false
    });

  }
};


const ViewAllSuppliers = async () => {
  var supplierRole = getRoleByName("Supplier")
  var suppliers = userEntity.find({roleId : supplierRole._id}) 
  return suppliers
}

module.exports = { configureUser, createUser, userLogin,ViewAllSuppliers }