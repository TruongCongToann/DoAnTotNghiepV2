import {ADD_USER_BY_ADMIN,ADD_USER_FROM_TABLE, FETCH_ALLCODE_SCHEDULE_TIME} from '../constant'

const initialState = {
  
    listUsers:[],
    user:{
      email:'',
      username:'',
      password:'',
      phonenumber:'',
      gender:'M',
      position:'P0',
      image:'',
      role:'R1',
      address:'',
      action:'CREATE'
    },
    allScheduleTime:[]

}
const adminReducer =(state =initialState, action) => {
   
    switch(action.type){
        case ADD_USER_BY_ADMIN:
          { return {
              ...state,
      
            listUsers:action.payload,
            
          }
        }
        case ADD_USER_FROM_TABLE:
          { return {
              ...state,
      
            user:action.payload,
            
          }
        }
        case FETCH_ALLCODE_SCHEDULE_TIME:
          {
            return{
              ...state,
              allScheduleTime:action.payload
            }
          }
        
        
        
     default:
            return state;
    }
}
export default  adminReducer;