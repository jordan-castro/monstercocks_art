import { Card, CardContent, Typography } from "@mui/material";
import MonsterCock from "../../models/cock";

/**
 * Una carta para un Cock.
 * 
 * @param cock
 * MonsterCock, el cock que va en la carta. 
 */
function CockCard(props: { cock?: MonsterCock }) {
    const { cock } = props;

    return (
        <Card>
            <CardContent>
                {
                    cock !== undefined ?
                        <img
                            src={cock.image}
                        /> : null
                }
                {cock !== undefined ? 
                <Typography variant="h5" component="div">
                    {cock.name}
                </Typography> : null
                }
            </CardContent>
        </Card>
    );
}