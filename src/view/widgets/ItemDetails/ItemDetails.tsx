import React, { Component } from 'react';
import { openseaUrl, polygonUrl } from '../../../utils/url_builder';
import shortenString, { shortenAddress } from '../../../utils/shorten_string';
import { dateDifference } from '../../../utils/to_date_time';
import { OPENSEA_DARK_BANNER, OPENSEA_LIGHT_BANNER, DEFAULT_AVATAR, OWNER_ROUTE } from '../../../utils/globals';
import { stripAttributeValue } from '../../../models/attribute';
import ShareButton from '../ShareButton/ShareButton';
import MonsterCock from '../../../models/cock';
import Owner from '../../../models/owner';
import Transaction from '../../../models/transaction';

const initData = {
    itemImg: "/img/auction_2.jpg",
    date: "2022-03-30",
    tab_1: "Bids",
    tab_2: "History",
    tab_3: "Details",
    ownerImg: "/img/avatar_1.jpg",
    itemOwner: "Themeland",
    created: "15 Jul 2021",
    title: "Walking On Air",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    price_1: "1.5 ETH",
    price_2: "$500.89",
    count: "1 of 5",
    size: "14000 x 14000 px",
    volume: "64.1",
    highest_bid: "2.9 BNB",
    bid_count: "1 of 5",
    btnText: "Place a Bid"
}

const tabData_1 = [
    {
        id: "1",
        img: "/img/avatar_1.jpg",
        price: "14 ETH",
        time: "4 hours ago",
        author: "@arham"
    },
    {
        id: "2",
        img: "/img/avatar_2.jpg",
        price: "10 ETH",
        time: "8 hours ago",
        author: "@junaid"
    },
    {
        id: "3",
        img: "/img/avatar_3.jpg",
        price: "12 ETH",
        time: "3 hours ago",
        author: "@yasmin"
    }
]

const tabData_2 = [
    {
        id: "1",
        img: "/img/avatar_6.jpg",
        price: "32 ETH",
        time: "10 hours ago",
        author: "@hasan"
    },
    {
        id: "2",
        img: "/img/avatar_7.jpg",
        price: "24 ETH",
        time: "6 hours ago",
        author: "@artnox"
    },
    {
        id: "3",
        img: "/img/avatar_8.jpg",
        price: "29 ETH",
        time: "12 hours ago",
        author: "@meez"
    }
]

const sellerData = [
    {
        id: "1",
        img: "/img/avatar_1.jpg",
        seller: "@ArtNoxStudio",
        post: "Creator"
    },
    {
        id: "2",
        img: "/img/avatar_2.jpg",
        seller: "Virtual Worlds",
        post: "Collection"
    }
]

