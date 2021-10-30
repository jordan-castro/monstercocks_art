import AuthorProfile from './widgets/Author/Author';
import Breadcrumb from "./widgets/Breadcrumb/Breadcrumb";
import Footer from "./widgets/Footer/Footer";
import Header from "./widgets/Header/Header";
import ModalMenu from "./widgets/Modal/ModalMenu";
import ModalSearch from "./widgets/Modal/ModalSearch";
import Scrollup from "./widgets/Scrollup/Scrollup";
import { useParams } from 'react-router-dom';

const AuthorPage = (props) => {
    // Chequea el address de la url con useParams
    const { address } = useParams();

    return (
        <div className="main">
            <Header />
            <Breadcrumb title="Author Profile" subpage="Pages" page="Author" />
            <AuthorProfile address={address} />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default AuthorPage;