import React, { Component } from 'react';
import axios from 'axios';
import Owner from '../../../models/owner';
import AuthorData from '../../../models/author';
import { safeAuthorName, safeImage } from '../../../utils/get_safe';

class TopSeller extends Component<{}, {
    people: {owner: Owner, author: AuthorData}[],
    isLoading: boolean,
    error: string
}> {
    
    render() {
        return (
            <section className="top-seller-area pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>Highest Owners</span>
                                    <h3 className="mt-3 mb-0">Most Owned Cocks</h3>
                                </div>
                                <div className="intro-btn">
                                    <a className="btn content-btn" href="/authors">View All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">    
                        {this.state.people?.map((item, idx) => {
                            return (
                                <div key={`ts_${idx}`} className="col-12 col-sm-6 col-lg-4 item">
                                    {/* Single Seller */}
                                    <div className="card no-hover">
                                        <div className="single-seller d-flex align-items-center">
                                            <a href="/author">
                                                <img className="avatar-md rounded-circle" src={safeImage(item.author.image)} alt="" />
                                            </a>
                                            {/* Seller Info */}
                                            <div className="seller-info ml-3">
                                                <a className="seller mb-2" href="/author">{safeImage(item.author.image)}</a>
                                                <span>{safeAuthorName(item.author.address, item.author.name)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default TopSeller;