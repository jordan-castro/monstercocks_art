import React from "react";
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";
import './ShareButton.css';

class ShareButton extends React.Component<{
    shareLink: string,
    shareTitle?: string,
}, {
    open: boolean,
}> {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render() {
        return (
            // Display a horizontal list of share buttons with a little space between them
            <div className="social-icons d-flex justify-content-center">
                <FacebookShareButton url={this.props.shareLink} quote={this.props.shareTitle}>
                    <div className="share-button card">
                        <i className="share-button-icon fab fa-facebook-f"></i>
                    </div>
                </FacebookShareButton>
                <TwitterShareButton url={this.props.shareLink} title={this.props.shareTitle}>
                    <div className="share-button card">
                        <i className="share-button-icon fab fa-twitter"></i>
                    </div>
                </TwitterShareButton>
                <TelegramShareButton url={this.props.shareLink} title={this.props.shareTitle}>
                    <div className="share-button card">
                        <i className="share-button-icon fab fa-telegram-plane"></i>
                    </div>
                </TelegramShareButton>
                <WhatsappShareButton url={this.props.shareLink} title={this.props.shareTitle}>
                    <div className="share-button card">
                        <i className="share-button-icon fab fa-whatsapp"></i>
                    </div>
                </WhatsappShareButton>
                <RedditShareButton url={this.props.shareLink} title={this.props.shareTitle}>
                    <div className="share-button card">
                        <i className="share-button-icon fab fa-reddit-alien"></i>
                    </div>
                </RedditShareButton>
            </div>
        );
    }
}

export default ShareButton;