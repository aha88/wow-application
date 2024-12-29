import React, { useMemo } from 'react';
import { CCol } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, fad, fass, fasds } from '@awesome.me/kit-KIT_CODE/icons'

const MyCounter = ({title,number, btn}) => {
  return (
    <CCol md={3} >
      <div className=' boxcontainer bg-white-border p-2'>
        <div className='top'>
          <h5>{title}</h5>
          <h2>{number}</h2>
        </div>
        {btn ?
        <>
        <div className='border-top-1 text-right p-2 d-flex flex-row-reverse'>
          <a className='text-right'><small>View More <FontAwesomeIcon icon={fad}/></small></a>
        </div>
        </>
        :
        ''
      }
      </div>
  </CCol>
)
};

export default MyCounter;
