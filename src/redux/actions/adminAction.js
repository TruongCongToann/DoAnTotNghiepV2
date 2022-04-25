
import { useFetch } from '../../component/CustomHooks/useFetch'
import {ADD_USER_BY_ADMIN,ADD_USER_FROM_TABLE,FETCH_ALLCODE_SCHEDULE_TIME} from '../constant'

const addUserByAdmin = (userObj) =>{    
    return {
        type:ADD_USER_BY_ADMIN,
        payload: userObj
    }
}
const addUserFromTable = (userObj) =>{

    
    return {
        type:ADD_USER_FROM_TABLE,
        payload: userObj
    }
}
const fetchAllScheduleTime = (userObj) =>{
    return {
        type:FETCH_ALLCODE_SCHEDULE_TIME,
        payload: userObj
    }
}

export default {addUserByAdmin,addUserFromTable,fetchAllScheduleTime};