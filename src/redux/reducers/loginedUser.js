import {ADD_USER_LOGIN,LOG_OUT} from '../constant';


const initialState = {
    language:'vi',
    user:[],
    loggedIn:false,
    role:''

}

const loginedUser =(state =initialState, action) => {
    switch(action.type){
        case ADD_USER_LOGIN:
          {
            if (action.payload.username === 'admin') {
                return {
                    ...state,
                    user: action.payload,
                    loggedIn:true,
                    language:'vi',
                    role:'admin'
                }
            } else
           {
            return {
                ...state,
                user: action.payload,
                loggedIn:true,
                language:'vi',
                role:'user'
            }
           }
        }
       
    
    case LOG_OUT:
        {
            return {
                ...state,
                user: {},
                loggedIn: false,
                role:''
            }
         }
     default:
            return state;
    }
}
export default  loginedUser;