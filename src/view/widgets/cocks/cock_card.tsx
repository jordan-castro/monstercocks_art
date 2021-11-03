import React from "react";
import { fetchOwner } from "../../../controller/fetch_owner";
import { fetchCreatorTransaction } from "../../../controller/fetch_transactions";
import MonsterCock from "../../../models/cock";
import Owner from "../../../models/owner";
import Transaction from "../../../models/transaction";
import { OPENSEA_DARK_BANNER, OPENSEA_LIGHT_BANNER } from "../../../utils/globals";
import { shortenAddress } from "../../../utils/shorten_string";
import { openseaUrl, polygonUrl } from "../../../utils/url_builder";


export class CockCardExploreFour extends React.Component<{
    cock: MonsterCock,
    idx: number,
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
            <div key={`exf_${this.props.idx}`} className={this.className()} style={{
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
                                            <a href={`/author/${this.state.cock.owner?.address}`}>
                                                <h6 className="ml-2 mb-0">
                                                    {shortenAddress(this.state.cock.owner.address)}
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

// /**
//  * Una carta para un Cock.
//  */
// export class CockCard extends React.Component<{ cock?: MonsterCock, main?: boolean }, { loading: boolean }> {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: true,
//         };
//     }
//     /** 
//      * El nombre dek css para el carta de cock 
//      */
//     cName = this.props.main !== undefined
//         ? this.props.main
//             ? 'cock-main' : 'cock-def'
//         : 'cock-def';

//     /**
//      *  El elemento del imagen.
//      */
//     img() {
//         return (
//             <>
//                 <img
//                     src={this.props.cock?.image}
//                     onLoad={() => this.setState({
//                         loading: false,
//                     })}
//                     style={{
//                         display: this.state.loading ? 'none' : 'flex',
//                     }}
//                     className={this.cName}
//                 />
//                 <div
//                     style={{
//                         display: this.state.loading ? 'flex' : 'none',
//                         justifyContent: 'center',
//                         backgroundColor: 'black',
//                         height: '800px'
//                     }}
//                 >
//                     <Loader
//                         centerType='center-within-div'
//                     />
//                 </div>
//             </>
//         );
//     }

//     render() {
//         return (
//             <div className={this.cName}>
//                 <Card>
//                     {
//                         this.props.cock !== undefined ?
//                             this.img()
//                             : null
//                     }
//                     {
//                         this.props.main !== undefined && !this.props.main ?
//                             <CardContent>
//                                 {
//                                     this.props.cock !== undefined ?
//                                         <Typography variant="h5" component="div">
//                                             {this.props.cock.name}
//                                         </Typography> : null
//                                 }
//                             </CardContent>
//                             : null
//                     }
//                 </Card>
//             </div>
//         );
//     }
// }