import React from 'react'
import './Handbook.css'
import Slider from "react-slick";

const Handbook = (props) => {
    return (
       <div className='section-share'>

        <div className='section-handbook'>
          <div className='section-container'>
            
            <div className='section-header'>
                <span className='section-title'>Cẩm nang</span>
                <button className='btn-section'>Xem thêm</button>
            </div>

          <div className='section-body'>
          <Slider {...props.settings}>
          <div className=' section-custom'>
                 <div className='bg-img-handbook'/>
              <div className='position text-center'>
                <div className='position-custom-title' > Bệnh viện da liễu và cơ sở y tế uy tín tại Hà Nội</div>
              </div>     
            </div>
            <div className=' section-custom'>
                 <div className='bg-img-handbook'/>
              <div className='position text-center'>
                <div className='position-custom-title' > Bệnh viện da liễu và cơ sở y tế uy tín tại Hà Nội</div>
              </div>     
            </div>
            <div className=' section-custom'>
                 <div className='bg-img-handbook'/>
              <div className='position text-center'>
                <div className='position-custom-title' > Bệnh viện da liễu và cơ sở y tế uy tín tại Hà Nội</div>
              </div>     
            </div>
            <div className=' section-custom'>
                 <div className='bg-img-handbook'/>
              <div className='position text-center'>
                <div className='position-custom-title' > Bệnh viện da liễu và cơ sở y tế uy tín tại Hà Nội</div>
              </div>     
            </div>
            <div className=' section-custom'>
                 <div className='bg-img-handbook'/>
              <div className='position text-center'>
                <div className='position-custom-title' > Bệnh viện da liễu và cơ sở y tế uy tín tại Hà Nội</div>
              </div>     
            </div>
            <div className=' section-custom'>
                 <div className='bg-img-handbook'/>
              <div className='position text-center'>
                <div className='position-custom-title' > Bệnh viện da liễu và cơ sở y tế uy tín tại Hà Nội</div>
              </div>     
            </div>
           
    
            </Slider>
            </div>
            
           </div>
          </div>
      </div>  
    );
}

export default Handbook
