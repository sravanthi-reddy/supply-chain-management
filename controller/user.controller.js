const { getRoleByName } = require("../model/role.model");
const { createUser, userLogin } = require("../model/user.model");
const { validateUsername, isEmptyObject, isNullOrEmpty } = require("../utils");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const home = async(req,res) => {
    res.status(201).json({
        message : "Welcome to Supply Chain Management Application"
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success message with registered user information 
 */
const registerUser = async (req,res) => {
  try {  
    if(isNullOrEmpty(req.body) || isEmptyObject(req.body)){
      return res.status(500).json({
        message: "Please provide valid user information",
        success: false,
      });
    }
    let user = req.body;
    let usernameNotTaken = await validateUsername(user.email);

    if (!usernameNotTaken) {
        return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }
    var customerRole = await getRoleByName("Customer");
    if(customerRole._id != null){
      user.roleId = customerRole._id  
    }else{
      return res.status(500).json({
        message: "please provide valide role id.",
        success: false
      });
    }
    
    var newCustomer = await createUser(user);
    if(isNullOrEmpty(newCustomer) || isEmptyObject(newCustomer)){
      return res.status(500).json({
        message: "Unable to register supplier at the moment. Please try later",
        success: false,
      });
    }else{
    delete newCustomer.roleId
    return res.status(201).json({
          message: "Hurry! now you are successfully registred. Please nor login.",
          success: true,
          data : newCustomer
    });
  }
  }catch(error){
    logger.error(`${error.status || 500}- ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    return res.status(500).json({
      message: "Unable to create your account.",
      success: false,
      errorMessage : {...error}
    });
  }
};

//login
const login = async (req,res) => {
    try {  
      if(isNullOrEmpty(req.query) || isNullOrEmpty(req.query.email) || isNullOrEmpty(req.query.password)){
        return res.status(500).json({
          message: "Please provide valid user name and password",
          success: false,
        });
      }
      var loginParams = {}
      loginParams.email = req.query.email;
      loginParams.password = req.query.password;
      return await userLogin(loginParams,res);
    }catch(error){
      logger.error(`${error.status || 500}- ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

      res.status(400).json({
          error: error
      })
    }
  };
  
module.exports = {registerUser, home,login}