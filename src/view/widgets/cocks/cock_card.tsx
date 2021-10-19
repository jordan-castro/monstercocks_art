import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import MonsterCock from "../../../models/cock";
import './cock.css';
import Skeleton from '@mui/material/Skeleton';

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
    cName = this.props.main !== undefined
        ? this.props.main
            ? 'cock-main' : 'cock-def'
        : 'cock-def';

    img() {
        return this.state.loading ? <Skeleton
            sx={{ bgcolor: 'grey.900' }}
            variant="rectangular"
            width={'1000'}
            height={800}
        /> : <CardMedia
            component='img'
            // height="800"
            image={this.props.cock?.image}
            onLoad={function () {
                console.log("Cargado");
            }}
        />;
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