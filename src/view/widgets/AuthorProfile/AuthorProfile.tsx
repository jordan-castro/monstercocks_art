import React, { Component } from 'react';
import { fetchAuthor } from '../../../controller/fetch_author';
import { DEFAULT_AVATAR } from '../../../utils/globals';
import AuthorData from '../../../models/author';
import { polygonUrl } from '../../../utils/url_builder';
import shortenString, { shortenAddress } from '../../../utils/shorten_string';

const AuthorProfile = (props: {
    author: AuthorData,
    editMode?: boolean,
}) => {
    const { author, editMode } = props;

    const authorImage = () => {
        const { author } = props;
        return author?.image ? author.image : DEFAULT_AVATAR;
    }

    return (
        <div className="card no-hover text-center">
            <div className="image-over">
                <img className="card-img-top" src={authorImage()} alt="" />
                {/* Author */}
                <div className="author">
                    <div className="author-thumb avatar-lg">
                        <img className="rounded-circle" src={authorImage()} alt="" />
                    </div>
                </div>
            </div>
            {/* Card Caption */}
            <div className="card-caption col-12 p-0">
                {/* Card Body */}
                {
                    author ?
                        (
                            <div className="card-body mt-4">
                                <h5 className="mb-3">{author.name ? author.name : author.address}</h5>
                                <p className="my-3">{author.about}</p>
                                <div className="input-group">
                                    <input type="text" className="form-control" readOnly value={shortenString(author.address, 25)} />
                                    <div className="input-group-append">
                                        <button onClick={() => {
                                            // Copy the field in the clipboard
                                            navigator.clipboard.writeText(author?.address ? author.address : 'Empty');
                                        }}><i className="icon-docs" /></button>
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
                                <hr />
                                <a className="btn btn-bordered-white btn-smaller" href={polygonUrl({ address: author.address })}>View</a>
                                {
                                    editMode && 
                                        <a className="btn btn-bordered-white btn-smaller" href="/edit" style={{
                                            marginLeft: '10px'
                                        }}>Edit</a>
                                }

                            </div>
                        ) : null}
            </div>
        </div>
    );
}

export default AuthorProfile;