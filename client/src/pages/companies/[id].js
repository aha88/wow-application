import companiesService from '@/services/companiesService';
import { CCol, CContainer, CRow,CCardTitle  } from '@coreui/react';
import React, {useState, useEffect} from 'react';
import { tokenV,compUser } from "../../store/authuser";
import { useAtom } from 'jotai';

const Companyid = ({ userOne }) => {
    const [tokenValue] = useAtom(tokenV);
    const [compUserValue, setCompUserValue] = useAtom(compUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCompanyData = async () => {
                setLoading(true);
                try {
                    const companiesData = await companiesService.fetchCompanyID(tokenValue,userOne);
                    setCompUserValue(companiesData.data[0]);
                    console.log(companiesData)
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
        };

        fetchCompanyData();
    }, []);
    

    return (<>
        <div className='body'>
            <CContainer className='mt-3'>
                <CRow className='mt-3'>
                    <CCol md={12}>
                        <CCardTitle> 
                                {compUserValue.name}
                                 <small>{compUserValue.registration_number}</small>
                        </CCardTitle>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    </>)
}

export default Companyid;

export const getServerSideProps = async ({ params }) => {
    const id = params.id;

    return {
        props: { userOne: id },
    }

} 