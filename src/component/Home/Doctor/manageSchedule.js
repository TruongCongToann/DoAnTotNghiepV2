import React,{useState,useEffect} from 'react'
import DoctorHeader from '../../manageUser/Header/DoctorHeader'
import AdminHeader from '../../manageUser/Header/AdminHeader'
import { USER_ROLE } from '../../../redux/constant';
import { useSelector,useDispatch } from 'react-redux';
import allAction from '../../../redux/actions/allAction';
import differenceBy from 'lodash/differenceBy'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './ManageSchedule.css'
import Select from 'react-select';
import moment from 'moment';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dateFormat } from '../../../redux/constant';
import { getScheduleByDoctorid, handleLoginAPI, useFetch ,deleteSchedule} from '../../CustomHooks/useFetch';
import _ from 'lodash';


const ManageSchedule = () => {
    const dispatch = useDispatch();
    const url = "https://api-truongcongtoan.herokuapp.com/api/allcode/TIME";
    const url_Schedule = "https://api-truongcongtoan.herokuapp.com/api/schedules/";

    const redux_user_loginedUser=useSelector(state=>state.loginedUser);
    const [selectedDoctor, setselectedDoctor] = useState({});
    const [startDate, setStartDate] = useState();
    const [rangeTime, setrangeTime] = useState([])
    const [doctorScheduleInfo, setdoctorScheduleInfo] = useState([]);

    let listDoctors = [];
    const redux_user_Doctors=useSelector(state=>state.doctor);
    const redux_user_Admin=useSelector(state=>state.admin);
    const {data:ScheduleTime} = useFetch(url);

  

    const MAX_NUMBER=10;
    let result = [];
  
    const checkUserRole = () =>{
        if (redux_user_loginedUser && redux_user_loginedUser.user&&redux_user_loginedUser.user.role) {
              let role = redux_user_loginedUser.user.role;
              if (role === USER_ROLE.ADMIN) {
                //   console.log("admin")
                  return <AdminHeader/>
              }else if(role === USER_ROLE.DOCTOR){
                //   console.log("doctor");
                  return <DoctorHeader/>
              }else{
                //   console.log("patient")
                  return <AdminHeader/>
              }
        }
    }
    const handleSelect = async (doctor) =>{
     
        setselectedDoctor(doctor);
        dispatch(allAction.addSelectedDoctor.addSelectedDoctor(doctor));
     
        let response = await getScheduleByDoctorid(doctor.value);
        // console.log("ket qua ",response.data)
       setdoctorScheduleInfo(response.data);

    }
    // console.log("gia tri id la ",selectedDoctor.value)
    useEffect(() => {
        if ( redux_user_Doctors.listDoctors&&redux_user_Doctors.listDoctors.length>0) {
          for (let i = 0; i < redux_user_Doctors.listDoctors.length; i++) {
              listDoctors.push(buildDataInput(redux_user_Doctors.listDoctors[i]));   
           
          }
        }
       },[selectedDoctor,listDoctors]);

       useEffect(() => {
        if (ScheduleTime && ScheduleTime.length>0) {
          let data = ScheduleTime;
      data = data.map(item =>({
          ...item,
          isSelected:false
      }))
        setrangeTime(data)
    }
       }, [ScheduleTime])

       //function buil data theo form cho cot select
  const buildDataInput = (inputData) =>{
    let object  = {};
   if ( inputData ) {
      
    object.value = inputData.user_id;
 object.label = `${inputData.hovaten}`;
   }
    return object;
  }
  
  //function click vao nut chon khung thoi gian
const handleClickBtnTime = (time) =>{
    if (rangeTime && rangeTime.length >0) {
     let data = rangeTime.map(item =>
        item.id===time.id ?{...item,isSelected:!item.isSelected}:item
      )
      setrangeTime(data)
    }
}
const handleSaveSchedule =  async () =>{

  if (!startDate) {
    toast.error("Vui lòng chọn ngày đặt lịch hẹn !")
  }
  if (selectedDoctor && _.isEmpty(selectedDoctor)) {
    toast.error("Vui lòng chọn bác sỹ !")
  }
  // let formatedDate = moment(startDate).format(dateFormat.SEND_TO_SERVER);
  // let formatedDate = moment(startDate).unix() * 1000;
  let formatedDate = new Date(startDate).getTime();
  if (rangeTime && rangeTime.length>0) {
    let selectedTime = rangeTime.filter(item =>item.isSelected === true);

    if (selectedTime && selectedTime.length >0) {
      selectedTime.map(item =>{
        let object={};
        object.maxnumber=MAX_NUMBER;
        object.date = formatedDate.toString();
        object.doctorid = selectedDoctor.value;
        object.timetype = item.key;
       
        result.push(object);

      });

   
   //check exist
    const myDifferences = _.differenceWith(result,doctorScheduleInfo,(a,b)=>{
      return a.timetype === b.timetype && a.date === b.date;
    });
    const deleteDiferences = _.differenceWith(doctorScheduleInfo,result,(a,b)=>{
      return a.timetype === b.timetype && a.date === b.date;
    });
    
    //create data
    if(myDifferences && myDifferences.length >0) {
      let payload = {
        "bulkSchedules":myDifferences
      }
      console.log("du lieu cua API la ",doctorScheduleInfo);
      console.log("du lieu nhap tu ban phim ",result)
      console.log("du lieu khac nhau ",myDifferences)
      console.log("du lieu client gui len ",payload)    
    
      handleLoginAPI(url_Schedule,payload);
      toast.success("Đã đặt lịch thành công !")
      console.log("gia tri id la ",selectedDoctor.value)
      let response = await getScheduleByDoctorid(selectedDoctor.value);
      console.log("ket qua ",response.data)
     setdoctorScheduleInfo(selectedDoctor.data);

    }else{
      // console.log("su khac biet luc xoa ",deleteDiferences)
      deleteDiferences.map(item =>{
        console.log("gia tri bi xoa la ",item)
        let response =  deleteSchedule(item.doctorid,item.date,item.timetype);
        console.log(response)
      })
    }
    setInterval('window.location.reload()', 4000);
 let response = await getScheduleByDoctorid(selectedDoctor.value);
      console.log("ket qua ",response.data)
     setdoctorScheduleInfo(response.data);
    


    }else{
      toast.error("Vui lòng chọn khung giờ đặt lịch !")
    }
  }
}



  return (
    <React.Fragment>
    {
        checkUserRole()
    }
          
    <div className='manage-schedule-container'>
        <div className='manage-schedule-title'>
                Quản lý kế hoạch khám bệnh của bác sỹ
        </div>
        <div className='container'>

            <div className='row'>
                <div className='col-6 form-group'>
                    <label>Chọn bác sỹ</label>
                    <Select
                           defaultValue={selectedDoctor}
                           onChange={handleSelect}
                           options={listDoctors}
                       />
                </div>
                <div className='col-6 form-group'>
                    <label>Chọn ngày</label>
                    <DatePicker selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                     dateFormat={"dd/MM/yyyy"}
                     minDate={new Date()}
                     className='form-control'
                    />
                      
                </div>
                <div className='col-12 pick-hour-container'>
                      {
                        rangeTime&&rangeTime.length>0&&
                        rangeTime.map((item,index) =>{
                          return(
                            <button 
                            className= {item.isSelected===true?"btn btn-schedule-active":"btn btn-schedule"}
                            key={index}
                            onClick={()=>handleClickBtnTime(item)}
                            >{item.valuevi}</button>
                          )
                        })
                      }
                </div>
                <button 
                className='btn btn-primary btn-save-schedule'
                onClick={()=>handleSaveSchedule()}
                >Lưu thông tin</button>
            </div>
        </div>
   
   
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
        />
    
    </div>
   
    </React.Fragment>
  )
}

export default ManageSchedule