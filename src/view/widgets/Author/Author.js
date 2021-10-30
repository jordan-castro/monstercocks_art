import React, { Component } from 'react';
import { fetchAuthor } from '../../../controller/fetch_author';
import { fetchCocksByOwner } from '../../../controller/fetch_cocks';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import Explore from '../Explore/ExploreSix';
import PageNumbers from '../PageNumbers/PageNumbers';
import pageAmount from '../../../utils/page_amount';

class Author extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cocks: [],
            amount: 0,
            author: null
        }

        this.getCocks = this.getCocks.bind(this);
        this.getAuthor = this.getAuthor.bind(this);
    }

    // Busca los cocks del address
    async getCocks() {
        const data = await fetchCocksByOwner(this.props.address, this.props.startingPage - 1);
        this.setState({
            cocks: data.cocks,
            amount: data.amount,
        });
    }

    async getAuthor() {
        // Busca el author
        const author = await fetchAuthor(this.props.address);
        if (author) {
            this.setState({
                author
            });
        }
    }

    componentDidMount() {
        this.getCocks();
        this.getAuthor();
    }

    render() {
        return (
            <section className="author-area explore-area popular-collections-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-md-4">
                            {/* Author Profile */}
                            <AuthorProfile author={this.state.author} />
                        </div>
                        <div className="col-12 col-md-8">
                            <Explore
                                cocks={this.state.cocks}
                                amount={this.state.amount}
                            />
                        </div>
                    </div>
                    <PageNumbers
                        currentPage={this.props.startingPage}
                        amountOfPages={pageAmount(this.state.amount, 20)}
                        href={`/author/${this.props.address}`}
                    />
                </div>
            </section>
        );
    }
}

export default Author;