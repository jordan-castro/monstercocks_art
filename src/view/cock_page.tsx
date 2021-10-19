import React from "react";
import { fetchCock } from "../controller/fetch_cocks";
import MonsterCock from "../models/cock";
import AttributesWidget from "./widgets/attributes/attributes";
import { CompilerSuggestion } from "./widgets/compiler_suggestion";
import { Loader } from "./widgets/loader";
import { useParams } from 'react-router-dom';

export function CockPage() {
    var { id } = useParams();

    return (
        <CockPageBuilder id={id} />
    );
}

class CockPageBuilder extends React.Component<{ id?: number }, { cock?: MonsterCock, loading: boolean, error: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            cock: props.cock,
            loading: true,
            error: false,
        };
    }

    compilerSuggestion() {
        this.setState({
            error: true,
            loading: false,
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
                        this.compilerSuggestion();
                    } else {
                        // Tenemos un cock!
                        this.setState({
                            loading: false,
                            error: false,
                            cock: cock
                        });
                    }
                }
                ).catch((error) => this.compilerSuggestion());
            } else {
                this.compilerSuggestion();
            }
        }
    }

    render() {
        return (
            this.state.loading
                ? <Loader />
                : this.state.error
                    ? <CompilerSuggestion />
                    : <AttributesWidget
                        attributes={(this.state.cock as MonsterCock).attributes}
                    />
        );
    }
}