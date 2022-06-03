import {ADD_ALL_DOCTORS,ADD_OUTSTANDING_DOCTORS, ADD_SELECTED_DOCTOR,ADD_EXTRA_DOCTOR} from '../constant'

const initialState = {
  
    listDoctors:[],
    listOutStandingDoctors:[],
    selectedDotor:{},
    extraDoctorInfo:{}

}
const DoctorReducer=(state =initialState, action) => {
   
    switch(action.type){
        case ADD_ALL_DOCTORS:
          { return {
              ...state,
      
            listDoctors:action.payload,
            
          }
        }
        case ADD_OUTSTANDING_DOCTORS:
          { return {
              ...state,
            listOutStandingDoctors:action.payload,
            
          }
        }
        case ADD_SELECTED_DOCTOR:
          { return {
              ...state,
            selectedDotor:action.payload,
            
          }
        }
        case ADD_EXTRA_DOCTOR:
          { return {
              ...state,
              extraDoctorInfo:action.payload,
            
          }
        }
        
     default:
            return state;
    }
}
export default  DoctorReducer;