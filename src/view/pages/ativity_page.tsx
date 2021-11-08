import Activity from "../widgets/Activity/Activity";
import Breadcrumb from "../widgets/Breadcrumb/Breadcrumb";
import Footer from "../widgets/Footer/Footer";
import Header from "../widgets/Header/Header";
import ModalMenu from "../widgets/Modal/ModalMenu";
import ModalSearch from "../widgets/Modal/ModalSearch";
import Scrollup from "../widgets/Scrollup/Scrollup";
import { useLocation } from 'react-router-dom';

const ActivityPage = () => {
    // Busca el numero de la pagina desde el url params
    let query = new URLSearchParams(useLocation().search);;
    let startingPage = query.get('pn');
    
    if (startingPage === "0" || startingPage === null) {
        startingPage = "1";
    }

    return (
        <div className="main">
            <Header />
            <Breadcrumb title="Activity" page="Activity" />
            <Activity page={+startingPage}/>
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default ActivityPage;