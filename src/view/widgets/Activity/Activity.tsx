import { Component, useState, useEffect } from 'react';
import Transaction from '../../../models/transaction';
import fetchActivity from '../../../controller/fetch_activity';
import { Loader } from '../loader';
import RouteHandler from '../../../utils/route_handler';
import { polygonUrl } from '../../../utils/url_builder';
import { shortenAddress } from '../../../utils/shorten_string';
import { dateDifference } from '../../../utils/to_date_time';
import { Router } from '@material-ui/icons';
import { DEFAULT_AVATAR } from '../../../utils/globals';
import PageNumbers from '../PageNumbers/PageNumbers';
import pageAmount from '../../../utils/page_amount';

class Activity extends Component<{
    page: number
}, {
    txs?: Transaction[],
    loading: boolean,
    error: boolean,
    amount: number
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            amount: 0
        };

        this.transactionData = this.transactionData.bind(this);
    }

    /**
     * Carga los transactiones.
     */
    loadTransactions = async () => {
        const activty = await fetchActivity(this.props.page - 1);
        // Chequea si tenemos errores.
        if (activty.amount == 0) {
            this.setState({
                loading: false,
                error: true
            });
            return;
        }

        // Setea los transactiones.
        this.setState({
            txs: activty.txs,
            amount: activty.amount,
            loading: false,
            error: false
        }, () => {
            console.log(this.state);
        });
    }

    transactionData(tx: Transaction) {
        return (
            <li key={`tra_${tx.tokenId}`} className="single-tab-list d-flex align-items-center">
                <p className="m-0">
                    <a href={RouteHandler.getCockUrl(tx.tokenId)} style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                    }}>{tx.name}</a>
                    <br />
                    Function called
                    <a
                        href={polygonUrl({ tx: tx.hash })}
                        target="_new">
                        {` ${tx.event} `}

                    </a>
                    {dateDifference(tx.date)} ago
                    <br />
                    {this.addressComp(tx.from, 'From: ', {
                        name: tx.fromName,
                        image: tx.fromImage
                    })}
                    <br />
                    {this.addressComp(tx.to, 'To: ', {
                        name: tx.toName,
                        image: tx.toImage
                    })}
                </p>
            </li>
        );
    }

    addressComp = (address: string, title: string, avatar: { name?: string, image?: string }) => {
        return (
            <>
                {title}
                <a href={RouteHandler.getOwnerUrl(address)}>
                    {avatar.name ? avatar.name : shortenAddress(address)}
                </a>
            </>
        );
    }


    componentDidMount() {
        this.loadTransactions();
    }

    render() {
        return (
            <section className="item-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro mb-4">
                                <div className="intro-content">
                                    <span>Activity</span>
                                    <h3 className="mt-3 mb-0">MonsterCocks Activity</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        <div className="col-12 col-md-6 col-lg-8">
                            <div className="tab-content" id="nav-tabContent">
                                {this.state.error ? (
                                    <p>Error</p>
                                ) : this.state.loading ? (
                                    <Loader />
                                ) : (
                                    this.state.txs?.map((tx, index) =>
                                        <li key={`tr_${index}`} className="single-tab-list d-flex align-items-center">
                                            <a href={RouteHandler.getCockUrl(tx.tokenId)}>
                                                <img className="avatar-lg" src={tx.image} style={{
                                                    borderRadius: '10px',
                                                }} />
                                            </a>
                                            <div className="activity-content ml-4">
                                                {this.transactionData(tx)}
                                            </div>
                                        </li>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <PageNumbers amountOfPages={pageAmount(this.state.amount, 20)} currentPage={this.props.page} onPageNumberClicked={(num) => {
                    return "/activity?pn=" + num;
                }} />
            </section>
        );
    }
}
export default Activity;