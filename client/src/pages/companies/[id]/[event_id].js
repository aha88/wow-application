import CIcon from '@coreui/icons-react';
import { CCardTitle, CCol, CRow, CContainer} from '@coreui/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { cilArrowLeft} from '@coreui/icons';


const EventID = ({evenyone}) => {

    return (
        <div className='body'>
            <CContainer className='mt-3'>
                <CRow className="mt-5">
                    <CCol md={12} className='mb-3'>
                        <Link href='/companies/lists'> <CIcon customClassName="nav-icon" size='sm' height={25} width={25} icon={cilArrowLeft} />
                                Back to Company Lists
                         </Link>
                    </CCol>
                    <CCol md={12}>
                        <CCardTitle className='fs-2'>Event Information</CCardTitle>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}

export default EventID;