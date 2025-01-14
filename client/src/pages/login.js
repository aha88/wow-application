"use client";

import React, { useState,useEffect } from 'react';
import { CButton, CCardTitle, CCol, CForm, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react';
import Joi from 'joi';
import { useRouter } from 'next/router';
import axios from 'axios';
import { tokenV, userData, userID, sessionV } from "../store/authuser";
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import Image from 'next/image';
import logo from '../assets/logo.jpeg';
import { cilUser, cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: 'aizat@email.com', password: 'aizat' });
  const [validationError, setValidationError] = useState('');
  const [apiError, setApiError] = useState('');
  const [personDT, setPersonDT] = useAtom(userData);
  const [userIdentifier, setUserIdentifier] = useAtom(userID);
  const [token, setToken] = useAtom(tokenV);
  const [sessionValue, setSessionActive] = useAtom(sessionV);
 

  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    password: Joi.string().min(4).required().label('Password'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData);
    if (error) {
      setValidationError(error.details[0].message);
      return;
    }

    try {
      setValidationError('');
      setApiError('');

      const response = await axios.post('/api/login', formData);
      const { token, userID, user } = response.data;

      // Update state
      setSessionActive(true);
      setToken(token);
      setUserIdentifier(userID);
      setPersonDT(user);

      // Store in sessionStorage
      sessionStorage.setItem('tk', token);
      sessionStorage.setItem('session', true);
      sessionStorage.setItem('id', userID);

      Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'Strict' });

      setTimeout(async () => {
        await router.push('./dashboard/dashboard');
      }, 100);
    
    } catch (err) {
      console.error('Login request error:', err);
      setApiError(err.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (sessionValue) {
      router.push('./dashboard/dashboard');
    }
  }, []);
 

  return (
    <div className='body'>
      <div className='box-container text-black'>
        <>
          <Image src={logo} alt='logo' width={100} height={100} />
          <div>
            <small><i>Empowering Wellness,Transforming Lives</i></small>
          </div>
        </>
        <hr/>

        <CCardTitle className='text-black mt-4 mb-3'>Login</CCardTitle>

        {/* Display validation or API errors */}
        {validationError && <p className="text-danger">{validationError}</p>}
        {apiError && <p className="text-danger">{apiError}</p>}

        <CForm onSubmit={handleSubmit}>
          <CCol className='my-1'>
            <CInputGroup className='flex-nowrap"'>

              <CInputGroupText id="loging-wrapping">
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                type='email'
                name='email'
                aria-description='login-wrapping'
                value={formData.email}
                placeholder='email@email.com'
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
          <CCol className='my-1'>
            <CInputGroup className='flex-nowrap'>
              <CInputGroupText  id="password-wrapping">
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type='password'
                name='password'
                aria-description='password-wrapping'
                placeholder='****'
                value={formData.password}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
          <CCol>
            <CCardTitle className='text-black float-right fw-1 fs-6 my-1'>Forgot Password</CCardTitle>
          </CCol>
          <CCol>
            <CButton type='submit' color='primary' className='mb-3'>
              Sign in
            </CButton>
          </CCol>
        </CForm>
      </div>
    </div>
  );
}
