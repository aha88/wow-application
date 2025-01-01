import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss'
import '@/styles/mystyle.scss'
import '@/styles/index.scss'
import { Footer } from '@/component/footer';
import  {Header}  from '@/component/header';
import 'bootstrap/dist/css/bootstrap.min.css'
import { userData } from '../store/authuser';
import { useAtom } from 'jotai';

export default function App({ Component, pageProps: { ...pageProps }, }) {

  const [ personDT, setPersonDT] = useAtom(userData);
  
  return <div className='body'>
      <Header data={personDT} />
      <Component {...pageProps} />
      <Footer />
      </div>

}
