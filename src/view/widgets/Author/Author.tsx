import React, { Component } from 'react';
import { fetchAuthor } from '../../../controller/fetch_author';
import { fetchCocksByOwner } from '../../../controller/fetch_cocks';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import Explore from '../Explore/ExploreSix';
import PageNumbers from '../PageNumbers/PageNumbers';
import pageAmount from '../../../utils/page_amount';
import { useWeb3React } from "@web3-react/core";
import AuthorData from '../../../models/author';
import MonsterCock from '../../../models/cock';

class Author extends React.Component <{
    startingPage: number,
    address: string,
}, {
    author?: AuthorData,
    edit: boolean,
    amount: number,
    cocks: MonsterCock[],
}> {
    constructor(props) {
        super(props);
        this.state = {
            cocks: [],
            amount: 0,
            edit: false
        }

        this.getCocks = this.getCocks.bind(this);
        this.getAuthor = this.getAuthor.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    // Chequea el usario currentamente logueado
    // Si es el mismo usuario que el que se esta viendo, se muestra el boton de editar
    // Si no, no se muestra
    async checkUser() {
        const { author } = this.state;
        const { account } = useWeb3React();
        // Chequea el wallet esta connectado
        if (account == author?.address) {
            this.setState({
                edit: true
            });
        } else {
            this.setState({
                edit: false
            });
        }
    }

    // Busca los cocks del address
    async getCocks() {
        const { cocks, amount } = await fetchCocksByOwner(this.props.address, this.props.startingPage - 1);
        this.setState({
            cocks,
            amount
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
        this.getAuthor().then(() => {
            this.checkUser();
        });
    }

    render() {
        return (
            <section className="author-area explore-area popular-collections-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-md-4">
                            {/* Author Profile */}
                            {this.state.author &&
                                <AuthorProfile author={this.state.author} editMode={this.state.edit} />
                            }
                        </div>
                        <div className="col-12 col-md-8">
                            <Explore
                                cocks={this.state.cocks}
                                amount={this.state.amount}
                            />
                        </div>
                    </div>
                    {/* Pagination */}
                    {this.state.author &&
                        <PageNumbers
                            currentPage={this.props.startingPage}
                            amountOfPages={pageAmount(this.state.amount, 20)}
                            href={`/author/${this.props.address}?`}
                        />
                    }
                </div>
            </section>
        );
    }
}

export default Author;