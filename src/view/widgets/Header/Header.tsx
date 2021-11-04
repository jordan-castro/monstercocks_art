import { Component, useEffect, useState } from 'react';
import { shortenAddress } from '../../../utils/shorten_string';
import { useWeb3React } from "@web3-react/core";
import { injected, isConnected, needToConnect, stopConnecting } from '../../../utils/connect_wallet';
import swal from '@sweetalert/with-react';
import RouteHandler from '../../../utils/route_handler';

const WalletConnectButton = (props) => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    useEffect(() => {
        // Chequea si ya estamos connectado
        if (isConnected()) {
            activate(injected).then(() => {
                // props.onConnect();
            });
            stopConnecting();
        }
    });

    const connect = async () => {
        if (active) {
            needToConnect();
            // Vamos a su pagina
            window.location.href = RouteHandler.getOwnerUrl(account!);
            // Cieera
            return;
        }
        try {
            await activate(injected);
            needToConnect();
        } catch (error) {
            console.log(error);
            // Digamos que habia un error en ingles
            swal({
                title: "Error",
                text: "There was an error connecting to the wallet",
                icon: "error",
                button: "Ok",
            });
        }
    }

    const disconnect = async () => {
        try {
            await deactivate();
            stopConnecting();
        } catch (error) {
            console.log(error);
            // Digamos que habia un error en ingles
            swal({
                title: "Error",
                text: "There was an error disconnecting from the wallet",
                icon: "error",
                button: "Ok",
            });
        }
    }

    // // Chequea primero si ya esta conectado
    // if (this.state.isConnected) {
    //     // Vamos por el author page de esta address
    //     window.location.href = `/author/${this.state.address}`;
    //     // Cieera
    //     return;
    // }
    // // Estamos connectando
    // this.setState({
    //     isConnecting: true,
    // });

    // let wallet = await connectWallet();
    // // Chequea falso
    // if (wallet == false || wallet == undefined) {
    //     // Muestra un dialog customizado
    //     await swal({
    //         title: "Error",
    //         text: "There was a problem connecting your wallet.",
    //         icon: "error",
    //         button: "Ok",
    //     });

    //     // Setea no conectado
    //     this.setState({
    //         isConnected: false,
    //         isConnecting: false,
    //     });
    // } else {
    //     // Pon la connected en el sessionStorage a true
    //     window.sessionStorage.setItem('connected', true);
    //     // Setea el address en el state
    //     this.setState({
    //         address: wallet,
    //         isConnected: true,
    //         isConnecting: false,
    //     });
    //     // Chequea si deberiamos recargar la pagina
    //     if (this.props.reload && window.sessionStorage.getItem('reloaded') != "true") {
    //         window.sessionStorage.setItem('reloaded', true);
    //         // Recarga la pagina
    //         window.location.reload();
    //     }
    // }

    // // Chequea web3 esta connectado
    // async checkWeb3() {
    //     // Chequeqa si ya esta conectado
    //     if (checkWallet()) {
    //         // Setea el address en el state
    //         await this.connect();
    //     }
    // }

    // componentDidMount() {
    //     // Chequea web3
    //     this.checkWeb3();
    // }

    return (
        <button
            className={`btn ml-lg-auto ${active ? '' : 'btn-bordered-white'}`}
            onClick={connect}>
            <i className="icon-wallet mr-md-2" />
            {
                // Chequea si esta conectado
                active ? (
                    shortenAddress(account!)
                ) : (
                    <span>Connect Wallet</span>
                )
            }
        </button>
    );
}

const Header = (props) => {
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
                                <li className="nav-item"><a href="/cocks" className="nav-link">Explore MonsterCocks</a></li>
                                {/* <li className="nav-item"><a href="/explore-2" className="nav-link">Explore Style 2</a></li>
                                <li className="nav-item"><a href="/explore-3" className="nav-link">Explore Style 3</a></li>
                                <li className="nav-item"><a href="/explore-4" className="nav-link">Explore Style 4</a></li>
                                <li className="nav-item"><a href="/auctions" className="nav-link">Live Auctions</a></li>
                                <li className="nav-item"><a href="/item-details" className="nav-link">Item Details</a></li> */}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="/activity" className="nav-link">Activity</a>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Community <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
                                <li className="nav-item"><a href="/blog-single" className="nav-link">Blog Single</a></li>
                                <li className="nav-item"><a href="/help-center" className="nav-link">Help Center</a></li>
                            </ul>
                        </li> // TODO esto aqui! */}
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Pages <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/owners" className="nav-link">Owners</a></li>
                                <li className="nav-item"><a href="/owner" className="nav-link">Profile</a></li>
                                {/* <li className="nav-item"><a href="/wallet-connect" className="nav-link">Wallet Connect</a></li>
                                <li className="nav-item"><a href="/create" className="nav-link">Create</a></li>
                                <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                                <li className="nav-item"><a href="/signup" className="nav-link">Signup</a></li> */}
                            </ul>
                        </li>
                        {/* <li className="nav-item">
                            <a href="/contact" className="nav-link">Contact</a>
                        </li> */}
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
                            <WalletConnectButton />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;