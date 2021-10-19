import React from "react";
import { fetchCock } from "../controller/fetch_cocks";
import MonsterCock from "../models/cock";
import AttributesWidget from "./widgets/attributes/attributes";
import { CompilerSuggestion } from "./widgets/compiler_suggestion";
import { Loader } from "./widgets/loader";
import { useParams } from 'react-router-dom';
import { CockCard } from "./widgets/cocks/cock_card";
import fetchOwner from "../controller/fetch_owner";
import './css/cock_page.css';
import { Banner } from "./widgets/side_banner/banner";

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
    }>
{
    constructor(props) {
        super(props);
        this.state = {
            cock: props.cock,
            loading: true,
            error: false,
            owner: 'Loading...',
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
                    :
                    <div className="cock-row">
                        <div className="cock-col">
                            <CockCard
                                cock={(this.state.cock as MonsterCock)}
                                main={true}
                            />
                            <AttributesWidget
                                attributes={(this.state.cock as MonsterCock).attributes}
                            />
                        </div>
                        <Banner
                            owner={this.state.owner}
                            cock={(this.state.cock as MonsterCock)}
                        />
                    </div>
        );
    }
}