import React, { useEffect } from "react";
import Breadcrumb from "../widgets/Breadcrumb/Breadcrumb";
import Create from "../widgets/Create/Create";
import Footer from "../widgets/Footer/Footer";
import Header from "../widgets/Header/Header";
import ModalMenu from "../widgets/Modal/ModalMenu";
import ModalSearch from "../widgets/Modal/ModalSearch";
import Scrollup from "../widgets/Scrollup/Scrollup";
import SignupSection from '../widgets/Signup/Signup';
import { useWeb3React } from "@web3-react/core";
import { injected, isConnected, stopConnecting } from "../../utils/connect_wallet";

const EditPage = (props) => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    return (
        <div className="main">
            <Header />
            <Breadcrumb title="Edit" subpage="Authors" page="Edit" />
            <Create active={active} account={account} activate={activate}/>
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default EditPage;