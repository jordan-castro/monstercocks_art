import React, { Component } from 'react';
import { fetchAuthor } from '../../../controller/fetch_author';
import { DEFAULT_AVATAR } from '../../../utils/globals';
import AuthorData from '../../../models/author';

class AuthorProfile extends Component<{
    address: string,
}, {
    loading: boolean,
    error: boolean,
    author?: AuthorData
}> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
        };

        this.compilerSuggestion = this.compilerSuggestion.bind(this);
        this.grabAuthor = this.grabAuthor.bind(this);
        this.authorImage = this.authorImage.bind(this);
    }

    compilerSuggestion() {
        this.setState({
            loading: false,
            error: true,
        });
    }

    async grabAuthor() {
        // Busca el author
        const author = await fetchAuthor(this.props.address);
        if (author) {
            this.setState({
                author,
                loading: false,
                error: false
            });
        } else {
            this.compilerSuggestion();
        }
    }

    componentDidMount() {
        this.grabAuthor();
    }

    authorImage() {
        return this.state.author?.image ? this.state.author.image : DEFAULT_AVATAR;
    }

    render() {
        return (
            <div className="card no-hover text-center">
                <div className="image-over">
                    <img className="card-img-top" src={this.authorImage()} alt="" />
                    {/* Author */}
                    <div className="author">
                        <div className="author-thumb avatar-lg">
                            <img className="rounded-circle" src={this.authorImage()} alt="" />
                        </div>
                    </div>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                    {/* Card Body */}
                    {
                        this.state.author ?
                            (
                                <div className="card-body mt-4">
                                    <h5 className="mb-3">{this.state.author.name ? this.state.author.name : this.state.author.address}</h5>
                                    <p className="my-3">{this.state.author.about}</p>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder={this.state.author.address} />
                                        <div className="input-group-append">
                                            <button><i className="icon-docs" /></button>
                                        </div>
                                    </div>
                                    {/* <div className="social-icons d-flex justify-content-center my-3">
                            {this.state.socialData.map((item, idx) => {
                                return (
                                    <a key={`asd_${idx}`} className={item.link} href="#">
                                        <i className={item.icon} />
                                        <i className={item.icon} />
                                    </a>
                                );
                            })}
                        </div> */}
                                    <a className="btn btn-bordered-white btn-smaller" href="#">View</a>

                                </div>
                            ) : null}
                </div>
            </div>
        );
    }
}

export default AuthorProfile;