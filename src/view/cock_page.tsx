import React from "react";
import { cockAmount, fetchCock } from "../controller/fetch_cocks";
import MonsterCock from "../models/cock";
import AttributesWidget from "./widgets/attributes/attributes";
import { CompilerSuggestion } from "./widgets/compiler_suggestion";
import { Loader } from "./widgets/loader";
import { useParams } from 'react-router-dom';
import { CockCard } from "./widgets/cocks/cock_card";
import fetchOwner from "../controller/fetch_owner";
import './css/cock_page.css';
import { Banner } from "./widgets/side_banner/banner";
import Header from "./widgets/Header/Header";
import Breadcrumb from "./widgets/Breadcrumb/Breadcrumb";
import ItemDetails from "./widgets/ItemDetails/ItemDetails";

export function CockPage() {
    var { id } = useParams();

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
        owner: string,
        totalAmount: number,
    }>
{
    constructor(props) {
        super(props);
        this.state = {
            cock: props.cock,
            loading: true,
            error: false,
            owner: 'Loading...',
            totalAmount: 0,
        };
    }

    compilerSuggestion() {
        this.setState({
            error: true,
            loading: false,
        });
    }

    async grabOwner() {
        // Busca el owner
        const owner = await fetchOwner((this.state.cock as MonsterCock).id);
        // Chequea si no es falso
        if (owner !== false) {
            this.setState({
                owner
            });
        }
    }

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

    componentDidMount() {
        // Chequea si cock no existe
        if (this.state.cock === undefined) {
            // Chequea para ID
            if (this.props.id !== undefined) {
                // Carga el cock
                fetchCock(this.props.id).then((cock) => {
                    if (cock === false) {
                        // Suggestion de compiler
                        this.compilerSuggestion();
                    } else {
                        // Tenemos un cock!
                        this.setState({
                            loading: false,
                            error: false,
                            cock: cock
                        });
                        // Busca owner
                        this.grabOwner();
                        // Busca amounto
                        this.grabAmount();
                    }
                }
                ).catch((error) => this.compilerSuggestion());
            } else {
                this.compilerSuggestion();
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
                            dateCreated='Today'
                        />

                    </>
            // <div className="cock-row">
            //     <div className="cock-col">
            //         <CockCard
            //             cock={(this.state.cock as MonsterCock)}
            //             main={true}
            //         />
            //         <AttributesWidget
            //             attributes={(this.state.cock as MonsterCock).attributes}
            //         />
            //     </div>
            //     <Banner
            //         owner={this.state.owner}
            //         cock={(this.state.cock as MonsterCock)}
            //     />
            // </div>
        );
    }
}