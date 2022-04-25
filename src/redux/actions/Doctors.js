import {ADD_ALL_DOCTORS,ADD_OUTSTANDING_DOCTORS, ADD_SELECTED_DOCTOR} from '../constant'


const addAllDoctor = (doctorsObj) => {
    return {
        type:ADD_ALL_DOCTORS,
        payload: doctorsObj
    }
}

const addOutStandingDoctors = (doctorsObj) => {
    return {
        type:ADD_OUTSTANDING_DOCTORS,
        payload: doctorsObj
    }
}

const addSelectedDoctor = (doctorsObj) => {
    return {
        type:ADD_SELECTED_DOCTOR,
        payload: doctorsObj
    }
}
export default {addAllDoctor,addOutStandingDoctors,addSelectedDoctor}
