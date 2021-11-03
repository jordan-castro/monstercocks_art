import React, { Component } from 'react';
import axios from 'axios';
import MonsterCock from '../../../models/cock';
import { fetchMostPopularCocks } from '../../../controller/fetch_cocks';
import CockCardPopular from '../cocks/CockCardPopular';


class Collections extends Component<{}, {
    cocks: MonsterCock[],
    loading: boolean,
    error: boolean
}> {
    constructor(props) {
        super(props);
        this.state = {
            cocks: [],
            loading: true,
            error: false
        }
    }            

    /**
     * Busca los cocks mas popularios.
     */
    grabCocks = async () => {
        let cocks = await fetchMostPopularCocks();
        // Chequea que funcione.
        if (cocks.length > 0) {
            this.setState({
                cocks: cocks,
                loading: false,
                error: false
            });
        } else {
            this.setState({
                loading: false,
                error: true
            });
        }
    }

    componentDidMount() {
        this.grabCocks();
    }
    
    render() {
        return (
            <section className="popular-collections-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>Popular</span>
                                    <h3 className="mt-3 mb-0">Popular Cocks</h3>
                                </div>
                                <div className="intro-btn">
                                    <a className="btn content-btn text-left" href="/cocks">View All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.cocks.map((item, idx) => {
                            // El HREF ed cada cock
                            let url = `/cocks/${item.id}`;

                            return (
                                <CockCardPopular 
                                    idx={idx}
                                    cock={item}
                                />
                                // <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                //     <div className="card no-hover text-center">
                                //         <div className="image-over">
                                //             <a href={url}>
                                //                 <img className="card-img-top" src={item.image} alt="" />
                                //             </a>
                                //             {/* Seller */}
                                //             <a className="seller" href={url}>
                                //                 <div className="seller-thumb avatar-lg">
                                //                     <img className="rounded-circle" src={item.image} alt="" />
                                //                 </div>
                                //             </a>
                                //         </div>
                                //         {/* Card Caption */}
                                //         <div className="card-caption col-12 p-0">
                                //             {/* Card Body */}
                                //             <div className="card-body mt-4">
                                //                 <a href={url}>
                                //                     <h5 className="mb-2">{item.name}</h5>
                                //                 </a>
                                //                 {/* <span>{item.content}</span> */}
                                //             </div>
                                //         </div>
                                //     </div>
                                // </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default Collections;