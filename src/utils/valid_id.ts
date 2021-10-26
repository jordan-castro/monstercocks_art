import connectToContract from "../controller/contract_con";

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
    const maxCockId = await cockAmount();
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