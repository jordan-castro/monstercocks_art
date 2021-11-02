import React, { Component } from 'react';
import { fetchAuthor } from '../../../controller/fetch_author';
import { DEFAULT_AVATAR } from '../../../utils/globals';
import AuthorData from '../../../models/author';
import { polygonUrl } from '../../../utils/url_builder';
import shortenString, { shortenAddress } from '../../../utils/shorten_string';
import ShareButton from '../ShareButton/ShareButton';
import ClipboardButton from '../ClipboardButton/ClipboardButton';

const SocialIcon = (props: { href: string, social: string, icon: string }) => {
    return (
        <a className={props.social} href={props.href} target="_blank">
            <i className={props.icon} />
            <i className={props.icon} />
        </a>
    );
};

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
                                <h5 className="mb-3">{author.name ? author.name : shortenAddress(author.address)}</h5>
                                <p className="my-3">{author.about}</p>
                                <div className="input-group">
                                    <input type="text" className="form-control" readOnly value={shortenString(author.address, 25)} />
                                    <div className="input-group-append">
                                    <ClipboardButton whatToCopy={author?.address ? author.address : 'Empty'}> 
                                        <i className="icon-docs" />
                                    </ClipboardButton>
                                        {/* <button onClick={() => {
                                            // Copy the field in the clipboard
                                            navigator.clipboard.writeText(author?.address ? author.address : 'Empty');
                                        }}><i className="icon-docs" /></button> */}
                                    </div>
                                </div>
                                <div className="social-icons d-flex justify-content-center my-3">
                                    {
                                        author.twitter && <SocialIcon href={author.twitter} social="Twitter" icon="fab fa-twitter" />
                                    }
                                    {
                                        author.instagram && <SocialIcon href={author.instagram} social="Instagram" icon="fab fa-instagram" />
                                    }
                                    {
                                        author.facebook && <SocialIcon href={author.facebook} social="Facebook" icon="fab fa-facebook-f" />
                                    }
                                    {
                                        author.github && <SocialIcon href={author.github} social="Github" icon="fab fa-github" />
                                    }
                                </div>
                                <hr />
                                <div className="row d-flex justify-content-center">
                                    <ShareButton />
                                    {
                                        editMode &&
                                        <a className="btn btn-bordered-white btn-smaller" href="/edit" style={{
                                            marginLeft: '10px'
                                        }}>Edit</a>
                                    }
                                </div>

                            </div>
                        ) : null}
            </div>
        </div>
    );
}

export default AuthorProfile;