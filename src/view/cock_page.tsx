import React from "react";
import { fetchCock } from "../controller/fetch_cocks";
import MonsterCock from "../models/cock";
import { CompilerSuggestion } from "./widgets/compiler_suggestion";
import { Loader } from "./widgets/loader";
import { useParams } from 'react-router-dom';
import { fetchOwner, fetchOwners } from "../controller/fetch_owner";
import './css/cock_page.css';
import Header from "./widgets/Header/Header";
import Breadcrumb from "./widgets/Breadcrumb/Breadcrumb";
import ItemDetails from "./widgets/ItemDetails/ItemDetails";
import Owner from "../models/owner";
import { cockAmount } from "../utils/valid_id";
import Transaction from "../models/transaction";
import { fecthTransactions, fetchCreatorTransaction } from "../controller/fetch_transactions";
import ModalSearch from "./widgets/Modal/ModalSearch";
import ModalMenu from "./widgets/Modal/ModalMenu";
import Scrollup from "./widgets/Scrollup/Scrollup";

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
        owner?: Owner,
        totalAmount: number,
        transactions?: Transaction[],
        owners?: Owner[],
        siblings?: {
            previous?: MonsterCock,
            next?: MonsterCock
        },
        creator?: Transaction,
    }>
{
    constructor(props) {
        super(props);
        this.state = {
            cock: props.cock,
            loading: true,
            error: false,
            totalAmount: 0,
            siblings: {
                previous: undefined,
                next: undefined,
            },
        };
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

    // Carga el dueno del cock.
    async grabOwners() {
        // Busca el owner
        const owner = await fetchOwner((this.state.cock as MonsterCock).id);
        // Busca los owners 
        const owners = await fetchOwners((this.state.cock as MonsterCock).id);
        // Pon la data si no hay error con owner
        if (owner !== false) {
            this.setState({
                owner: owner,
                owners: owners,
            });
        }
    }

    // Load the transactions for the coc
    async loadTransactions() {
        const transactions = await fecthTransactions((this.state.cock as MonsterCock).id);
        this.setState({
            transactions
        });
    }

    // Carga el amount de cocks que hay en este momento
    async grabAmount() {
        // Busca el amounto
        const amount = await cockAmount();
        // Chequea que funciono
        if (amount != -1) {
            this.setState({
                totalAmount: amount - 1
            });
        }
    }

    // Busca el creador del cock.
    async grabCreator() {
        // Fecth el creador
        const creator = await fetchCreatorTransaction((this.state.cock as MonsterCock).id);
        // Chequea que no haya error
        if (creator !== false) {
            this.setState({
                creator
            });
        }
    }

    // Fetch previos and next cock based on the current cock id.
    async fetchSiblings() {
        // Toma los ids
        const previousId = (this.state.cock as MonsterCock).id - 1;
        const nextId = (this.state.cock as MonsterCock).id + 1;
        const siblings: {
            previous?: MonsterCock;
            next?: MonsterCock;
        } = {};

        // Chequea si previos id es mas o igual a 0
        if (previousId >= 0) {
            // Toma el previo
            const previousCock = await fetchCock(previousId);
            // Chequea que no haya error
            if (previousCock !== false) {
                // Pone el previo
                siblings.previous = (previousCock as MonsterCock);
            }
        }

        // Chequea si next es menos el cock amount
        if (nextId < this.state.totalAmount) {
            // Toma el next
            const nextCock = await fetchCock(nextId);
            // Chequea que no haya error
            if (nextCock !== false) {
                // Pone el next
                siblings.next = (nextCock as MonsterCock);
            }
        }


        // Ponemos los cocks
        this.setState({
            siblings: siblings
        });
    }

    componentDidMount() {
        // Chequea si cock no existe
        if (this.state.cock === undefined) {
            // Chequea para ID
            if (this.props.id !== undefined) {
                // Carga el cock
                fetchCock(this.props.id).then((cock) => {
                    if (cock === false) {
                        // Suggestion de compiler
                        this.compilerSuggestion('No cock');
                    } else {
                        // Tenemos un cock!
                        this.setState({
                            loading: false,
                            error: false,
                            cock: cock
                        });
                        // Carga el owners
                        this.grabOwners();
                        // Busca transacciones
                        this.loadTransactions();
                        // Busca amounto
                        this.grabAmount().then(() => {
                            // Busca previos y next
                            this.fetchSiblings();
                        });
                        this.grabCreator();
                    }
                }
                ).catch((error) => this.compilerSuggestion(error));
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
                            owner={this.state.owner}
                            totalAmount={this.state.totalAmount}
                            transactions={this.state.transactions}
                            owners={this.state.owners}
                            siblings={this.state.siblings}
                            creator={this.state.creator}
                        />
                        <ModalSearch />
                        <ModalMenu />
                        <Scrollup />
                    </>
        );
    }
}