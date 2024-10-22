import MonsterCock from '../models/cock';
import { API_COCK_GATEWAY, API_KEY } from '../utils/server_keys';
import { MCK_BASE } from '../utils/globals';
import { parseCock } from './parse_cocks';
import valid_http from '../utils/valid_http';
import connectToContract from './contract_con';
import { validId } from '../utils/valid_id';

/**
 * Hacemos un fetch del server para los cocks!
 * 
 * @param pageNumber
 * number?, el numero de pagina.
 * 
 * @returns `Promise<MonsterCock[]>`
 */
export async function fetchCocks(pageNumber?: number): Promise<MonsterCock[]> {
    // Los params
    const params = {
        q: 'cocks',
        p: API_KEY,
        n: pageNumber !== undefined ? pageNumber.toString() : '0'
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
 * 
 * Buscamos un cock sobre el smart contract por su ID.
 * 
 * @param id
 * number, El id del cock.
 * 
 * @returns `Promise<MonsteCock | false>`
 */
export async function fetchCock(id: number): Promise<MonsterCock | false> {
    if (!(await validId(id))) {
        return false;
    }

    // Ahora llama el API
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            p: API_KEY,
            q: 'cock',
            tokenId: id.toString()
        }
    })

    // Chequea no funciono
    if (response === false) {
        return false;
    }

    // Parse y regresa el cock
    return parseCock(response.data);
}

/**
 * Busca los cocks por un address.
 * 
 * @param address
 * string, El owner address del cock.
 * 
 * @returns `Promise<any>`
 */
export async function fetchCocksByOwner(address: string, pageNumber: number): Promise<any> {
    // Busca los cocks 
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            p: API_KEY,
            q: 'owned',
            n: pageNumber.toString(),
            address
        }
    });

    // Chequea que funcione
    if (response === false) {
        return {
            amount: 0,
            cocks: []
        };
    }

    // Crea el array
    let cocks: MonsterCock[] = [];

    // Ahora creamos los cocks! Usando parse.
    for (var cock of (response.data as any).cocks) {
        // Crea y pon el cock
        const parsedCock = parseCock(cock);
        cocks.push(parsedCock);
    }

    return {
        amount: (response.data as any).amount,
        cocks
    };
}

/**
 * Busca unos cocks desde el server por random.
 * 
 * @returns `Promise<MonsterCock[]>`
 */
export async function fetchRandomCocks(): Promise<MonsterCock[]> {
    // Busca los cocks
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            p: API_KEY,
            q: 'randomcocks'
        }
    });

    // Chequea que funcione
    if (response === false) {
        return [];
    }

    // Crea el array
    let cocks: MonsterCock[] = [];

    // Ahora creamos los cocks! Usando parse.
    for (var cock of (response.data as any)) {
        // Crea y pon el cock
        const parsedCock = parseCock(cock);
        cocks.push(parsedCock);
    }

    return cocks;
}

/**
 * Lee los cocks mas reciente. Buscamos en el api con el parametro `q=mostrecent`.
 * 
 * @returns `Promise<MonsterCock[]>`
 */
export async function fetchMostRecentCocks(): Promise<MonsterCock[]> { 
    // Busca los cocks
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            p: API_KEY,
            q: 'mostrecent'
        }
    });

    // Chequea que funcione
    if (response === false) {
        return [];
    }

    // Crea el array
    let cocks: MonsterCock[] = [];

    // Ahora creamos los cocks! Usando parse.
    for (var cock of (response.data as any)) {
        // Crea y pon el cock
        const parsedCock = parseCock(cock);
        cocks.push(parsedCock);
    }

    return cocks;
}

/**
 * Busca los cocks mas populares. Buscamos en el api con el parametro `q=mostpopcocks`.
 * 
 * @returns `Promise<MonsterCock[]>`
 */
export async function fetchMostPopularCocks(): Promise<MonsterCock[]> {
    // Busca los cocks
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            p: API_KEY,
            q: 'mostpopcocks'
        }
    });

    // Chequea que funcione
    if (response === false) {
        return [];
    }

    // Crea el array
    let cocks: MonsterCock[] = [];

    // Ahora creamos los cocks! Usando parse.
    for (var cock of (response.data as any)) {
        // Crea y pon el cock
        const parsedCock = parseCock(cock);
        cocks.push(parsedCock);
    }

    return cocks;
}

/**
 * Buscamos unos cocks por un search.
 * 
 * @param search
 * string, El search del cock.
 * 
 * @param page
 * number, El numero de pagina.
 * 
 * @returns {Promise<{amount: number, cocks: MonsterCock[]}>}
 */
export async function fetchCocksBySearch(search: string, page: number) {
    const params = {
        p: API_KEY,
        q: 'search',
        n: page.toString(),
        s: search,
        timestamp: new Date().getTime()
    };
    console.log(params);
    // Busca los cocks
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params
    });

    // Chequea que funcione
    if (response === false) {
        return {
            amount: 0,
            cocks: []
        }
    }

    console.log(response.data); 

    // Crea el array
    let cocks: MonsterCock[] = [];

    // Ahora creamos los cocks! Usando parse.
    for (var cock of (response.data as any).cocks) {
        // Crea y pon el cock
        const parsedCock = parseCock(cock);
        cocks.push(parsedCock);
    }

    return {
        amount: (response.data as any).amount,
        cocks
    };
}