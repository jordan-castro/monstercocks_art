import Snackbar from "@material-ui/core/Snackbar";
import React from "react";


class ShareButton extends React.Component<{
    shareLink?: string,
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

    handleClick = () => {
        navigator.clipboard.writeText(this.props.shareLink ? this.props.shareLink : window.location.href);
        this.setState({ open: true });
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ open: false });
    }

    render() {
        return (
            <div>
                <button
                    className="btn btn-bordered-white btn-smaller"
                    onClick={this.handleClick}>
                    <i className="icon-share" style={{
                        marginRight: '5px',
                    }} />
                    {this.props.shareTitle ? this.props.shareTitle : "Share"}
                </button>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id",
                    }}
                    message={<span id="message-id">Copied to clipboard</span>}
                />
            </div>
        );
    }
}

export default ShareButton;