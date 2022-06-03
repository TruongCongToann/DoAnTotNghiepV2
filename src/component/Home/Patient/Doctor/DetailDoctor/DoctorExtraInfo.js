import React, { useState, useEffect } from 'react'
import { getDetailInforDoctor } from '../../../../CustomHooks/useFetch';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';


import './DoctorExtraInfo.css'
import allAction from '../../../../../redux/actions/allAction';
const DoctorExtraInfo = (props) => {
    const url_DoctorInfo = 'http://localhost:8080/api/doctorinfo/';
    const [isShowDetailInfo, setisShowDetailInfo] = useState(false)
    const [extraInfo, setextraInfo] = useState({})
    const dispatch = useDispatch();


    useEffect(async () => {

        let responseDoctorInfo = await getDetailInforDoctor(url_DoctorInfo, props.currentDoctorID);
        setextraInfo(responseDoctorInfo)
        dispatch(allAction.addExtraDoctor.addExtraDoctor(responseDoctorInfo.data));


    }, [props.currentDoctorID])
   


    const showDetailInfo = () => {
        setisShowDetailInfo(!isShowDetailInfo)
    }

    //format payment
    const formatPayment = (input) => {
        if (input === "PAY1") {
            return "Tiền mặt";
        } else if (input === "PAY2") {
            return "Thẻ ATM"
        } else {
            return "Tiền mặt và thẻ ATM";
        }
    }


    return (


        <div className='doctor-extra-info-container'>
            {/* {console.log("gia tri thu duoc ", extraInfo.data)} */}

            {
                extraInfo.data ?
                    <div className='content-body-extra'>
                        <div className='content-up-extra'>
                            <div className='text-address'>
                                ĐỊA CHỈ KHÁM
                            </div>

                            <div className='name-clinic'>{extraInfo && extraInfo.data ? extraInfo.data.nameclinic : ''}</div>
                            <div className='detail-address'>{extraInfo && extraInfo.data ? extraInfo.data.addressclinicid : ''}</div>
                            {isShowDetailInfo === false &&
                                <div>
                                    GIÁ KHÁM: <NumberFormat
                                                className="currentcy"
                                                value={extraInfo && extraInfo.data ? extraInfo.data.allCodePrice.valuevi : ''}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={'VNĐ'}
                                            />
                                    {" "} VNĐ {"  "}
                                    <span onClick={() => showDetailInfo()} className='detail-btn' >Xem chi tiết</span>

                                </div>
                            }

                        </div>
                        {isShowDetailInfo === true &&
                            <div className='content-down-extra'>
                                <div className='title-price'>GIÁ KHÁM</div>

                                <div className='detail-info'>
                                    <div className='price'>
                                        <span className='left'>
                                            Giá khám
                                        </span>
                                        <span className='right'>
                                            <NumberFormat
                                                className="currentcy"
                                                value={extraInfo && extraInfo.data ? extraInfo.data.allCodePrice.valuevi : ''}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={'VNĐ'}
                                            />
                                            {/* {extraInfo && extraInfo.data ? extraInfo.data.allCodePrice.valuevi: ''} {"  VNĐ"} */}
                                        </span>
                                    </div>
                                    <div className='note'>
                                        {extraInfo && extraInfo.data ? extraInfo.data.note : ''}
                                    </div>

                                </div>

                                <div className='payment'>
                                    Người bệnh có thể thanh toán chi phí bằng hình thức: {extraInfo && extraInfo.data ? formatPayment(extraInfo.data.allCodePayment.key) : ''}
                                    <div className='hide-payment'>
                                        <span onClick={() => showDetailInfo()} className='detail-btn'>Ẩn bảng giá</span>


                                    </div>
                                    <div />
                                </div>

                            </div>
                        }
                    </div>
                    :
                    <>
                        <div className='text-address-no-clinic'>
                            ĐỊA CHỈ KHÁM
                        </div>
                        <div className='no-clinic'>

                            Thông tin về địa chỉ phòng khám tạm thời chưa có , vui lòng quay lại sau  !

                        </div>
                    </>
            }
        </div>



    )
}

export default DoctorExtraInfo