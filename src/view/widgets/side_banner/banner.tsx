import MonsterCock from "../../../models/cock";
import { CONTRACT_ADDRESS } from "../../../utils/globals";
import './banner.css';
import shortenString, { shortenAddress } from '../../../utils/shorten_string';
import { Link } from "@mui/material";
import { StoreButton, StoreButtons } from "../store_buttons/store_buttons";

const H = (props: { title: string, value, onClick?, blueify?: boolean }) =>
    <div className="banner-child">
        <span className="banner-title">
            {props.title}
        </span>
        <span
            className="banner-value"
            onClick={props.onClick}
            style={{
                color: props.blueify !== undefined
                    ? props.blueify ? 'darkblue' : 'white'
                    : 'white'
            }}
        >
            {shortenString(props.value, 20)}
        </span>
    </div>

/**
 * El Elemento para el CockPage banner.
 * 
 * @props
 * 
 * ```
 * {
 *    owner: string,
 *    cock: MonsterCock,
 *    blockNumber: number,
 * }
 * ``` 
 */
export function Banner(props: { owner: string, cock: MonsterCock }) {
    const { owner, cock } = props;

    return (
        <>
            <div className="banner">
                <h1>Token Data</h1>
                <div className="banner-data">
                    <H
                        title={'Name'}
                        value={cock.name}
                    />
                    <H
                        title={'Id'}
                        value={cock.id}
                    />
                    <Link onClick={() => window.open(cock.uri)}>
                        <H
                            title={'Token URI'}
                            value={cock.uri}
                        />
                    </Link>
                    <Link onClick={() => window.open(cock.image)}>
                        <H
                            title={'Image source'}
                            value={cock.image}
                        />
                    </Link>
                    <H
                        title={'Owner'}
                        value={shortenAddress(owner)}
                    />
                    <H
                        title={'Chain'}
                        value={'Polygon'}
                    />
                    <H
                        title={'Address'}
                        value={shortenAddress(CONTRACT_ADDRESS)}
                    />
                </div>
                <div className="banner-button">
                    <StoreButton
                        type={StoreButtons.opensea}
                        cock={cock}
                    />
                </div>
            </div>
        </>
    );
}