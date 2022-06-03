import React, { useState, useEffect } from 'react'
import './BookingModal.css'
import { Modal } from 'reactstrap';
import { getDetailInforDoctor } from '../../../CustomHooks/useFetch';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';



const BookingModal = (props) => {


    let url_Doctor = "http://localhost:8080/api/users/id="

    const [DoctorInfoSchedule, setDoctorInfoSchedule] = useState({})
    useEffect(async () => {
        let responseDoctorInfo = await getDetailInforDoctor(url_Doctor, props.currentDoctorID);
        console.log("gia tri tra ve la ", responseDoctorInfo.data);
        setDoctorInfoSchedule(responseDoctorInfo.data)
    }, [props.currentDoctorID])
    const currentUser = useSelector(state => state.doctor);

    console.log("gia tri thu duoc state la ", DoctorInfoSchedule);
    // toggle={() =>{}}
    return (

        <Modal
            isOpen={props.isOpenModal}
            className={'booking-modal-container'}
            size="lg"
            centered
        >
            <div className='booking-modal-content'>
                <div className='booking-modal-header'>
                    <span className='booking-modal-header-left'>Thông tin đặt lịch khám bệnh</span>
                    <span className='booking-modal-header-right'
                        onClick={props.closeBookingModal}>
                        <i className='fas fa-times'></i>
                    </span>

                </div>
                <div className='booking-modal-body container'>
                    {/* {JSON.stringify(props.dataScheduleTime)} */}
                    <div className='doctor-infor'>

                    </div>
                    <div className='doctor-name'>
                        Bác sỹ khám : <span>
                            
                            {DoctorInfoSchedule && DoctorInfoSchedule.hovaten ?
                             `${DoctorInfoSchedule.allCodePosition.valuevi}, ${DoctorInfoSchedule.allCodeRole.valuevi}  ${DoctorInfoSchedule.hovaten}`
                            : ''}
                            
                            </span>
                    </div>
                    <div className='booking-schedule-price'>
                        Giá khám :
                        <NumberFormat
                            className="currentcy"
                            value={currentUser.extraDoctorInfo ? currentUser.extraDoctorInfo.allCodePrice.valuevi : ''}
                            displayType="text"
                            thousandSeparator={true}
                            suffix={'VNĐ'}
                        />
                    </div>
                    <div className='row '>
                        <div className='col-6 form-group'>
                            <label>Họ tên:</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Số điện thoại:</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Địa chỉ email:</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Địa chỉ liên hệ:</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Lý do khám:</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Đặt cho ai:</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Giới tính:</label>
                            <input className='form-control' />
                        </div>
                    </div>
                </div>
                <div className='booking-modal-footer'>
                    <button className='btn-booking-confirm'>Xác nhận</button>
                    <button className='btn-booking-cancel' onClick={props.closeBookingModal}>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default BookingModal