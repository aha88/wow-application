import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { sessionV, tokenV, userID, userData, customersData } from '../store/authuser';
import axios from 'axios';
import { CCardText } from '@coreui/react';
import RegisterCustomer from './register';
import Swal from 'sweetalert2';

export const Header = ({ data = userData.value }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sData, setData] = useState([]);

  useEffect(() => {
    if (!sessionV.value) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const initializeUser = async () => {
      const storedToken = sessionStorage.getItem('tk');
      const myid = sessionStorage.getItem('id');

      if (storedToken && myid) {
        tokenV.value = storedToken;
        userID.value = myid;
      }
    };

    initializeUser();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!sessionV.value) {
        try {
          const response = await axios.post(
            '/api/user',
            { id: userID.value },
            { headers: { 'x-token': tokenV.value } }
          );
          const user = response.data?.[0]?.data?.[0];
          if (user) {
            userData.value = user;
            sessionV.value = true;
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const signOut = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    sessionV.value = null;
    tokenV.value = null;
    router.push('/');
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    const data = { ...formData, status_id: 1 };
    const token = tokenV.value || sessionStorage.getItem('tk');

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
        setData(customersResponse.data?.data || []);
        customersData.value = customersResponse.data?.data || [];
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

  return (
    <nav className="navbar sticky-bottom bg-body-tertiary px-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          WOW
        </a>
        {sessionV.value ? (
          <CCardText className="text-black">
            <span className="pr-2">{data?.value?.name || 'User'}</span>
            <Button variant="outline-secondary" onClick={signOut}>
              Sign-out
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
      </div>
    </nav>
  );
};
