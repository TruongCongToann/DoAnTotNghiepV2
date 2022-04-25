import React from 'react'
import './HomeFooter.css'
const HomeFooter = () => {
    return (
        <div className='home-footer'>
            <p>&copy;2021 Trương Công Toàn Bách Khoa Hà Nội <br/>
            {/* target='_blank' de giup khi ket noi link no mo ra tab moi */}
                <div className='more-info' >   More Information , please follow me in GitHub
                    <a target='_blank' href='https://github.com/TruongCongToan' >
                    <i className="fab fa-github-square"></i>
                 </a>
                </div>
            </p>
        </div>
    )
}

export default HomeFooter
