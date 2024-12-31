import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { sessionV, tokenV, userID, userData } from '../store/authuser';
import axios from 'axios';
import { CCardText } from '@coreui/react';
import RegisterCustomer from './register';
import Swal from 'sweetalert2';
import { useAtom } from 'jotai';

const Header = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [personDT, setPersonDT] = useAtom(userData);
  const [personID] = useAtom(userID);
  const [tokenValue, setTokenV] = useAtom(tokenV);
  const [sessionValue, setSessionV] = useAtom(sessionV);

  // Redirect to home if session or token is not present
  useEffect(() => {
    if (!sessionValue || !tokenValue) {
      router.push('/');
    }
  }, [sessionValue, tokenValue, router]);

  // Handle sign out
  const signOut = () => {
    sessionStorage.clear();
    setSessionV(null);
    setTokenV(null);

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

  return (
    <nav className="navbar sticky-bottom bg-body-tertiary px-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          WOW
        </a>
        {sessionValue ? (
          <CCardText className="text-black">
            <span className="pr-2">{personDT.name || 'User'}</span>
            <Button variant="outline-secondary" onClick={()=> signOut}>
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

export default Header;
