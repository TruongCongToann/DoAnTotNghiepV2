import loginUser from "./loginUser";
import addAllCode from "./allCode";
import addUserByAdmin from "./adminAction"
import loadAllUser from "./adminAction"
import addAllDoctor from './Doctors'
import addOutStandingDoctors from './Doctors' 
import addSelectedDoctor from './Doctors'
import addExtraDoctor from './Doctors'

import addUserFromTable from "./adminAction"
const allAction = {
    loginUser : loginUser,
    allCodeAction:addAllCode,
    adminAction:addUserByAdmin,
    loadAllUser:loadAllUser,
    addUserFromTable:addUserFromTable,
    addAllDoctor:addAllDoctor,
    addOutStandingDoctors:addOutStandingDoctors,
    addSelectedDoctor:addSelectedDoctor,
    addExtraDoctor:addExtraDoctor

}
export default allAction;