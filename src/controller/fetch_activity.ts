import AuthorData from "../models/author";
import Owner from "../models/owner";
import Transaction from "../models/transaction";
import { MCK_BASE } from "../utils/globals";
import { API_COCK_GATEWAY, API_KEY } from "../utils/server_keys";
import valid_http from "../utils/valid_http";
import { parseAuthor } from "./fetch_author";
import { parseOwner } from "./fetch_owner";
import { parseTransaction } from "./fetch_transactions";

/**
 * Busca la activdad de MonsterCocks.art
 * 
 * @param {number} pageNumber Número de página a buscar
 * 
 * @return {Promise<Transaction[]>}
 */
const fetchActivity = async (pageNumber: number): Promise<{amount: number, txs: Transaction[]}> =>  {
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            q: "activity",
            p: API_KEY,
            n: pageNumber.toString(),
        }
    });

    // Chequea response es falso
    if (response === false) {
        return {
            amount: 0,
            txs: []
        };
    }

    let data = (response.data as any);

    // Todo bien!
    let amount = data.amount ? data.amount : 0;
    let transactionsJson = data.transactions ? data.transactions : [];

    // Crea los transationes
    let transactions: Transaction[] = [];

    for (let transaction of transactionsJson) {
        transactions.push(Transaction.fromActivity(transaction));
    }

    return {
        amount: amount,
        txs: transactions
    };
}

/**
 * Busca todos los owners de MonsterCocks.art.
 * 
 * @param {number} pageNumber Número de página a buscar
 * 
 * @return {Promise<Owner[]>}
 */
export const fetchAuthors = async (pageNumber: number): Promise<{amount: number, data?: {
    owner: Owner,
    author: AuthorData
}[] }> => {
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            q: "authors",
            p: API_KEY,
            n: pageNumber.toString(),
            // timeStamp: new Date().getTime().toString()
        }
    });

    // Chequea response es falso
    if (response === false) {
        return {
            amount: 0,
        };
    }

    let data = (response.data as any);

    // Todo bien!
    let amount = data.amount ? data.amount : 0;
    let json = data.owners ? data.owners : [];

    // Crea los transationes
    let authors: {owner: Owner, author: AuthorData}[] = [];

    for (let object of json) {
        let owner = parseOwner(object);
        let author = parseAuthor(object);

        authors.push({
            owner: owner,
            author: author
        });
    }

    return {
        amount: amount,
        data: authors
    }
}

export default fetchActivity;