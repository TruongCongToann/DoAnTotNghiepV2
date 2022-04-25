import {ADD_USER_LOGIN,LOG_OUT} from '../constant'

const addUser = (userObj) =>{
    return {
        type: ADD_USER_LOGIN,
        payload: userObj
    }
}
const logOut = () => {
    return {
        type:LOG_OUT
    }
}
export default {addUser,logOut};