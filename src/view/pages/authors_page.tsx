import Authors from "../widgets/Authors/Authors";
import { useLocation } from 'react-router-dom';
import Header from "../widgets/Header/Header";
import TopSeller from "../widgets/TopSeller/TopSellerOne";
import ModalSearch from "../widgets/Modal/ModalSearch";
import Footer from "../widgets/Footer/Footer";
import ModalMenu from "../widgets/Modal/ModalMenu";
import Scrollup from "../widgets/Scrollup/Scrollup";
import { useEffect, useState } from "react";
import PageNumbers from "../widgets/PageNumbers/PageNumbers";
import RouteHandler, { Routes } from "../../utils/route_handler";
import Breadcrumb from "../widgets/Breadcrumb/Breadcrumb";

const AuthorsPage = () => {
    // Busca el numero de la pagina desde el url params
    let query = new URLSearchParams(useLocation().search);;
    let startingPage = query.get('pn');

    if (startingPage === "0" || startingPage === null) {
        startingPage = "1";
    }

    const [pages, setPages] = useState<number>(0);

    useEffect(() => {}, []);

    return (
        <div className="main">
            <Header />
            <Breadcrumb title="Owners" page="Owners"/>
            <Authors pageNumber={+startingPage} onAmountLoad={(amount) => setPages(amount)} />
            {/* <TopSeller pageNumber={+startingPage}/> */}
            <PageNumbers amountOfPages={pages} currentPage={+startingPage} onPageNumberClicked={
                (pn) => RouteHandler.goToNextPage(Routes.OWNERS, { key: 'pn', value: pn })
            } />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default AuthorsPage;