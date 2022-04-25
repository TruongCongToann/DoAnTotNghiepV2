import React from 'react'
import HeaderHome from './Header/HomeHeader'
import Speciality from './Section/ChuyenKhoa/Speciality'
import MedicalFacility from './Section/CoSoYTe/MedicalFacility'
import OutStandingDoctor from './Section/BacSyNoiBat/OutStandingDoctor'
import Hanbook from './Section/CamNang/Handbook'
import About from './Section/About/About'
import HomeFooter from '../Home/Footer/HomeFooter'
import './Home.css'



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeHeader from './Header/HomeHeader'

const Home = () => {

      //connect voi redux , lay ra du lieu
      let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      
      };

    return (
     
        <div>
          
                <HomeHeader isShowBanner ={true}/>
                <Speciality settings={settings}/>
                <MedicalFacility settings={settings}/>
                <OutStandingDoctor settings={settings}/>
                <Hanbook settings={settings}/>
                <About />
                <HomeFooter/>
      
               
                
                
        </div>
    
    )
}

export default Home
