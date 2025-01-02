import React, { useMemo } from 'react';
import { CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowThickRight } from '@coreui/icons';


const MyCounter = ({title,number, btn, classColorName, mdSize}) => {
  return (
    <CCol md={mdSize} >
      <div className={`boxcontainer-opacity bg-white-border p-2 ${classColorName}`}>
        <>
          <>{title}</>
          <h2>{number}</h2>
        </>
        {btn ?
        <>
        <div className='border-top-1 text-right p-2 d-flex flex-row-reverse'>
          <a className='text-right'><small>View More <CIcon icon={cilArrowThickRight} size="sm" /> </small></a>
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
