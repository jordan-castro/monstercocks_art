import connectToContract from "../controller/contract_con";
import { MCK_BASE } from "./globals";
import { API_COCK_GATEWAY, API_KEY } from "./server_keys";
import valid_http from "./valid_http";

/**
 * Chequea si un cock id es valido.
 * 
 * @param id
 * number, el id del cock.
 * 
 * @returns <Promise<boolean>> 
 */
export async function validId(id: number): Promise<boolean> {
    // Connecta a smart contract
    const maxCockId = await cockAmountFromServer();
    return (id < maxCockId && id >= 0);
}

/**
 * Busca el numero de monstercocks.
 * 
 * @returns `Promise<number>`
 */
 export async function cockAmount(contract?): Promise<number> {
    // Connecta !
    let con = contract === undefined ? connectToContract() : contract;

    // Busca
    let res = await con.methods.mostRecentToken().call();
    // Chequea resulta
    if (res === false) {
        return -1;
    }

    // Regresa! Y converte a Numero
    return +(res);
}

/**
 * Busca el numero de monstercocks por el server.
 * 
 * @returns `Promise<number>`
 */
export async function cockAmountFromServer(): Promise<number> {
    // Busca
    let res = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            q: 'camount',
            p: API_KEY,
        }
    });
    // Chequea resulta
    if (res === false) {
        return -1;
    }

    // Regresa! Y converte a Numero
    return (res.data as {amount: number}).amount;
}