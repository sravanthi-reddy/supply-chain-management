const { createUser, userLogin } = require("../model/user.model");


//Home URL 
const home = async(req,res) => {
    res.status(201).json({
        message : "Welcome to Supply Chain Management Application"
    })
}

//create User
const registerUser = async (req,res,roleId) => {
  try {  
    let user = req.body;
   
    let usernameNotTaken = await validateUsername(user.email);
    if (!usernameNotTaken) {
        res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }
   
    if(roleId != null){
      user.roleId = roleId
    }else{
      return res.status(500).json({
        message: "please provide valide role id.",
        success: false
      });
    }
    
    var newCustomer = await createUser(user);
    res.status(201).json({
          message: "Hurry! now you are successfully registred. Please nor login.",
          success: true,
          data : newCustomer
    });
   
  }catch(error){
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false,
      error : error
    });
  }
};

//login
const login = async (req,res) => {
    try {  
      var loginParams = {}
      console.log("request params",req.query)
      loginParams.email = req.query.email;
      loginParams.password = req.query.password;
      loginParams.role = req.query.role
      return await userLogin(loginParams,res);
    }catch(error){
      res.status(400).json({
          error: error
      })
    }
  };
  
module.exports = {registerUser, home,login}