import {ADD_ALLCODE} from '../constant'

const initialState = {
    genders:[],
    roles:[],
    position:[],
    price:[],
    payment:[],
    province:[]

}
const allCodeReducer =(state =initialState, action) => {
   
    switch(action.type){
        case ADD_ALLCODE:
          { return {
              ...state,
              genders: action.payload.gender,
              roles:action.payload.role,
              position:action.payload.position,
             price:action.payload.price,
             payment:action.payload.payment,
             province:action.payload.province

              
          }
      
        }
      
       
    
    
     default:
            return state;
    }
}
export default  allCodeReducer;