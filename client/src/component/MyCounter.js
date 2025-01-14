import React, { useMemo } from 'react';
import { CCardTitle, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowThickRight } from '@coreui/icons';
import Link from 'next/link';


const MyCounter = ({title,number, btn, classColorName, mdSize}) => {
  return (
    <CCol md={mdSize} >
      <div className={`boxcontainer-opacity bg-white-border p-2 ${classColorName}`}>
        <>
          <CCardTitle className='border-bottom-0 lh-1'>{title}</CCardTitle>
          <h2>{number}</h2>
        </>
        
      </div>
  </CCol>
)
};

export default MyCounter;
