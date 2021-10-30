import React from 'react';
import { useLocation } from 'react-router-dom';
import MonsterCock from '../../models/cock';
import Breadcrumb from '../widgets/Breadcrumb/Breadcrumb';
import Header from '../widgets/Header/Header';
import Explore from '../widgets/Explore/ExploreTwo';
import Scrollup from '../widgets/Scrollup/Scrollup';
import ModalMenu from '../widgets/Modal/ModalMenu';
import ModalSearch from '../widgets/Modal/ModalSearch';
import { fetchCocks } from '../../controller/fetch_cocks';
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

    return (
        <ExploreCocksPageBuilder startingPage={+startingPage} />
    );
}

class ExploreCocksPageBuilder extends React.Component<
    {
        startingPage: number,
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
        let cocks = await fetchCocks((this.state.pageNumber - 1));
        // Set el state y sube la pageNumber
        this.setState({
            cocks,
            isLoading: false,
            pageNumber: this.state.pageNumber,
            // Si cocks es una lista empty, error
            error: cocks.length === 0,
        });
    }

    // Busca cuantos paginas hay en total.
    private async getPageAmount() {
        let amount = await cockAmountFromServer();
        
        // Divide the amount by 20 to get the amount of pages.
        let pages = pageAmount(amount, 20);

        this.setState({
            amountOfPages: pages,
        });
    }
    

    componentDidMount() {
        this.grabCocks();
        this.getPageAmount();
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
                        currentPage={this.state.pageNumber} href="/cocks" 
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