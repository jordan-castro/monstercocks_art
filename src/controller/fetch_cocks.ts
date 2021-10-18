import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import Abi from '../utils/abi.json';
import MonsterCock from '../models/cock';
import { API_COCK_GATEWAY, API_KEY } from '../utils/server_keys';
import axios from 'axios';
import { MCK_BASE } from '../utils/globals';
import { parseCock } from './parse_cocks';

/**
 * Hacemos un fetch del server para los cocks!
 * 
 * @returns `Promise<MonsterCock[]>`
 */
export async function fetchCocks(): Promise<MonsterCock[]> {
    // Los params
    const params = {
        q: 'cocks',
        p: API_KEY
    };

    // Busca la data del server
    let response = await axios.get(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params
    });

    // Crea el array
    let cocks: MonsterCock[] = [];

    // Ahora creamos los cocks! Usando parse.
    for (var x in response.data as any) {
        var cockJson = (response.data as any)[x];
        // Crea y pon el cock
        let cock = parseCock(cockJson);
        cocks.push(cock);
    }

    return cocks;
}