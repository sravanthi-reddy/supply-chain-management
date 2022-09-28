const roleEntity = require("../entities/role.entity");

//create
const createRole = async (roleName) => {
  const newRole = new roleEntity({
    "name" : roleName
  })
  return await newRole.save()
}

const getRoleByName = async (roleName) => {
  var adminRole = await roleEntity.findOne({name : roleName});
  return adminRole;
}



module.exports = {createRole,getRoleByName}

