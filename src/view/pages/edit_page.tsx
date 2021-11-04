import Breadcrumb from "../widgets/Breadcrumb/Breadcrumb";
import Create from "../widgets/Create/Create";
import Footer from "../widgets/Footer/Footer";
import Header from "../widgets/Header/Header";
import ModalMenu from "../widgets/Modal/ModalMenu";
import ModalSearch from "../widgets/Modal/ModalSearch";
import Scrollup from "../widgets/Scrollup/Scrollup";

const EditPage = (props) => {
    return (
        <div className="main">
            <Header reload={true}/>
            <Breadcrumb title="Edit" subpage="Authors" page="Edit" />
            <Create />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default EditPage;