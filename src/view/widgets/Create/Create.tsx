import React, { Component } from 'react';
import swal from '@sweetalert/with-react';
import AuthorData from '../../../models/author';
import { grabWallet } from '../../../utils/connect_wallet';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import { createAuthor, fetchAuthor } from '../../../controller/fetch_author';

class Create extends Component<{}, {
    author: AuthorData,
    connected: boolean,
    imageFile?: File,
}> {
    constructor(props) {
        super(props);
        this.state = {
            author: new AuthorData(0, "0x0000unknown", "", "", ""),
            connected: false,
        }
    }

    /**
     * Update the author's name
     */
    updateName = (event) => {
        this.setState({ author: { ...this.state.author, name: event.target.value } });
    }

    /**
     * Update the author's about
     */
    updateAbout = (event) => {
        this.setState({ author: { ...this.state.author, about: event.target.value } });
    }

    /**
     * Update the author's image
     */
    updateImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            // Chqeuea tipo de imagen
            if (event.target.files[0].type.match(/image.*/)) {
                // Si es una imagen la muestra
                let img = event.target.files[0];
                this.setState({ 
                    author: { ...this.state.author, image: URL.createObjectURL(img) },
                    imageFile: img
                });
            } else {
                // Si no es una imagen muestra un error
                swal("Error", "El archivo no es una imagen", "error");
            }
        }
    }

    /**
     * Hacemos el Submit.
     */
    handleSubmit = async (event) => {
        event.preventDefault();
        // Chequea que estamos conectado
        if (!this.state.connected) {
            // Di al usario que tenemos connectar el wallet
            swal({
                title: "Connect Wallet",
                text: "Please connect your wallet to continue.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
            // Cieera
            return;
        } 

        // Ponemos la vaina en su lugar.
        let author = this.state.author;
        let image = this.state.imageFile;

        let editResult = await createAuthor(
            author.address,
            author.name,
            author.about,
            image
        );

        console.log(editResult);
    }

    /**
     * Busca el address que esta connectado. Chequea primero si esta en el sessionStorage,
     * si no lo encuentra busca en la blockchain.
     */
    grabAddress = async () => {
        let res = await grabWallet();
        // Chequea falso
        if (!res) {
            swal({
                title: "Connect Wallet",
                text: "Please connect your wallet to continue.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        } else {
            // Busca el author por su address
            let author = await fetchAuthor(res);
            this.setState({
                author: author ? author : new AuthorData(0, res, "", "", ""),
                connected: true,
            });
        }
    }

    componentDidMount() {
        this.grabAddress();
    }

    render() {
        return (
            <section className="author-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-md-4">
                            {/* Author Profile */}
                            <AuthorProfile author={this.state.author} />
                        </div>
                        <div className="col-12 col-md-7">
                            {/* Intro */}
                            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                                <div className="intro-content">
                                    <span>Your Profile</span>
                                    <h3 className="mt-3 mb-0">Edit</h3>
                                </div>
                            </div>
                            {/* Item Form */}
                            <form className="item-form card no-hover" onSubmit={this.handleSubmit} method='post'>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.updateImage}/>
                                                <label className="custom-file-label" htmlFor="inputGroupFile01" >Choose file</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="name" placeholder="Item Name" required={true} onChange={this.updateName} value={this.state.author.name} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea className="form-control" name="textarea" placeholder="Description" cols={30} rows={3} onChange={this.updateAbout} value={this.state.author.about} />
                                        </div>
                                    </div>
                                    {/* <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="price" placeholder="Item Price" required={true} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="royality" placeholder="Royality" required={true} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Size" required={true} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="copies" placeholder="No of Copies" required={true} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" defaultChecked />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Put on Sale</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" />
                                                <label className="form-check-label" htmlFor="inlineRadio2">Instant Sale Price</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" defaultValue="option3" />
                                                <label className="form-check-label" htmlFor="inlineRadio3">Unlock Purchased</label>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Create;