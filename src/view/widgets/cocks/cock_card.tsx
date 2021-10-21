import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import MonsterCock from "../../../models/cock";
import './cock.css';
import { Loader } from "../loader";
import { height } from "@mui/system";

/**
 * Una carta para un Cock.
 */
export class CockCard extends React.Component<{ cock?: MonsterCock, main?: boolean }, { loading: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }
    /** 
     * El nombre dek css para el carta de cock 
     */
    cName = this.props.main !== undefined
        ? this.props.main
            ? 'cock-main' : 'cock-def'
        : 'cock-def';

    /**
     *  El elemento del imagen.
     */
    img() {
        return (
            <>
                <img
                    src={this.props.cock?.image}
                    onLoad={() => this.setState({
                        loading: false,
                    })}
                    style={{
                        display: this.state.loading ? 'none' : 'flex',
                    }}
                    className={this.cName}
                />
                <div
                    style={{
                        display: this.state.loading ? 'flex' : 'none',
                        justifyContent: 'center',
                        backgroundColor: 'black',
                        height: '800px'
                    }}
                >
                    <Loader
                        centerType='center-within-div'
                    />
                </div>
            </>
        );
    }

    render() {
        return (
            <div className={this.cName}>
                <Card>
                    {
                        this.props.cock !== undefined ?
                            this.img()
                            : null
                    }
                    {
                        this.props.main !== undefined && !this.props.main ?
                            <CardContent>
                                {
                                    this.props.cock !== undefined ?
                                        <Typography variant="h5" component="div">
                                            {this.props.cock.name}
                                        </Typography> : null
                                }
                            </CardContent>
                            : null
                    }
                </Card>
            </div>
        );
    }
}