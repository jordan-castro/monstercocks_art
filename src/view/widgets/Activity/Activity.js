import { Component, useState, useEffect } from 'react';
import Transaction from '../../../models/transaction';
import MonsterCock from '../../../models/cock';
import { fetchCocks } from '../../../controller/fetch_cocks';
import fetchActivity from '../../../controller/fetch_activity';

const Activity = (props) => {
    const { page } = props; 

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    /**
     * Carga los transactiones.
     */
    const loadTransactions = async () => {
        const activty = await fetchActivity(page - 1);
        // Chequea si tenemos errores.
        if (activty.length == 0) {
            setError(true);
            return;
        }

        // Setea los transactiones.
        setTransactions(activty);
        setLoading(false);
    }

    /**
     * Carga cada cock por los transactiones.
     */
    const loadCocks = async () => {
    
    }

    useEffect(() => {
    });

    return (
        <section className="activity-area load-more">
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
                        {/* Netstorm Tab */}
                        {/* <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                            <li>
                                <a className="active" id="nav-home-tab" data-toggle="pill" href="#nav-home">
                                    <h5 className="m-0"></h5>
                                </a>
                            </li>
                            <li>
                                <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
                                    <h5 className="m-0">{this.state.data.tabTitle_2}</h5>
                                </a>
                            </li>
                            <li>
                                <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
                                    <h5 className="m-0">{this.state.data.tabTitle_3}</h5>
                                </a>
                            </li>
                        </ul> */}
                        {/* Tab Content */}
                        <div className="tab-content" id="nav-tabContent">
                            <li key={0} className="single-tab-list d-flex align-items-center">
                                <a href="#">
                                </a>
                                <div className="activity-content ml-4">
                                    <a href="#">
                                        <h5 className="mt-0 mb-2">Title</h5>
                                    </a>
                                    <p className="m-0">Data for <strong>Token name</strong></p>
                                </div>
                            </li>
                        </div>
                        {/* <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home">
                                <ul className="list-unstyled">
                                    {this.state.tabData_1.map((item, idx) => {
                                        return (
                                            <li key={`ato_${idx}`} className="single-tab-list d-flex align-items-center">
                                                <a href="/item-details">
                                                    <img className="avatar-lg" src={item.img} alt="" />
                                                </a>
                                                <div className="activity-content ml-4">
                                                    <a href="/item-details">
                                                        <h5 className="mt-0 mb-2">{item.title}</h5>
                                                    </a>
                                                    <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{item.seller}</a></p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="nav-profile">
                                <ul className="list-unstyled">
                                    {this.state.tabData_2.map((item, idx) => {
                                        return (
                                            <li key={`att_${idx}`} className="single-tab-list d-flex align-items-center">
                                                <a href="/item-details">
                                                    <img className="avatar-lg" src={item.img} alt="" />
                                                </a>
                                                <div className="activity-content ml-4">
                                                    <a href="/item-details">
                                                        <h5 className="mt-0 mb-2">{item.title}</h5>
                                                    </a>
                                                    <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{item.seller}</a></p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="nav-contact">
                                <ul className="list-unstyled">
                                    {this.state.tabData_3.map((item, idx) => {
                                        return (
                                            <li key={`atth_${idx}`} className="single-tab-list d-flex align-items-center">
                                                <a href="/item-details">
                                                    <img className="avatar-lg" src={item.img} alt="" />
                                                </a>
                                                <div className="activity-content ml-4">
                                                    <a href="/item-details">
                                                        <h5 className="mt-0 mb-2">{item.title}</h5>
                                                    </a>
                                                    <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{item.seller}</a></p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div> */}
                    </div>
                    {/* <div className="col-12 col-md-6 col-lg-4">
                        <div className="activity-content mt-5 mt-lg-0">
                            <div className="single-widget">
                                <div className="widget-content search-widget">
                                    <form action="#">
                                        <input type="text" placeholder="Enter your keywords" />
                                    </form>
                                </div>
                            </div>
                            <div className="single-widget">
                                <div className="widget filter-widget">
                                    <h4 className="title">{this.state.data.widgetTitle}</h4>
                                    <div className="widget-content">
                                        <div className="widget-content filter-widget-items mt-3">
                                            {this.state.filterData.map((item, idx) => {
                                                return (
                                                    <a key={`fd_${idx}`} href="#" className="badge tag">{item.title}</a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}

export default Activity;