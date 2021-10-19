import valid_http from "../utils/valid_http";
import connectToContract from "./contract_con";

/**
 * Busca el owner de un cock.
 * 
 * @param id
 * number, el id del cock.
 * 
 * @returns `Promise<string | false>`
 */
export default async function fetchOwner(id: number) {
    // Connecta al smart contract
    const contract = connectToContract();
    // Chequea que el id si existe
    const mostRecent = await contract.methods.mostRecentToken().call();

    // No existe
    if (id >= mostRecent || id < 0) {
        return false;
    } 

    // Busca owner
    const owner = await contract.methods.ownerOf(id).call();

    return (owner as string);
}