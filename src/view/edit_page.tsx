import React from "react";
import Breadcrumb from "./widgets/Breadcrumb/Breadcrumb";
import Footer from "./widgets/Footer/Footer";
import Header from "./widgets/Header/Header";
import ModalMenu from "./widgets/Modal/ModalMenu";
import ModalSearch from "./widgets/Modal/ModalSearch";
import Scrollup from "./widgets/Scrollup/Scrollup";
import SignupSection from './widgets/Signup/Signup';

class EditPage extends React.Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Edit" subpage="Authors" page="Edit"/>
                <SignupSection />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default EditPage;