/**
 * Un component para mostart el cock previouso y cock siguiente,
 * Es un carta pequeno.
 * 
 * @param {cock: MonsterCock} props: Los props.
*/
const CockSiblingCard = (props) => {
    const { cock } = props;

    return (
        <div key={cock.id} className="col-12 col-md-6 item px-lg-2">
            <a href={`/cock/${cock.id}`}>
                <div className="card">
                    <div className="single-seller d-flex align-items-center">
                        <img className="avatar-md rounded-circle" src={cock.image} alt="" />
                        {/* Info de cock previouso */}
                        <div className="seller-info ml-3">
                            <p className="seller mb-2">{cock.name}</p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}

class ItemDetails extends Component<{
    cock?: MonsterCock,
    owner?: Owner,
    totalAmount?: number,
    transactions?: Transaction[],
    owners?: Owner[],
    siblings?: { previous?: MonsterCock, next?: MonsterCock },
    creator?: Transaction
}> {

    constructor(props) {
        super(props);
        // Ponomes el state inicial
        this.state = {
            initData: initData,
            tabData_1: tabData_1,
            tabData_2: tabData_2,
            sellerData: sellerData,
            amount: 0
        };
    }

    render() {
        return (
            <section className="item-details-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-5">
                            <div className="item-info">
                                <div className="item-thumb text-center">
                                    {this.props.cock &&
                                        <a
                                            href={this.props.cock.image}
                                            target="_new">
                                            <img src={this.props.cock.image} alt="" />
                                        </a>
                                    }
                                </div>
                                <br />
                                {/* Netstorm Tab */}
                                <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                                    <li>
                                        <a className="active" id="nav-home-tab" data-toggle="pill" href="#nav-home">
                                            <h5 className="m-0">Transactions ({this.props.transactions?.length})</h5>
                                        </a>
                                    </li>
                                    <li>
                                        <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
                                            <h5 className="m-0">Owners ({this.props.owners?.length})</h5>
                                        </a>
                                    </li>
                                    <li>
                                        <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
                                            <h5 className="m-0">Attributes ({this.props.cock?.attributes.length})</h5>
                                        </a>
                                    </li>
                                </ul>
                                {/* Tab Content */}
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-home">
                                        <ul className="list-unstyled">
                                            {/* Single Tab List */}
                                            {
                                                // Chequea que transactions esta en los props
                                                // Si esta, entonces muestra los datos
                                                // Si no, muestra el mensaje de que no hay transactions
                                                this.props.transactions ?
                                                    this.props.transactions.map((transaction, idx) => {
                                                        return (
                                                            // Regresa una lista de transactions
                                                            // Show the transaction from, to, hash, date, event
                                                            <li key={`tra_${idx}`} className="single-tab-list d-flex align-items-center">
                                                                <img className="avatar-sm rounded-circle mr-3" src="/img/poly.svg" alt="" />
                                                                <p className="m-0">
                                                                    Function called
                                                                    <a
                                                                        href={polygonUrl({ tx: transaction.hash })}
                                                                        target="_new">
                                                                        {` ${transaction.event} `}

                                                                    </a>
                                                                    {dateDifference(transaction.date)}
                                                                    <br />
                                                                    From: <a
                                                                        href={polygonUrl({
                                                                            address: transaction.from
                                                                        })}
                                                                        target="_new">
                                                                        {shortenAddress(transaction.from)}
                                                                    </a>
                                                                    <br />
                                                                    To: <a
                                                                        href={polygonUrl({
                                                                            address: transaction.to
                                                                        })}
                                                                        target="_new">
                                                                        {shortenAddress(transaction.to)}
                                                                    </a>
                                                                </p>
                                                            </li>
                                                        )
                                                    }) : <p>No transactions</p>
                                            }
                                        </ul>
                                    </div>
                                    <div className="tab-pane fade" id="nav-profile">
                                        <ul className="list-unstyled">
                                            {/* Single Tab List */}
                                            {
                                                // Chequea que owners esta en los props
                                                // Si esta, entonces muestra los datos
                                                // Si no, muestra el mensaje de que no hay owners
                                                this.props.owners ?
                                                    this.props.owners.map((owner, idx) => {
                                                        return (
                                                            // Regresa una lista de owners
                                                            // Un owner tiene address, previous, tokenId, date, isCurrentOwner
                                                            <li key={`ol_${idx}`} className="single-tab-list d-flex align-items-center">
                                                                <img
                                                                    className="avatar-sm rounded-circle mr-3"
                                                                    src={owner.image ? owner.image : DEFAULT_AVATAR}
                                                                    alt="" />
                                                                <p className="m-0">
                                                                    <a href={`${OWNER_ROUTE}${owner.address}`}>
                                                                        {owner.name ? owner.name : shortenAddress(owner.address)}
                                                                    </a>
                                                                    <br />
                                                                    {
                                                                        // Si el owner es currentOwner entonces muestra Became owner else muestra Was owner
                                                                        (owner.isCurrentOwner ? "Became owner " : "Was owner ") + dateDifference(owner.date)} ago
                                                                    <br />
                                                                    {owner.isCurrentOwner ? "Current owner" : "Previous owner"}
                                                                </p>
                                                            </li>
                                                        );
                                                    }) : <p>No owners</p>}
                                        </ul>
                                    </div>
                                    <div className="tab-pane fade" id="nav-contact">
                                        {/* Single Tab List */}
                                        {
                                            // Attributes tienen
                                            // type, value
                                            this.props.cock?.attributes.map((attribute, idx) => {
                                                return (
                                                    <>
                                                        <li key={`att_${idx}`} className="d-flex justify-content-between align-items-center">
                                                            <h6 className="m-0">{attribute.type}</h6>
                                                            <p className="m-0">{stripAttributeValue(attribute.value)}</p>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            {/* Content */}
                            <div className="content mt-5 mt-lg-0">
                                <div className="row justify-content-between">
                                    <h3 className="m-0">{this.props.cock?.name}</h3>
                                    <ShareButton />
                                </div>
                                <br />
                                {/* Owner */}
                                <div className="owner d-flex align-items-center">
                                    <span>Owned By</span>
                                    {
                                        this.props.owner ?
                                            <a className="owner-meta d-flex align-items-center ml-3" href={OWNER_ROUTE + this.props.owner.address}>
                                                <img
                                                    className="avatar-sm rounded-circle"
                                                    src={this.props.owner?.image ? this.props.owner.image : DEFAULT_AVATAR}
                                                    alt="" />
                                                <h6
                                                    className="ml-2">
                                                    {this.props.owner?.name ? this.props.owner.name : shortenAddress(this.props.owner.address)}
                                                </h6>
                                            </a>
                                            : null
                                    }
                                </div>
                                {/* Item Info List */}
                                <div className="item-info-list mt-4">
                                    <ul className="list-unstyled">
                                        <li key={this.props.cock?.name} className="price d-flex justify-content-between">
                                            <span>Current Price <a href={openseaUrl(this.props.cock?.id)}>View on Opensea</a> </span>
                                            <span>{this.props.cock?.id} of {this.props.totalAmount}</span>
                                        </li>
                                        <li>
                                            <span>Size </span>
                                            <span>1900 x 1900 px</span>
                                        </li>
                                        <li key={this.props.cock?.id}>
                                            <span>Volume Traded </span>
                                            <span>
                                                <a
                                                    href={openseaUrl(this.props.cock?.id)}
                                                >
                                                    View on Opensea
                                                </a>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="row items">
                                    {this.props.siblings?.previous ?
                                        <CockSiblingCard cock={this.props.siblings.previous} />
                                        : null}
                                    {this.props.siblings?.next ?
                                        <CockSiblingCard cock={this.props.siblings.next} />
                                        : null}
                                    {
                                        this.props.creator ?
                                            <div className="col-12 item px-lg-2">
                                                <div className="card no-hover">
                                                    <h4 className="mt-0 mb-2">Genesis Transaction</h4>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="seller-info">
                                                            <a
                                                                className="seller"
                                                                href={polygonUrl({ tx: this.props.creator.hash })}
                                                                target="_new">
                                                                {shortenString(this.props.creator.hash, 30)}
                                                            </a>
                                                        </div>
                                                        <span>{this.props.creator.date.toLocaleString().split(',').join('')}</span>
                                                    </div>
                                                </div>
                                            </div> : null
                                    }
                                </div>
                                <br />
                                <div className="row justify-content-center">
                                    <div className="col-12 col-lg-6">
                                        <a href={openseaUrl(this.props.cock?.id)} target="_new">
                                            <img className="img-fluid" src={OPENSEA_DARK_BANNER} alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ItemDetails;