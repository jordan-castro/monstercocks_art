import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';

export const Loader = (props) => {
    let { centerType } = props;

    if (centerType === undefined) {
        centerType = 'center-both';
    }

    return (
        <div
            className={centerType}
            style={props.style}>
            <Box>
                <CircularProgress />
            </Box>
        </div>
    );
}