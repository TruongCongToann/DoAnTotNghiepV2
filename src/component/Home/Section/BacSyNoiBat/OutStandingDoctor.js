import React,{useState} from 'react'
import './OutStandingDoctor.css'
import Slider from "react-slick";

import {useFetch} from '../../../CustomHooks/useFetch'
import { useHistory} from 'react-router-dom';
import LoadingPage from '../../../CustomHooks/LoadingPage/LoadingPage';


const OutStandingDoctor = (props) => {

  const url = "https://api-truongcongtoan.herokuapp.com/api/users/0/6";

  const {data:doctorData} = useFetch(url);
  const history = useHistory();

  const [isLoading,setIsLoading] = useState(false);
 
  // console.log("du lieu thu duoc la ", doctorData)
  //format position
const formatPosition = (positionKey) =>{
      if (!positionKey) {
          return;       
      }else{
        if (positionKey === "P0") {
          return 'Bác sĩ';
        }else if (positionKey ==="P1") {
          return 'Thạc sĩ';
        }else if (positionKey === "P2") {
          return 'Tiến sĩ';
        }else if (positionKey === "P3") {
          return 'Phó giáo sư';
        }else if (positionKey === "P4") {
          return 'Giáo sư';
        }
      }
}

//handleViewDetaildoctor
const handleViewDetaildoctor = (doctor) =>{
  history.push(`/detail-doctor/${doctor.user_id}`)
}
    return (
       <div className='section-share'>
        <div className='section-outstanding-doctor'>
          <div className='section-container'>
            
            <div className='section-header'>
                <span className='section-title'>Bác sỹ nổi bật</span>
                <button className='btn-section'>Xem thêm</button>
            </div>

          <div className='section-body'>
          <Slider {...props.settings}>
       {
       
         doctorData&&doctorData.length>0&&doctorData.map(item =>{
          let name = `${formatPosition(item.position)} , ${item.hovaten}`;
          //  console.log("position thu duoc la ",item)
          return (
            <div className=' section-custom' key={item.user_id} onClick={() =>handleViewDetaildoctor(item)} >
            <div className='custom-boder'>
              <div className='outer-bg'>
                 <div className='bg-img-bacsy'
                 style={{backgroundImage:`url(${item.image})`}}
                 />
                   
              </div>
              <div className='position text-center'>
                <div className='position-custom-title' >{name}</div>
                <div>Cơ xương khớp 1</div>
              </div>     
            </div>
            </div>
          );
         })
       }
            </Slider>
            </div>
            
           </div>
          </div>
      </div>  
    );
}

export default OutStandingDoctor
