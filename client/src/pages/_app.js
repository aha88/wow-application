import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss';
import '@/styles/mystyle.scss';
import '@/styles/index.scss';

import { Footer } from '@/component/footer';
import { Header } from '@/component/header';

import { userData } from '../store/authuser';
import { useAtom } from 'jotai';

export default function App({ Component, pageProps }) {
  const [userDetails, setUserDetails] = useAtom(userData);

  return (
    <>
      <Header data={userDetails} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
