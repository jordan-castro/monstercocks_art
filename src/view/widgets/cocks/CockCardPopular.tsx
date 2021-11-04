import React from "react";
import MonsterCock from "../../../models/cock";
import Owner from "../../../models/owner";

class CockCardPopular extends React.Component<{
    cock: MonsterCock,
    idx: number
}, {
    cock: MonsterCock,
}> {
    constructor(props: { cock: MonsterCock, idx: number }) {
        super(props);
        this.state = {
            cock: props.cock,
        };
    }

    /**
     * Carga la data del cock card.
     */
    loadData = () => {
        let cock = this.state.cock;
        // Busca el owner
        cock.getOwner().then(() => this.setState({ cock }));
    }

    cockUrl = () => {
        return `/cock/${this.props.cock.id}`;
    }

    componentDidMount() {
        // this.loadData();
    }   

    render() {
        return (
            <div key={`cd_${this.props.idx}`} className="col-12 col-sm-6 col-lg-3 item">
                <div className="card no-hover text-center">
                    <div className="image-over">
                        <a href={this.cockUrl()}>
                            <img className="card-img-top" src={this.props.cock.image} alt="" />
                        </a>
                        <a className="seller" href={`/cock/${this.state.cock.id}`}>
                                <div className="seller-thumb avatar-lg">
                                    <img className="rounded-circle" src={this.state.cock.image} alt="" />
                                </div>
                            </a>
                        {/* {this.state.cock.owner &&
                            <a className="seller" href={`/author/${this.state.cock.owner.address}`}>
                                <div className="seller-thumb avatar-lg">
                                    <img className="rounded-circle" src={this.state.cock.owner.image} alt="" />
                                </div>
                            </a>
                        } */}
                    </div>
                    {/* Card Caption */}
                    <div className="card-caption col-12 p-0">
                        {/* Card Body */}
                        <div className="card-body mt-4">
                            <a href={this.cockUrl()}>
                                <h5 className="mb-2">{this.props.cock.name}</h5>
                            </a>
                            {/* <span>{item.content}</span> */}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default CockCardPopular;