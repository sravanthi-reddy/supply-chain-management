const User = require("../entities/user.entity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userEntity = require("../entities/user.entity");
const { getRoleByName } = require("./role.model");


//create user
const createUser = async (user,res) => {

  const hashedPwd = await bcrypt.hash(user.password, 12);

  const newUser = new User({
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

  const newUser = new User({
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

  console.log("inside login", loginParams)
  try {
    var email = loginParams.email;
    const user = await User.findOne({ email })
    if (user == null) {
      return res.status(404).json({
        message: "Username is not found. Invalid login credentials.",
        success: false
      });
    }
    let isMatch = await bcrypt.compare(loginParams.password, user.password);
    console.log("is match", isMatch)
    if (isMatch) {
          // Sign in the token and issue it to the user
          let token = jwt.sign(
            {
              user_id: user._id,
              role: user.roleId,
              username: user.email,
            },
            process.env.SECRET,
            { expiresIn: "7 days" }
          );
          console.log('token',token)

          let result = {
            username: user.email,
            role: user.roleId,
            token: `Bearer ${token}`,
            expiresIn: 168
          };

          console.log('res',result)

          return res.status(200).json({
            ...result,
            message: "Hurray! You are now logged in.",
            success: true
          });
    } else {
      console.log('inside else')

      return res.status(403).json({
        message: "Incorrect password.",
        success: false
      });
    }
  } catch (err) {
    console.log('inside catch')

    return res.status(500).json({
      message: "Unable to process",
      success: false
    });

  }
};



const validateUsername = async username => {
  console.log("finding user with name", username)
  let user = await User.findOne({ username });
  return user ? false : true;
};

const ViewAllSuppliers = async () => {
  var supplierRole = getRoleByName("Supplier")
  var suppliers = userEntity.find({roleId : supplierRole._id}) //.populate("roleId")
  return suppliers
}

module.exports = { configureUser, createUser, userLogin,ViewAllSuppliers }