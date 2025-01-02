import React, {useState, useEffect} from 'react';
import { Button, Card, CardBody, CardText, Col, Container, Row } from 'react-bootstrap'
import { useRouter } from 'next/router';
import axios from 'axios';
import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CContainer, CForm, CFormFloating, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import Swal from 'sweetalert2';
import { userData, tokenV } from "../../store/authuser";
import { useAtom } from 'jotai';

const Customer = ({ userOne }) => {
    const [model, setModel] = useState(false);
    const [formData, setFormData] = useState([]);
    const [errorM, setErrorM] = useState('');


    const [personDT] = useAtom(userData);
    const [tokenValue] = useAtom(tokenV);
    

    const router = useRouter();
 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
      };

    const handleUpdate = async(e) => {
        e.preventDefault();
            setErrorM('');  
          
            console.log(formData)
            const token = tokenValue;

            await axios.post('/api/updateuser',formData, {
                headers: {
                    'x-token': token,
                }
            }).then((dt) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                      setModel(false);
                    }
                  });

                  customerData.value = [formData];

                if(dt.status == 200){
                    return (Toast.fire({
                            icon: "success",
                            title: "Update in successful"
                          })
                        )
                }else{
                    Toast.fire({
                        icon: "fail",
                        title: "Update in unsuccessful"
                      })
                }
            })
    }


    
    if(personDT == null) {  
        return (<CContainer className='mt-3'>
            <CRow className='mt-5 mb-5'>
                Loading...
            </CRow>
            </CContainer>)
    }else{
        return (
            <div className='body'>
                <CContainer className='mt-3'>
                    <CRow className='mt-3'>
                        <CCardTitle>User Details </CCardTitle>
                    </CRow>

                    <CRow className='mt-3'>
                        <CCard className='p-0 cardbox'>
                            <CCardHeader variant='clear'>
                                <CButton className='float-right' color='primary'onClick={() => setModel(!model)} variant='outline'>Edit</CButton>
                            </CCardHeader>
                            <CCardBody>
                           
                                <CCardTitle>User</CCardTitle>
                                
                                <CRow className='mt-3'>
                                    <CCol> <CardText className='detail_label'>Name</CardText> {personDT.name}</CCol>

                                </CRow>

                                <hr/>

                                <CCardTitle>Access</CCardTitle>
                                
                                <CRow className='mt-3'>
                                    <CCol className='mt-2'> <CardText className='detail_label'>Email</CardText> {personDT.email}</CCol>
                                     <CCol className='mt-2' sm={12} md={4}> <CardText className='detail_label'>Status</CardText> {personDT.status?.status_name}</CCol> 
                                     <CCol className='mt-2' sm={12} md={4}> <CardText className='detail_label'>Role</CardText> {personDT.role?.role_name}</CCol>
                                </CRow>
                                
                            </CCardBody>
                        </CCard>
                    </CRow>

                    {/* model edit */}
                    <CModal
                        visible={model}
                        onClose={() => setModel(false)}
                        aria-labelledby="UpdateDate"
                        className='text-black'
                         backdrop="static"
                         size="xl"
                        >
                        <CModalHeader>
                            {/* <CModalTitle id="UpdateDate">Update Info: {activeCustomer.data[0].name}</CModalTitle> */}
                        </CModalHeader>
                      
                        <CForm onSubmit={e=> handleUpdate(e)}>
                            <CModalBody>
                            {errorM && <p style={{ color: 'red' }}>{errorM}</p>}

                                <CRow>
                                    <CCol md={6} className='mt-1'>
                                        <CFormFloating>
                                            <CFormInput type="text" id="floatingInput" onChange={handleInputChange} value={formData.name??personDT.name} placeholder="Muhammad Waiz" name='name' />
                                            <CFormLabel htmlFor="floatingInput">Name</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md={6} className='mt-1'>
                                        <CFormFloating>
                                            <CFormInput type="email" id="floatingInput" onChange={handleInputChange} value={formData.email??personDT.email} placeholder="waiz@email.com" name='email' />
                                            <CFormLabel htmlFor="floatingInput">Email</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                   
                               
                                    
                                    <CCol md={6} className='mt-1'>
                                        <CFormFloating>
                                            <CFormSelect onChange={handleInputChange} value={formData.role_id??personDT.role_id} name='role_id' 
                                            options={[
                                                'Select Option',
                                                { label: 'Approved', value: '1' },
                                                { label: 'Pending', value: '2' },
                                                { label: 'Rejected', value: '3' }
                                              ]} />
                                            <CFormLabel htmlFor="floatingInput">Status</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md={6} className='mt-1'>
                                        <CFormFloating>
                                            <CFormSelect onChange={handleInputChange} value={formData.status_id??personDT.status} name='status_id' 
                                            options={[
                                                'Select Option',
                                                { label: 'Approved', value: '1' },
                                                { label: 'Pending', value: '2' },
                                                { label: 'Rejected', value: '3' }
                                              ]} />
                                            <CFormLabel htmlFor="floatingInput">Status</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    
                                    <CFormInput type="hidden" onChange={handleInputChange} value={userOne} name='id' />
                                </CRow>
                                
                            </CModalBody>
                            <CModalFooter>
                                <CButton type='button' color="secondary" onClick={() => setModel(false)}>
                                Close
                                </CButton>
                                <CButton type='submit' color="primary">Save changes</CButton>
                            </CModalFooter>
                        </CForm>
                    </CModal>


                </CContainer>
            </div>
        )
    }
}

export default Customer;

export const getServerSideProps = async ({  params }) => {

    const id = params.id;


    return {
        props: { userOne: id },
    }

}