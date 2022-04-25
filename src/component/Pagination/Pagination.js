import React from 'react'
import './Pagination.css'
const Pagination = ({userPerPage,totalUsers,paginate}) => {

    const pageNumber = [];
    for (let i = 1; i <=Math.ceil(totalUsers/userPerPage); i++) {
       pageNumber.push(i);
        
    }
const paginateChange = (number) =>{
    paginate(number);
}
  
    return (
        <nav>
      <ul className='pagination'>
        {pageNumber.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginateChange(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    )
}

export default Pagination
