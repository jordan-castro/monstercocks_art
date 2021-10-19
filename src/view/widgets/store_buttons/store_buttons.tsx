import MonsterCock from "../../../models/cock";
import { OPENSEA_DARK_BANNER, OPENSEA_LIGHT_BANNER } from "../../../utils/globals";
import { openseaUrl } from "../../../utils/url_builder";
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import './store_buttons.css';

export enum StoreButtons { opensea, solart }

/**
 * Cremos un button para la tienda
 * 
 * @param props
 * Ejemplo:
 * ```
 * {
 *    type: StoreButtons,
 *    cock: MonsterCock
 * }
 * ``` 
 */
export const StoreButton = (props: { type: StoreButtons, cock: MonsterCock }) => {
    const { type, cock } = props;

    return (
        <ImageButton
            className="store-button"
            onClick={() => window.open(openseaUrl(cock.id))}
        >
            <img
                src={OPENSEA_LIGHT_BANNER}
            />
        </ImageButton>
    );
}

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));