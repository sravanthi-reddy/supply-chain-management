const permissionEntity = require("../entities/permission.entity");

//create permissions for given role
const createPermission = async (permissions) => {  
    return await permissions.save()
}

//get permissions for given role ID
const getPermissions = async (roleId) => {
    var permissions = await permissionEntity.find({roleId : roleId})
    return permissions[0];
}
module.exports = {createPermission,getPermissions}

