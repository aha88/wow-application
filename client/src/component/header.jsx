import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { sessionV, tokenV, userID, userData } from '../store/authuser';
import axios from 'axios';
import { CButton, CCardText, CCollapse, CContainer, CForm, CNav, CNavbar, CNavbarBrand, CNavItem, CNavLink, COffcanvas, COffcanvasBody, COffcanvasHeader, CSidebarNav } from '@coreui/react';
import RegisterCustomer from './register';
import Swal from 'sweetalert2';
import { useAtom } from 'jotai';
import { cilSpeedometer, cilLayers, cilVector,cilMenu} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Cookies from 'js-cookie';
import Link from 'next/link';

export const Header = (data) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState(false)
  const [personDT, setPersonDT] = useAtom(userData);
  const [tokenValue, setTokenV] = useAtom(tokenV);
  const [sessionValue, setSessionV] = useAtom(sessionV);

  useEffect(() => {
    const cookieLive = Cookies.get('token');

    if(!sessionValue && cookieLive ) { 
        router.push('/');
    }
  }, []);
 
  // Handle sign out
  const signOut = () => {
    sessionStorage.clear();
    setSessionV(false);
    setTokenV([]);

    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  // Toggle modal visibility
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Handle form submission
  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    const data = { ...formData, status_id: 1 };
    const token = tokenValue || sessionStorage.getItem('tk');

    try {
      const insertResponse = await axios.post('/api/insert_customer', data, {
        headers: { 'x-token': token },
      });

      if (insertResponse.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Insert successful',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });

        setIsModalOpen(false);

        const customersResponse = await axios.get('/api/customers', {
          headers: { 'x-token': token },
        });
        setPersonDT(customersResponse.data?.data || []);
      }
    } catch (error) {
      console.error('Error inserting customer or fetching data:', error);
    }
  };

  const fields = [
    { id: 'iInput1', type: 'text', name: 'name', placeholder: 'Enter Full Name', label: 'Full Name' },
    { id: 'iInput2', type: 'email', name: 'email', placeholder: 'name2@example.com', label: 'Email address' },
    { id: 'iInput3', type: 'text', name: 'phone', placeholder: '601345632121', label: 'Phone Number' },
    { id: 'iInput4', type: 'text', name: 'national_id', placeholder: '88111111111', label: 'NRIC' },
    { id: 'iInput5', type: 'date', name: 'birth_of_date', placeholder: 'Date', label: 'Birthdate' },
    { id: 'iInput6', type: 'text', name: 'address', placeholder: 'full address here', label: 'Address' },
  ];

  return (<>
      <CNavbar expand="md" className="sticky-bottom bg-body-tertiary px-3">
        <CContainer fluid>
             {sessionValue ? 
                <CCollapse className="navbar-collapse" visible={true}>
                  <CNavLink href="#" active>
                    <CButton onClick={() => setVisible(true)}>  <CIcon customClassName="nav-icon" size='sm' height={25} width={25} icon={cilMenu} /> </CButton>
                  </CNavLink>
                  <CNavLink href="/">
                    <CButton className='text-danger fw-bolder'> WOW</CButton>
                  </CNavLink>
                </CCollapse>
              :
              <CNavLink href="/dashboard/dashboard">
                <CButton className='text-danger fw-bolder'> WOW</CButton>
              </CNavLink>
              
            }
          
          <CForm className="d-flex">
            {sessionValue ? (
              <CCardText className="text-black">
                <span className="pr-2">{personDT.name || 'User'}</span>
                <Button variant="outline-danger" onClick={signOut}>
                  Sign Out
                </Button>
              </CCardText>
            ) : (
              <Button className="mr-1" color="primary" onClick={toggleModal}>
                New Account
              </Button>
            )}
            {isModalOpen && (
              <RegisterCustomer
                onShow={isModalOpen}
                closeShow={toggleModal}
                initialFields={fields}
                handingSubmitCustomer={handleSubmit}
              />
            )}
          </CForm>
        </CContainer>
      </CNavbar>
      <COffcanvas placement="end" visible={visible} onHide={() => setVisible(false)}>
        <COffcanvasHeader>Navigation</COffcanvasHeader>
        <COffcanvasBody>
          <CNav>
            <CSidebarNav>
              <Link href="/dashboard/Dashboard" passHref>
                <CNavItem className="d-flex align-items-center py-2 hover:bg-gray-200">
                  <CIcon customClassName="nav-icon" size="sm" height={50} width={50} icon={cilSpeedometer} /> Dashboard
                </CNavItem>
              </Link>
              <Link href="/companies/lists" passHref>
                <CNavItem className="d-flex align-items-center py-2 hover:bg-gray-200">
                  <CIcon customClassName="nav-icon" size="sm" height={50} width={50} icon={cilVector} /> Companies
                </CNavItem>
              </Link>
              <Link href={`/profile/${data.id}`} passHref>
                <CNavItem className="d-flex align-items-center py-2 hover:bg-gray-200">
                  <CIcon customClassName="nav-icon" size="sm" height={50} width={50} icon={cilLayers} /> Setting
                </CNavItem>
              </Link>
            </CSidebarNav>
          </CNav>
        </COffcanvasBody>
      </COffcanvas>
    </>
  );
};

