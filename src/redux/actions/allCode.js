
import {ADD_ALLCODE} from '../constant'
const addAllCode = (userObj) =>{
    return {
        type: ADD_ALLCODE,
        payload: userObj
    }
}

export default {addAllCode};