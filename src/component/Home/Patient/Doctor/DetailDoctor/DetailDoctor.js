import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import HomeHeader from '../../../Header/HomeHeader';
import {getDetailInforDoctor} from '../../../../CustomHooks/useFetch'

import './detaidoctor.css';
import DoctorSchedule from '../DoctorSchedule/DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
const DetailDoctor = () => {
  let { id } = useParams();
  const [detailDoctor, setdetailDoctor] = useState({});
  const [currentDoctorID, setcurrentDoctorID] = useState(-1)

  const [parentDoctorID, setparentDoctorID] = useState(-1)
const url_MarkDown ="http://localhost:8080/api/markdowns/";
  useEffect( async () => {
    let response = await getDetailInforDoctor(url_MarkDown,id);
    if (response!=null) {
      setdetailDoctor(response.data);
      setcurrentDoctorID(id)
    }
  },[])
  useEffect(() => {
    
  setparentDoctorID(currentDoctorID)
    
  }, [currentDoctorID])
  
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
  
  return (
    <>
       <HomeHeader isShowBanner ={false}/>
       <div className='doctor-detail-container'>
          <div className="intro-doctor">
             {
                 detailDoctor && detailDoctor.user
                 &&
                <div className='content-left' style={{backgroundImage:`url(${detailDoctor.user.image})`}}>
                </div>
               
             }
              <div className='content-right'>
                  <div className='up'>
                  {
                       detailDoctor && detailDoctor.description
                       &&
                        <span>
                           {
                             formatPosition(detailDoctor.user.position)+" , "+detailDoctor.user.hovaten
                          }
                        </span>
                  }
                  </div>
                  <div className='down'>
                    {
                      detailDoctor && detailDoctor.description
                      &&
                      <span>
                          {detailDoctor.description}
                      </span>
                    }
                  </div>
              </div>
          </div>
          <div className='schedule-doctor'>
                <div className='content-left'> 
                   <DoctorSchedule
                   currentDoctorID = {currentDoctorID} />
                 
                </div>
                <div className='content-right'>
                    <DoctorExtraInfo
                    currentDoctorID = {currentDoctorID} 
                    />
                </div>
          </div>
          <div className='chi-tiet-doctor'>
                    {
                      detailDoctor && detailDoctor.contentHTML
                      &&
                      <div dangerouslySetInnerHTML={{__html: detailDoctor.contentHTML}}>
                          
                      </div>
                    }
          </div>
          <div className='comment-doctor'>
              
          </div>
       </div>
    </>
  )
}

export default DetailDoctor