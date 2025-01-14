import React, { useState } from 'react';
import { CCol, CContainer, CRow, CCardTitle, CCard, CCardBody, CForm, CFormLabel, CFormInput, CFormFeedback, CButton, CCardText } from '@coreui/react';
import { useAtom } from 'jotai';
import { tokenV } from "../../store/authuser";
import companiesService from '@/services/companiesService';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft } from '@coreui/icons';

const CompanyAdd = () => {
    const [tokenValue] = useAtom(tokenV);
    const router = useRouter();

    // Form state
    const [companyData, setCompanyData] = useState({
        name: '',
        registration_number: '',
        email: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    /**
     * Handles input change in form fields.
     */
    const handleChange = (e) => {
        setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    };

    /**
     * Validates the form fields.
     */
    const validateForm = () => {
        let newErrors = {};
        if (!companyData.name) newErrors.name = "Company name is required";
        if (!companyData.registration_number) newErrors.registration_number = "Registration number is required";
        if (!companyData.email) newErrors.email = "Email is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handles form submission.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setMessage('');

        try {
            await companiesService.addCompany(companyData, tokenValue);
            setMessage('Company added successfully!');
            setTimeout(() => router.push('/companies/lists'), 2000);
        } catch (error) {
            setMessage('Error adding company. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='body'>
            <CContainer className='mt-3'>
                <CRow className="mt-5">
                    <CCol md={12} className='mb-3'>
                        <Link href='/companies/lists'>
                                <CIcon customClassName="nav-icon" size='sm' height={25} width={25} icon={cilArrowLeft} /> Back to Company Lists
                        </Link>
                    </CCol>
                    <CCol md={12}>
                        <CCardTitle className='fs-2'>Add Company</CCardTitle>
                    </CCol>
                </CRow>

                <CRow className='mt-4'>
                    <CCol md={12}>
                        <CCard>
                            <CCardBody>
                                <CCardTitle>Company Details</CCardTitle>
                                <CForm onSubmit={handleSubmit} className="mt-3">
                                    <CRow>
                                        {/* Company Name */}
                                        <CCol md={6} className="mt-1">
                                            <CFormLabel>Company Name</CFormLabel>
                                            <CFormInput
                                                type="text"
                                                name="name"
                                                placeholder="Enter company name"
                                                value={companyData.name}
                                                onChange={handleChange}
                                                invalid={!!errors.name}
                                            />
                                            <CFormFeedback invalid>{errors.name}</CFormFeedback>
                                        </CCol>

                                        {/* Registration Number */}
                                        <CCol md={6} className="mt-1">
                                            <CFormLabel>Registration Number</CFormLabel>
                                            <CFormInput
                                                type="text"
                                                name="registration_number"
                                                placeholder="Enter registration number"
                                                value={companyData.registration_number}
                                                onChange={handleChange}
                                                invalid={!!errors.registration_number}
                                            />
                                            <CFormFeedback invalid>{errors.registration_number}</CFormFeedback>
                                        </CCol>

                                        {/* Email */}
                                        <CCol md={6} className="mt-3">
                                            <CFormLabel>Email</CFormLabel>
                                            <CFormInput
                                                type="email"
                                                name="email"
                                                placeholder="Enter company email"
                                                value={companyData.email}
                                                onChange={handleChange}
                                                invalid={!!errors.email}
                                            />
                                        </CCol>
                                        <CCardText><hr/></CCardText>
                                          {/* address */}
                                          <CCol md={12}>
                                            <CFormLabel>Address 1</CFormLabel>
                                            <CFormInput
                                                type="text"
                                                name="address1"
                                                placeholder="Enter company address"
                                                value={companyData.address1}
                                                onChange={handleChange}
                                                invalid={!!errors.address1}
                                            />
                                        </CCol>
                                        <CCol md={12} className="mt-3">
                                            <CFormLabel>Address 2</CFormLabel>
                                            <CFormInput
                                                type="text"
                                                name="address2"
                                                placeholder="Enter company address"
                                                value={companyData.address2}
                                                onChange={handleChange}
                                                invalid={!!errors.address2}
                                            />
                                        </CCol>
                                        <CCol md={6} className="mt-3">
                                            <CFormLabel>City</CFormLabel>
                                            <CFormInput
                                                type="text"
                                                name="city"
                                                placeholder="Enter company city"
                                                value={companyData.city}
                                                onChange={handleChange}
                                                invalid={!!errors.city}
                                            />
                                        </CCol>
                                        <CCol md={6} className="mt-3">
                                            <CFormLabel>States</CFormLabel>
                                            <CFormInput
                                                type="text"
                                                name="states"
                                                placeholder="Enter company states"
                                                value={companyData.states}
                                                onChange={handleChange}
                                                invalid={!!errors.states}
                                            />
                                        </CCol>
                                        <CCardText><hr/></CCardText>
                                        {/* Pic */}
                                        <CCol md={6} >
                                            <CFormLabel>Company Logo</CFormLabel>
                                            <CFormInput
                                                type="file"
                                                name="logo"
                                                placeholder="Enter company email"
                                                value={companyData.email}
                                                onChange={handleChange}
                                                invalid={!!errors.email}
                                            />
                                            <CFormFeedback invalid>{errors.email}</CFormFeedback>
                                        </CCol>
                                    </CRow>

                                    {/* Submit Button */}
                                    <CCol md={12} className="mt-4">
                                        <CButton type="submit" className='float-right' color="primary" disabled={loading}>
                                            {loading ? "Saving..." : "Add Company"}
                                        </CButton>
                                    </CCol>

                                    {/* Status Message */}
                                    {message && <p className="mt-3 text-info">{message}</p>}
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default CompanyAdd;
