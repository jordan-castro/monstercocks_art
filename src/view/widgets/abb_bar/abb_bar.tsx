import { AppBar } from "@mui/material";
import React from "react";

export class MCKAppBar extends React.Component<{startPos: number}, {position: number}> {
    constructor(props) {
        super(props)
        this.state = {
            position: props.startPos
        };
    }

    render() {
        return (
            <div></div>
        );
    }
}