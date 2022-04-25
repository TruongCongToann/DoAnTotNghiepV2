import React from 'react'
import DoctorHeader from '../../manageUser/Header/DoctorHeader'
import manageSchedule from './manageSchedule'


const Doctor = () => {

  return (
    <React.Fragment>
        <DoctorHeader/>
        <manageSchedule/>

    </React.Fragment>
  )
}

export default Doctor