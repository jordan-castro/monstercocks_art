import AuthorProfile from './widgets/Author/Author';
import Breadcrumb from "./widgets/Breadcrumb/Breadcrumb";
import Footer from "./widgets/Footer/Footer";
import Header from "./widgets/Header/Header";
import ModalMenu from "./widgets/Modal/ModalMenu";
import ModalSearch from "./widgets/Modal/ModalSearch";
import Scrollup from "./widgets/Scrollup/Scrollup";
import { useParams, useLocation } from 'react-router-dom';

const AuthorPage = (props) => {
    // Chequea el address de la url con useParams
    const { address } = useParams();
    let query = new URLSearchParams(useLocation().search);;
    let startingPage = query.get('pn');
    // Chequea si startingPage esta definida, si no, pone 0
    if (startingPage === null || startingPage === '0') {
        startingPage = '1';
    }

    return (
        <div className="main">
            <Header />
            <Breadcrumb title="Author Profile" subpage="Pages" page="Author" />
            <AuthorProfile address={address} startingPage={startingPage}/>
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default AuthorPage;