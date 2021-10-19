import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import MonsterCock from "../../../models/cock";
import './cock.css';

/**
 * Una carta para un Cock.
 * 
 * @param cock
 * MonsterCock, el cock que va en la carta. 
 */
export function CockCard(props: { cock?: MonsterCock, main?: boolean }) {
    const { cock, main } = props;

    const cName = props.main !== undefined
        ? props.main
            ? 'cock-main' : 'cock-def'
        : 'cock-def';

    return (
        <div className={cName}>
            <Card>
                {
                    cock !== undefined ?
                        <CardMedia
                            component="img"
                            // height="800"
                            image={cock.image}
                        />
                        : null
                }
                {
                    main !== undefined && !main ?
                        <CardContent>
                            {
                                cock !== undefined ?
                                    <Typography variant="h5" component="div">
                                        {cock.name}
                                    </Typography> : null
                            }
                        </CardContent>
                        : null
                }
            </Card>
        </div>
    );
}