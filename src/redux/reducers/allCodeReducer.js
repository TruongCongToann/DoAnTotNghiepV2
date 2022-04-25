import {ADD_ALLCODE} from '../constant'

const initialState = {
    genders:[],
    roles:[],
    position:[],

}
const allCodeReducer =(state =initialState, action) => {
   
    switch(action.type){
        case ADD_ALLCODE:
          { return {
              ...state,
              genders: action.payload.gender,
              roles:action.payload.role,
              position:action.payload.position,
             
              
          }
      
        }
       
    
    
     default:
            return state;
    }
}
export default  allCodeReducer;