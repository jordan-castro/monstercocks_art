import React, { Component } from 'react';
import connectWallet, { checkWallet } from '../../../utils/connect_wallet';
import swal from '@sweetalert/with-react';
import { createAuthor } from '../../../controller/fetch_author';

const initData = {
    pre_heading: "Edit",
    heading: "Edit your Account",
    content: "You can edit your account with a custom nickname, avatar, and short description!"
}

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initData: initData,
            address: "",
            name: "",
            about: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Chequea web3 esta connectado
    async checkWeb3() {
        // Chequea si esta conectado por el sessionStorage.
        if (checkWallet()) {
            // Si esta connectado entonces usa el wallet address de connectWallet()
            this.setState({
                address: await connectWallet()
            });
        } else {
            // Muestra mensaje de connectar
            swal({
                title: "Connect Wallet",
                text: "Please connect your wallet to continue.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
    }

    componentDidMount() {
        // Chequea web3
        this.checkWeb3();
    }

    // Handle el submit del form
    async handleSubmit(event) {
        event.preventDefault();
        let data = {
            name: this.state.name,
            address: this.state.address,
            about: this.state.about,
        };
        let result;
        if (data.address === undefined) {
            result = false;
        } else {
            // Manda al server
            result = await createAuthor(
                data.address,
                data.name,
                data.about
            );
            console.log(result);
        }

        // Chequea result
        if (result === false) {
            // Si no se pudo crear el author
            swal({
                title: "Error",
                text: "Something went wrong, please try again.",
                icon: "error",
                buttons: true,
                dangerMode: true,
            });
        } else {
            // Creamos el author
            swal({
                title: "Success",
                text: "Your account has been updated!",
                icon: "success",
                buttons: true,
            });
        }
    }

    render() {
        return (
            <section className="author-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                            </div>
                            {/* Item Form */}
                            <form className="item-form card no-hover"
                                onSubmit={this.handleSubmit}
                                method='post'>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address"
                                                readOnly
                                                required="required"
                                                value={this.state.address}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Enter your Name"
                                                required="required"
                                                value={this.state.name}
                                                onChange={(e) => this.setState({ name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input 
                                            type="email" 
                                            className="form-control" 
                                            name="email" 
                                            placeholder="Enter your Email" 
                                            required="required" 
                                            value={this.state.email}
                                            onChange={(e) => this.setState({email: e.target.value})}
                                            />
                                        </div>
                                    </div> */}
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="about"
                                                placeholder="Short description"
                                                maxLength="120"
                                                value={this.state.about}
                                                onChange={(e) => this.setState({ about: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="col-12">
                                        <div className="form-group mt-3">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" required="required" />
                                                <label 
                                                className="form-check-label" 
                                                htmlFor="inlineRadio1" 
                                                >
                                                    I agree to <a href="#">Privacy Policy</a></label>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-12">
                                        <button
                                            className="btn w-100 mt-3 mt-sm-4"
                                            type="submit"
                                        >Sign Up</button>
                                    </div>
                                    {/* <div className="col-12">
                                        <span className="d-block text-center mt-4">Already have an account? <a href="/login">Login</a></span>
                                    </div> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Signup;

// <div className="col-12">
// <hr />
// <div className="other-option">
//    <span className="d-block text-center mb-4">Or</span>
//   {/* Social Icons */}
//    <div className="social-icons d-flex justify-content-center">
//        {this.state.data.map((item, idx) => {
            // return (
                // <a key={`lsd_${idx}`} className={item.link} href="#">
                    // <i className={item.icon} />
                    // <i className={item.icon} />
                // </a>
            // );
        // })}
    // </div>
// </div>
// </div>
