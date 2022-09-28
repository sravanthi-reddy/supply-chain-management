const permissionEntity = require("../entities/permission.entity");

//create
const createPermission = async (permissions) => {  
    return await permissions.save()
}

const getPermissions = async (roleId) => {
    var permissions = await permissionEntity.find({roleId : roleId})
    return permissions[0];
}
module.exports = {createPermission,getPermissions}

