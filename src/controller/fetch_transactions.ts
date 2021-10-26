import Transaction from "../models/transaction";
import { MCK_BASE } from "../utils/globals";
import { API_COCK_GATEWAY, API_KEY } from "../utils/server_keys";
import valid_http from "../utils/valid_http";
import { validId } from "../utils/valid_id";

/**
 * Busca los transactiones de un cock.
 * 
 * @param id
 * number, El id del cock.
 *  
 * @param pageNumber 
 * number?, La pagina para buscar.
 * 
 * @returns Promise<Transaction[]> 
 */
export async function fecthTransactions(id: number, pageNumber?: number): Promise<Transaction[]> {
    // Verifica ID
    if (!(await validId(id))) {
        return [];
    }

    // Llama API
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            q: 'txs',
            p: API_KEY,
            tokenId: id.toString(),
            n: pageNumber !== undefined ? pageNumber.toString() : '0'
        }
    });

    // Chequea falso
    if (response === false) {
        return [];
    }

    let transactions: Transaction[] = [];
    // Ahora hacemos parse
    for (var tx of (response.data as any[])) {
        transactions.push(parseTransaction(tx));
    }

    return transactions;
}

// TODO un transaction?!

const parseTransaction = (transactionData) => {
    return new Transaction(
        transactionData.hash,
        transactionData.addressFrom,
        transactionData.addressTo,
        transactionData.event,
        transactionData.tokenId,
        transactionData.date
    );
}