import React, { Component } from 'react';
import RouteHandler, { Routes } from '../../../utils/route_handler';

const initData = {
    menuName: "Search",
    menuIcon: "far fa-times-circle icon-close",
    heading: "What are you looking for?",
    content: "Search for a MCK NFT based on its name or id.",
    btnText: "Search"
}

class ModalSearch extends Component {
    state = {
        data: {},
        query: ""
    }

    /**
     * @dev Set la query de la modal por un evento del input
     */
    setQuery = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    /** 
     * El button de click para buscar la vaina.
     */
    search = (event) => {
        event.preventDefault();
        let query = this.state.query;
        if (query.length > 0) {
            window.location.href = RouteHandler.goToQuery(Routes.COCKS, {
                key: "s",
                value: query
            });
        }
    }

    componentDidMount() {
        this.setState({
            data: initData
        })
    }
    
    render() {
        return (
            <div id="search" className="modal fade p-0">
                <div className="modal-dialog dialog-animated">
                    <div className="modal-content h-100">
                        <div className="modal-header" data-dismiss="modal">
                            {this.state.data.menuName} <i className={this.state.data.menuIcon} />
                        </div>
                        <div className="modal-body">
                            <form className="row">
                                <div className="col-12 align-self-center">
                                    <div className="row">
                                        <div className="col-12 pb-3">
                                            <h2 className="search-title mt-0 mb-3">{this.state.data.heading}</h2>
                                            <p>{this.state.data.content}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 input-group mt-4">
                                            <input type="text" placeholder="Search" value={this.state.query} onChange={this.setQuery} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 input-group align-self-center">
                                            <button className="btn btn-bordered-white mt-3" onClick={this.search}>{this.state.data.btnText}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalSearch;