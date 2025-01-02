import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/icons/css/all.min.css';
import '@/styles/globals.scss';
import '@/styles/mystyle.scss';
import '@/styles/index.scss';
import { Footer } from '@/component/footer';
import { Header }  from '@/component/header';
import { Sidebar } from '@/component/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { sessionV, userData } from '../store/authuser';
import { useAtom } from 'jotai';

export default function App({ Component, pageProps: { ...pageProps }, }) {

  const [ personDT, setPersonDT] = useAtom(userData);
  const [sessionValue] = useAtom(sessionV);
  

  if(sessionValue == true ) {
    return (<div className='body'>
      <Header data={personDT} className='absolute-position' />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <Component {...pageProps} />
        </div>
      </div><Footer />
      </div>)
  }else{
    return (<div className='body'>
      <Header data={personDT} />
      <Component {...pageProps} />
      <Footer />
      </div>)
  }

}
