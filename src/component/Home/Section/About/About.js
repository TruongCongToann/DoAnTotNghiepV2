import React from 'react'
import './About.css'
const About = () => {
    return (
 
          <div className='section-about'>
                <div className='section-about-header'>
                    Giới thiệu về ứng dụng của chúng tôi
               </div>
               <div className='section-about-content'>
                   <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/np8A_aW7Pew" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>                   
                   </div>
                   <div className='content-right'>
                       <p>
                       &emsp;  Nói chung Redux khá là phổ biến. Tuy nhiên, không phải tất cả chúng ta đều biết nó là gì và cách sử dụng nó ra sao. Trong bài này, chúng ta sẽ xem vài lý do tại sao nên sử dụng redux bằng cách phân tích những lợi ích mà nó mang lại và cách hoạt động của nó....
                       </p>
                   </div>
               </div>
          </div>

   
    )
}

export default About
