import { Component, useEffect, useState } from 'react';
import { shortenAddress } from '../../../utils/shorten_string';
import connectWallet, { grabWallet, isConnected } from '../../../utils/connect_wallet';
import swal from '@sweetalert/with-react';
import RouteHandler from '../../../utils/route_handler';
import { DEFAULT_ADDRESS } from '../../../utils/globals';

const WalletConnectButton = (props: {
    reload: boolean,
}) => {
    const { reload } = props;

    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState('');

    useEffect(() => {
        // Chequea si ya esta connectado
        if (isConnected()) {
            connect();
        }
    });

    const connect = async () => {
        // Busca el address
        let _address = await connectWallet();
        // Chequea si funciono
        if (_address) {
            // Chequea si tenemos que recargar!
            if (reload && sessionStorage.getItem('reload') != 'false') {
                sessionStorage.setItem('reload', 'false');
                window.location.reload();
                return;
            }
            setAddress(_address);
            setConnected(true);
        } else {
            // Digamos que habia un error en ingles
            swal({
                title: "Error",
                text: "There was an error connecting to the wallet",
                icon: "error",
                button: "Ok",
            });
        }
    }

    return (
        <button
            className={`btn ml-lg-auto ${connected ? '' : 'btn-bordered-white'}`}
            onClick={connect}>
            <i className="icon-wallet mr-md-2" />
            {
                // Chequea si esta conectado
                connected ? (
                    shortenAddress(address)
                ) : (
                    <span>Connect Wallet</span>
                )
            }
        </button>
    );
}

const Header = (props: {
    reload?: boolean,
}) => {
    // Busca el wallet
    const [wallet, setWallet] = useState(DEFAULT_ADDRESS);

    useEffect(() => {
        grabWallet().then((wallet) => {
            if (wallet) {
                setWallet(wallet);
            }
        });
    });

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
                                <li className="nav-item"><a href={RouteHandler.getOwnerUrl(wallet)} className="nav-link">Profile</a></li>
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
                            <WalletConnectButton reload={props.reload ? props.reload : false} />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;