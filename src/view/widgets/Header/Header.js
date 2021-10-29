import React, { Component } from 'react';
import connectWallet, { checkWallet } from '../../../utils/connect_wallet';
import { shortenAddress } from '../../../utils/shorten_string';
import swal from 'sweetalert';

class WalletConnectButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            isConnecting: false,
            address: null,
        };

        this.checkWeb3 = this.checkWeb3.bind(this);
        this.connect = this.connect.bind(this);
    }

    async connect() {
        // Estamos connectando
        this.setState({
            isConnecting: true,
        });

        let wallet = await connectWallet();
        // Chequea falso
        if (wallet === false) {
            // Muestra un dialog customizado
            await swal({
                title: "Error",
                text: "Please connect your wallet and try again.",
                icon: "error",
                button: "Ok",
            });

            // Setea no conectado
            this.setState({
                isConnected: false,
                isConnecting: false,
            });
        } else {
            // Pon la connected en el sessionStorage a true
            window.sessionStorage.setItem('connected', true);
            // Setea el address en el state
            this.setState({
                address: wallet,
                isConnected: true,
                isConnecting: false,
            });
            // Chequea si deberiamos recargar la pagina
            if (this.props.reload && window.sessionStorage.getItem('reloaded') == "false") {
                window.sessionStorage.setItem('reloaded', true);
                // Recarga la pagina
                window.location.reload();
            }
        }
    }

    // Chequea web3 esta connectado
    async checkWeb3() {
        // Chequeqa si ya esta conectado
        if (checkWallet()) {
            // Setea el address en el state
            await this.connect();
        }
    }

    componentDidMount() {
        // Chequea web3
        this.checkWeb3();
    }

    render() {
        return (
            <button
                className={`btn ml-lg-auto ${this.state.isConnected ? '' : 'btn-bordered-white'}`}
                onClick={this.connect}>
                <i className="icon-wallet mr-md-2" />
                {
                    // Chequea si esta conectado
                    this.state.isConnected ? (
                        shortenAddress(this.state.address)
                    ) : (
                        this.state.isConnecting ? (
                            <span>Connecting...</span>) :
                            (<span>Connect Wallet</span>)
                    )
                }
            </button>
        );
    }
}

const Header = (props) => {
    const { reload } = props;

    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    <a className="navbar-brand" href="/">
                        {/* <img className="navbar-brand-sticky" src="img/logo.png" alt="sticky brand-logo" /> */}
                    </a>
                    <div className="ml-auto" />
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Explore <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/explore-1" className="nav-link">Explore Style 1</a></li>
                                <li className="nav-item"><a href="/explore-2" className="nav-link">Explore Style 2</a></li>
                                <li className="nav-item"><a href="/explore-3" className="nav-link">Explore Style 3</a></li>
                                <li className="nav-item"><a href="/explore-4" className="nav-link">Explore Style 4</a></li>
                                <li className="nav-item"><a href="/auctions" className="nav-link">Live Auctions</a></li>
                                <li className="nav-item"><a href="/item-details" className="nav-link">Item Details</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="/activity" className="nav-link">Activity</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Community <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
                                <li className="nav-item"><a href="/blog-single" className="nav-link">Blog Single</a></li>
                                <li className="nav-item"><a href="/help-center" className="nav-link">Help Center</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Pages <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/authors" className="nav-link">Authors</a></li>
                                <li className="nav-item"><a href="/author" className="nav-link">Author</a></li>
                                <li className="nav-item"><a href="/wallet-connect" className="nav-link">Wallet Connect</a></li>
                                <li className="nav-item"><a href="/create" className="nav-link">Create</a></li>
                                <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                                <li className="nav-item"><a href="/signup" className="nav-link">Signup</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="/contact" className="nav-link">Contact</a>
                        </li>
                    </ul>
                    {/* Navbar Icons */}
                    <ul className="navbar-nav icons">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#search">
                                <i className="fas fa-search" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Toggler */}
                    <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Action Button */}
                    <ul className="navbar-nav action">
                        <li className="nav-item ml-3">
                            <WalletConnectButton reload={reload} />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;