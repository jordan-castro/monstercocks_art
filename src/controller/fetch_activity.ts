import Owner from "../models/owner";
import Transaction from "../models/transaction";
import { MCK_BASE } from "../utils/globals";
import { API_COCK_GATEWAY, API_KEY } from "../utils/server_keys";
import valid_http from "../utils/valid_http";
import { parseTransaction } from "./fetch_transactions";

/**
 * Busca la activdad de MonsterCocks.art
 * 
 * @param {number} pageNumber Número de página a buscar
 * 
 * @return {Promise<Transaction[]>}
 */
const fetchActivity = async (pageNumber: number): Promise<Transaction[]> =>  {
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            q: "activity",
            p: API_KEY,
            n: pageNumber.toString(),
        }
    });

    // Chequea response es falso
    if (response === false) {
        return [];
    }

    let data = (response.data as any);

    // Todo bien!
    let amount = data.amount ? data.amount : 0;
    let transactionsJson = data.transactions ? data.transactions : [];

    // Crea los transationes
    let transactions: Transaction[] = [];

    for (let transaction of transactionsJson) {
        transactions.push(parseTransaction(transaction));
    }

    return transactions;
}
