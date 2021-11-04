import React from "react";
import { fetchOwner } from "../../../controller/fetch_owner";
import { fetchCreatorTransaction } from "../../../controller/fetch_transactions";
import MonsterCock from "../../../models/cock";
import Owner from "../../../models/owner";
import Transaction from "../../../models/transaction";
import { OPENSEA_DARK_BANNER, OPENSEA_LIGHT_BANNER, OWNER_ROUTE } from "../../../utils/globals";
import { shortenAddress } from "../../../utils/shorten_string";
import { openseaUrl, polygonUrl } from "../../../utils/url_builder";


export class CockCardExploreFour extends React.Component<{
    cock: MonsterCock,
    idx?: number,
    slider?: boolean,
}, {
    cock: MonsterCock,
}> {
    constructor(props) {
        super(props);
        this.state = {
            cock: props.cock,
        };
    }

    loadData = () => {
        let cock = this.state.cock;
        cock.getOwner().then(() => this.setState({ cock }));
        cock.getCreator().then(() => this.setState({ cock }));
    }

    componentDidMount() {
        this.loadData();
    }

    className = () => {
        // "col-12 col-sm-6 col-lg-3 item";
        return `col-12 ${this.props.slider ? '' : 'col-sm-6 col-lg-3'} item`;
    }

    render() {
        return (
            <div className={this.className()} style={{
                display: "block"
            }}>
                <div className="card">
                    <div className="image-over">
                        <a href={`/cock/${this.state.cock.id}`}>
                            <img className="card-img-top" src={this.state.cock.image} alt="" />
                        </a>
                    </div>
                    {/* Card Caption */}
                    <div className="card-caption col-12 p-0">
                        {/* Card Body */}
                        <div className="card-body">
                            <a href={`/cock/${this.state.cock.id}`}>
                                <h5 className="mb-0">{this.state.cock.name}</h5>
                            </a>
                            <div className="seller d-flex align-items-center my-2">
                                <span>Owned By</span>
                                {
                                    // Chequea si hay owner en el estado,
                                    // Si no hay entonces muestra "Loading"
                                    // Si hay entonces muestra el owner.address
                                    this.state.cock.owner ?
                                        (
                                            <a href={`${OWNER_ROUTE}${this.state.cock.owner?.address}`}>
                                                <h6 className="ml-2 mb-0">
                                                    {
                                                        this.state.cock.owner?.name ?
                                                            this.state.cock.owner.name :
                                                            shortenAddress(this.state.cock.owner.address)
                                                    }
                                                </h6>
                                            </a>
                                        ) : (
                                            <h6 className="ml-2 mb-0">
                                                Loading
                                            </h6>
                                        )
                                }
                            </div>
                            <div className="seller d-flex align-items-center my-1">
                                {
                                    // Chequea si hay owner en el estado,
                                    // Si no hay entonces muestra null
                                    this.state.cock.creator ?
                                        (
                                            <>
                                                <span>Created On</span>
                                                <a href={polygonUrl({ tx: this.state.cock.creator.hash })} target="_new">
                                                    <h6 className="ml-2 mb-0">
                                                        {this.state.cock.creator.date.toLocaleDateString().replace(/\//g, "-")}
                                                    </h6>
                                                </a>
                                            </>
                                        ) : null
                                }
                            </div>
                            <a className="btn btn-bordered-white btn-smaller mt-3" href={`/cock/${this.state.cock.id}`}><i className="icon-eye mr-2" />View</a>
                            {/* <a href={openseaUrl(this.props.cock.id)} target="_new">
                                <img className="img-fluid" src={OPENSEA_LIGHT_BANNER} alt="" height="20px" width="50%"/>
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
