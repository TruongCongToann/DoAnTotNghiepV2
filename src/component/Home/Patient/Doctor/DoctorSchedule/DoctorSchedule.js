import React, { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { getSchedulebyDate } from '../../../../CustomHooks/useFetch'
import { useParams } from 'react-router-dom';
import './DoctorSchedule.css'
import BookingModal from '../../../Doctor/Modal/BookingModal';
import { times } from 'lodash';
const DoctorSchedule = (props) => {

  const [alldays, setalldays] = useState([]);
  const [allAvaiableTime, setallAvaiableTime] = useState([])

  const [isOpenModalBooking, setisOpenModalBooking] = useState(false)
  const [dataScheduleTimeModal, setdataScheduleTimeModal] = useState({})

  const [selectedDate, setselectedDate] = useState({})
  let { id } = useParams();
  // console.log(moment(new Date).locale('vi').format('dddd - DD/MM'))
  let arrDate = [];
  for (let i = 0; i < 7; i++) {
    let object = {}
    object.label = capitalizeFirstLetter(moment(new Date()).locale('vi').add(i, 'days').format('dddd - DD/MM'))
    object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
    arrDate.push(object);

  }
  //function upercase first letter of date vietnamese
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    setalldays(arrDate);

  }, []);


  let date = alldays && alldays.length > 0 && alldays[0].value

  //khong chac chan , neu co loi hay xem lai doan nay
  useEffect(() => {
    async function fetchData() {
      let res = await getSchedulebyDate(props.currentDoctorID, date).then(response =>
        setallAvaiableTime(response.data)
      )
    }
    fetchData();
  }, [props.currentDoctorID])

  
  //handle change an get data when change date
  const handleOnchangeSelect = async (e) => {
    let date = e.target.value
    console.log("date select ",date);
    setselectedDate(date)
    if (id != null) {
      let res = await getSchedulebyDate(id, date)
      if (res) {
        setallAvaiableTime(res.data ? res.data : [])

      } else {

      }
    }
  }

  //handleBookSchedule for user 
  const handleBookSchedule = (item) => {
    // console.log("item la ", item);
    setdataScheduleTimeModal(item)
    setisOpenModalBooking(true)
  }
  //close modal booking
  const closeModelBooking = () =>{
    setisOpenModalBooking(false)
  }
 
  return (

    <>
      <BookingModal 
        isOpenModal = {isOpenModalBooking}
        closeBookingModal = {closeModelBooking}
        dataScheduleTime = {dataScheduleTimeModal}
        currentDoctorID = {props.currentDoctorID}
      />
      <div className='doctor-schedule-container'>
        <div className='all-schedule'>
          <select onChange={(e) => handleOnchangeSelect(e)}>
            {
              alldays && alldays.length > 0 &&
              alldays.map((item, index) => {
              
                return (
                  <option value={item.value} key={index} 
                  >{item.label}</option>
                )
              })
            }
          </select>
        </div>
        <div className='all-available-time'>
          <div className='text-calendar'>
            <i className="fas fa-calendar-alt">  <span>Lịch khám</span></i>
          </div>
          <div className='time-content'>
            {allAvaiableTime && allAvaiableTime.length > 0 ?
              <React.Fragment>
                <div className='time-content-btn'>
                  {
                    allAvaiableTime.map((item, index) => {
                      return (

                        <button key={index} onClick={() => { handleBookSchedule(item) }}>{item.allCode.valuevi}</button>
                      )
                    })
                  }
                </div>
                <div className='book-free'>
                  <span>Chọn <i className='far fa-hand-point-up'></i> và đặt lịch (miễn phí)</span>
                </div>
              </React.Fragment>
              :
              <div className='no-schedule'> Không có lịch hẹn trong thời gian này,vui lòng chọn thời gian khác !</div>
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorSchedule