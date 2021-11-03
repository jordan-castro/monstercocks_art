import React from 'react';
import { useLocation } from 'react-router-dom';
import MonsterCock from '../../models/cock';
import Breadcrumb from '../widgets/Breadcrumb/Breadcrumb';
import Header from '../widgets/Header/Header';
import Explore from '../widgets/Explore/ExploreTwo';
import Scrollup from '../widgets/Scrollup/Scrollup';
import ModalMenu from '../widgets/Modal/ModalMenu';
import ModalSearch from '../widgets/Modal/ModalSearch';
import { fetchCocks, fetchCocksBySearch } from '../../controller/fetch_cocks';
import { Loader } from '../widgets/loader';
import Footer from '../widgets/Footer/Footer';
import PageNumbers from '../widgets/PageNumbers/PageNumbers';
import { cockAmountFromServer } from '../../utils/valid_id';
import pageAmount from '../../utils/page_amount';

export default function ExploreCocksPage() {
    let query = new URLSearchParams(useLocation().search);;
    let startingPage = query.get('pn');
    // Chequea si startingPage esta definida, si no, pone 0
    if (startingPage === null || startingPage === '0') {
        startingPage = '1';
    }
    // Busca si estamos haciendo search
    let search = query.get('s');

    return (
        <ExploreCocksPageBuilder startingPage={+startingPage} search={search}/>
    );
}

class ExploreCocksPageBuilder extends React.Component<
    {
        startingPage: number,
        search: string | null,
    },
    {
        cocks: MonsterCock[],
        isLoading: boolean,
        error: boolean,
        pageNumber: number,
        amountOfPages: number,
    }
> {
    constructor(props) {
        super(props);
        this.state = {
            cocks: [],
            isLoading: true,
            error: false,
            pageNumber: props.startingPage,
            amountOfPages: 0,
        };
    }

    // Fetch los cocks de la pageNumber
    async grabCocks() {
        let cocks: MonsterCock[] = [];
        let amount = 0;
        // Chequea si estamos buscando los cocks desde search
        if (this.props.search !== null) {
            console.log(this.props.search);
            // Busca los cocks
            let response = await fetchCocksBySearch(this.props.search, this.state.pageNumber - 1);
            cocks = response.cocks;
            amount = response.amount;
        } else {
            // Busca los cocks regularmente
            cocks = await fetchCocks(this.state.pageNumber - 1);
            amount = await MonsterCock.getCockCount();
        }
        // Set el state y sube la pageNumber
        this.setState({
            cocks,
            isLoading: false,
            amountOfPages: pageAmount(amount, 20),
            // // Si cocks es una lista empty, error
            // error: cocks.length == 0,
        });
    }
    
    /**
     * Cree el HREF para los page numbers.
     * Chequea si hamos pasado un search, si lo hay, agrega el search al href.
     */
    private createHref = () => {
        let href = '/cocks?';
        if (this.props.search !== null) {
            href += 's=' + this.props.search + "&";
        }
        return href;
    }

    componentDidMount() {
        this.grabCocks();
    }

    render() {
        return (
            // Chequea si esta cargando, si esta cargando, muestra el loading
            // Si no, chequea si hay error, si hay error, muestra el error
            // Si no, muestra el componente
            this.state.isLoading ? (
                <Loader />
            ) : this.state.error ? (
                <div className="error">
                    <h1>Error</h1>
                    <p>
                        There was an error fetching the data.
                    </p>
                </div>
            ) : (
                <div className="main">
                    <Header />
                    <Breadcrumb title="Explore Cocks" subpage="Explore" page="Explore Cocks" />
                    <Explore
                        initData={{
                            preHeading: "Monster Cocks",
                            heading: "Explore",
                            content: "Explore all of your favourite MonsterCocks.",
                            btnText: "Load More"
                        }}
                        cocks={this.state.cocks}
                        pageNumber={this.state.pageNumber}
                    />
                    <PageNumbers
                        currentPage={this.state.pageNumber} 
                        href={this.createHref()}
                        amountOfPages={this.state.amountOfPages}
                    />
                    <Footer />
                    <ModalSearch />
                    <ModalMenu />
                    <Scrollup />
                </div>
            )
        );
    }
}