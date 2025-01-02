import companiesService from '@/services/companiesService';
import { CCol, CContainer, CRow,CCardTitle  } from '@coreui/react';
import React, {useState, useEffect} from 'react';
import { tokenV,compUser } from "../../store/authuser";
import { useAtom } from 'jotai';

const Company = () => {
    const [tokenValue] = useAtom(tokenV);
    const [compUserValue, setCompUserValue] = useAtom(compUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

   
    

    return (<>
        <div className='body'>
            <CContainer className='mt-3'>
                <CRow className='mt-3'>
                    <CCol md={12}>
                        <CCardTitle> 
                            All Companies
                        </CCardTitle>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol>
                        Table
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    </>)
}

export default Company;
 