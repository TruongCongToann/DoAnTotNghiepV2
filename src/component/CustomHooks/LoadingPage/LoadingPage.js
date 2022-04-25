import React from 'react'
import './loadingPage.css';

import ReactLoading from 'react-loading';

const LoadingPage = () => {
    return (
        <div className='loading-modal'>
            <div className='spinner-loading'>
                <ReactLoading type={'spinningBubbles'} className="loading-img"/>
                <div className='loading-text'>Đang tải dữ liệu trang ...</div>
            </div>
        </div>
    )
}

export default LoadingPage
