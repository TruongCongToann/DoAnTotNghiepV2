import React from 'react'
import './MedicalFacility.css'
import Slider from "react-slick";


const MedicalFacility = (props) => {
    return (
        <div className='section-share'>

        <div className='section-medical-facility'>
          <div className='section-container'>
            
            <div className='section-header'>
                <span className='section-title'>Cơ sở y tế nổi bật</span>
                <button className='btn-section'>Xem thêm</button>
            </div>

          <div className='section-body'>
          <Slider {...props.settings}>
            <div className=' section-custom'>
              <div className='bg-img-cosoyte' />
              <div className='section-custom-title' >Bệnh viên đa khoa Ngọc Lặc 1</div>
            </div>
            <div className='section-custom'>
            <div className='bg-img-cosoyte'/>
            <div className='section-custom-title'>Bệnh viên đa khoa Ngọc Lặc 2</div>
            </div>
            <div className='section-custom'>
            <div className='bg-img-cosoyte'/>
            <div className='section-custom-title'>Bệnh viên đa khoa Ngọc Lặc 3</div>
            </div>
            <div className='section-custom'>
            <div className='bg-img-cosoyte'/>
            <div className='section-custom-title'>Bệnh viên đa khoa Ngọc Lặc 4</div>
            </div>
            <div className='section-custom'>
            <div className='bg-img-cosoyte'/>
            <div className='section-custom-title'>Bệnh viên đa khoa Ngọc Lặc 5</div>
            </div>
            <div className='section-custom'>
            <div className='bg-img-cosoyte'/>
            <div className='section-custom-title'>Bệnh viên đa khoa Ngọc Lặc 6</div>
            </div>

            </Slider>
            </div>
            
           </div>
          </div>
      </div>
    )
}

export default MedicalFacility
