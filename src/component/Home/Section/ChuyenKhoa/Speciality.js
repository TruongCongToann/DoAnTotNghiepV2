import React from 'react';
import './Speciality.css';

import Slider from "react-slick";


const section = (props) => {
  
    return (
      <div className='section-share'>

        <div className='section-speciality'>
          <div className='section-container'>
            
            <div className='section-header'>
                <span className='section-title'>  Chuyên khoa phổ biến</span>
                <button className='btn-section'>Xem thêm</button>
            </div>

          <div className='section-body'>
          <Slider {...props.settings}>
            <div className=' section-custom'>
              <div className='bg-img-chuyenkhoa'/>
              <div className='section-custom-title'>Cơ xương khớp 1</div>
            </div>
            <div className='section-custom'>
            <div className='bg-img-chuyenkhoa'/>
            <div className='section-custom-title'>Cơ xương khớp 2</div>
            </div>
            <div className='section-custom'>
            <div className='bg-img-chuyenkhoa'/>
            <div className='section-custom-title'>Cơ xương khớp 3</div>
            </div>
            <div className='section-custom'>
            <div className='bg-img-chuyenkhoa'/>
            <div className='section-custom-title'>Cơ xương khớp 4</div>
            </div>
            <div className='section-custom'>
            <div className='bg-img-chuyenkhoa'/>
            <div className='section-custom-title'>Cơ xương khớp 5</div>
            </div>
            <div className='section-custom'>
            <div className='bg-img-chuyenkhoa'/>
            <div className='section-custom-title'>Cơ xương khớp 6</div>
            </div>

            </Slider>
            </div>
            
           </div>
          </div>
      </div>
      );
}

export default section;