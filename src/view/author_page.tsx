import React from "react";
import AuthorProfile from './widgets/Author/Author';
import Breadcrumb from "./widgets/Breadcrumb/Breadcrumb";
import Footer from "./widgets/Footer/Footer";
import Header from "./widgets/Header/Header";
import ModalMenu from "./widgets/Modal/ModalMenu";
import ModalSearch from "./widgets/Modal/ModalSearch";
import Scrollup from "./widgets/Scrollup/Scrollup";

export default class AuthorPage extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Author Profile" subpage="Pages" page="Author" />
                <AuthorProfile />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}