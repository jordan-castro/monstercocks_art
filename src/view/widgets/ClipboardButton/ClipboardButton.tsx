import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import React from "react";

class ClipboardButton extends React.Component<{
    whatToCopy: string;
}, {
    open: boolean;
}> {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClick = () => {
        navigator.clipboard.writeText(this.props.whatToCopy);
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <IconButton onClick={this.handleClick}>
                    {this.props.children}
                </IconButton>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message="Copied to clipboard"
                />
            </div>
        );
    }
}

export default ClipboardButton;