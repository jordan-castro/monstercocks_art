import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import Abi from '../utils/abi.json';
import MonsterCock from '../models/cock';
import { API_COCK_GATEWAY, API_KEY } from '../utils/server_keys';
import axios from 'axios';
import { MCK_BASE, CONTRACT_ADDRESS } from '../utils/globals';
import { parseCock } from './parse_cocks';
import valid_http from '../utils/valid_http';

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
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params
    });
    // Chequea para suggestion de compiler
    if (response === false) {
        return [];
    }

    // Crea el array
    let cocks: MonsterCock[] = [];

    // Ahora creamos los cocks! Usando parse.
    for (var x in response.data as any) {
        const cockJson = (response.data as any)[x];
        // Crea y pon el cock
        const cock = parseCock(cockJson);
        cocks.push(cock);
    }

    return cocks;
}

/**
 * Buscamos un cock sobre el smart contract por su ID.
 * 
 * @param id
 * number, El id del cock.
 * 
 * @returns `Promise<MonsteCock | false>`
 */
export async function fetchCock(id: number): Promise<MonsterCock | false> {
    // Connecta a web3.
    const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com/"));
    // Connecta el contract
    const contract = new web3.eth.Contract(Abi as AbiItem[], CONTRACT_ADDRESS)
    // Busca el max que puede ser un cock.
    const maxCockId = await contract.methods.mostRecentToken().call();

    // No existe
    if (id >= maxCockId) {
        return false;
    } else if (id < 0) {
        return false;
    }

    // Busca el uri del token
    const uri = await contract.methods.tokenURI(id).call();

    // Chequea por error
    if (uri === false) {
        return false;
    }

    // Funciono! busca con get!
    const response = await valid_http(uri);
    // Chequea por suggestion de compiler
    if (response === false) {
        return false;
    }

    // Ok tenemos data
    const cock = parseCock(response.data);

    return cock;
}