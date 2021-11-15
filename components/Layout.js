import TopNav from './TopNav';
import Footer from './Footer';
import Banner from './Banner';
import BottomNav from './BottomNav';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function Layout({children}) {
    return(
        <>
            <TopNav />  
            <div className="TopNavClone"></div>
            {children}
            <Footer />
            <br /><br /><br />
            <BottomNav />
            <ToastContainer />
        </>
    )
};
