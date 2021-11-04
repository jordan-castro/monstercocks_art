import React from "react";
import { fetchCock } from "../../controller/fetch_cocks";
import MonsterCock from "../../models/cock";
import { CompilerSuggestion } from "../widgets/compiler_suggestion";
import { Loader } from "../widgets/loader";
import { useParams } from 'react-router-dom';
import { fetchOwner, fetchOwners } from "../../controller/fetch_owner";
import Header from "../widgets/Header/Header";
import Breadcrumb from "../widgets/Breadcrumb/Breadcrumb";
import ItemDetails from "../widgets/ItemDetails/ItemDetails";
import Owner from "../../models/owner";
import { cockAmount } from "../../utils/valid_id";
import Transaction from "../../models/transaction";
import { fecthTransactions, fetchCreatorTransaction } from "../../controller/fetch_transactions";
import ModalSearch from "../widgets/Modal/ModalSearch";
import ModalMenu from "../widgets/Modal/ModalMenu";
import Scrollup from "../widgets/Scrollup/Scrollup";

export function CockPage() {
    let { id } = useParams();

    return (
        <CockPageBuilder id={id} />
    );
}

class CockPageBuilder extends React.Component<
    { id?: number },
    {
        cock?: MonsterCock,
        loading: boolean,
        error: boolean,
        totalAmount: number,
    }>
{
    constructor(props) {
        super(props);
        this.state = {
            cock: props.cock,
            loading: true,
            error: false,
            totalAmount: 0,
        };

        this.compilerSuggestion = this.compilerSuggestion.bind(this);
        this.loadData = this.loadData.bind(this);
        this.grabAmount = this.grabAmount.bind(this);
    }

    // Suggestion de compiler
    compilerSuggestion(error?) {
        // Si hay un erro entonces console.log
        if (error) {
            console.log(error);
        }

        this.setState({
            error: true,
            loading: false,
        });
    }

    // Carga el amount de cocks que hay en este momento
    async grabAmount() {
        // Busca el amounto
        const amount = await MonsterCock.getCockCount();
        // Chequea que funciono
        if (amount != -1) {
            this.setState({
                totalAmount: amount - 1
            });
        }
    }

    async loadData() {
        let cock = (this.state.cock as MonsterCock);
        // Busca la informacion
        cock.getTransactions().then(() => this.setState({cock}));
        cock.getOwners().then(() => this.setState({cock}));
        cock.getOwner().then(() => this.setState({cock}));
        cock.getCreator().then(() => this.setState({cock}));
        cock.getSiblings().then(() => this.setState({cock}));
    }

    componentDidMount() {
        // Chequea si cock no existe
        if (this.state.cock === undefined) {
            // Chequea para ID
            if (this.props.id !== undefined) {
                MonsterCock.createCock(this.props.id).then(cock => {
                    // Chequea que no haya error
                    if (cock !== false) {
                        // Cambia el titulo del documento al nombre del cock
                        document.title = cock.name;
                        // Pone el cock
                        this.setState({
                            cock: cock as MonsterCock,
                            loading: false,
                        });
                        this.grabAmount();
                        this.loadData();
                    }
                }).catch(error => { this.compilerSuggestion(error); });
            } else {
                // Suggestion de compiler
                this.compilerSuggestion('No id');
            }
        } else {
            // Ya tenemos un cock!
            this.setState({
                loading: false,
                error: false
            });
        }
    }

    render() {
        return (
            this.state.loading
                ? <Loader />
                : this.state.error
                    ? <CompilerSuggestion />
                    : <>
                        <Header />
                        <Breadcrumb
                            title={this.state.cock?.name}
                            subpage="Cocks"
                            page={this.state.cock?.name}
                        />
                        <ItemDetails
                            cock={this.state.cock}
                            owner={this.state.cock?.owner}
                            totalAmount={this.state.totalAmount}
                            transactions={this.state.cock?.transactions}
                            owners={this.state.cock?.owners}
                            siblings={this.state.cock?.siblings}
                            creator={this.state.cock?.creator}
                        />
                        <ModalSearch />
                        <ModalMenu />
                        <Scrollup />
                    </>
        );
    }
}