import React, { Component } from 'react';
import Owner from '../../../models/owner';
import AuthorData from '../../../models/author';
import { fetchAuthors } from '../../../controller/fetch_activity';
import { safeAuthorName, safeImage } from '../../../utils/get_safe';

class TopSeller extends Component<{
    pageNumber: number
}, {
    people: {owner: Owner, author: AuthorData}[],
    isLoading: boolean,
    error: boolean,
    amount: number,
}> {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            isLoading: true,
            error: false,
            amount: 0,
        }
    }

    loadData = async () => {
        // Busca los sellers
        const result = await fetchAuthors(this.props.pageNumber - 1);
 
        // Chequea resulta
        if (result.amount == 0) {
            this.setState({
                isLoading: false,
                error: true
            });
        } else {
            // Todo esta bien!
            this.setState({
                people: result.data!,
                isLoading: false,
                error: false,
                amount: result.amount,
            });
        }
    }

    render() {
        return (
            <section className="top-seller-area p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro m-0">
                                <div className="intro-content">
                                    <span>Top seller</span>
                                    <h3 className="mt-3 mb-0">Top seller heading</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.people.map((item, idx) => {
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