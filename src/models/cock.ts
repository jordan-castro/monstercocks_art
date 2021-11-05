import fetchAttributes from "../controller/fetch_attributes";
import { fetchCock } from "../controller/fetch_cocks";
import { fetchOwner, fetchOwners } from "../controller/fetch_owner";
import { fecthTransactions, fetchCreatorTransaction } from "../controller/fetch_transactions";
import { addBaseToImage } from "../utils/add_base_to_image";
import { cockAmount, cockAmountFromServer } from "../utils/valid_id";
import Attribute from "./attribute";
import Owner from "./owner";
import Transaction from "./transaction";

export default class MonsterCock {
    id: number;
    name: string;
    uri: string;
    image: string;
    attributes?: Attribute[];
    owner?: Owner;
    owners?: Owner[];
    transactions?: Transaction[];
    creator?: Transaction;
    siblings?: {
        next: MonsterCock,
        previous: MonsterCock
    };

    constructor(id: number, name: string, uri: string, image: string) {
        this.id = id;
        this.name = name;
        this.uri = uri;
        this.image = addBaseToImage(image, true);
    }

    /**
     * Static function para crear un cock sobre su Id.
     * 
     * @param id
     * El id del cock.
     * 
     * @returns {MonsterCock}
     */
    static async createCock(id: number) {
        let cock = await fetchCock(id);
        return cock;
    }

    /**
     * Busca los attributos del cock.
     */
    async getAttributes() {
        let attributes = await fetchAttributes(this.id);
        // Chequea resulta
        if (attributes.length > 0) {
            this.attributes = attributes;
        }
    }

    /**
     * Ponemos el owner del cock.
     */
    async getOwner() {
        let owner = await fetchOwner(this.id);
        // Chequea owner funciono
        if (owner) {
            this.owner = owner;
        }
    }

    /**
     * Busca los owners del cock.
     * 
     * @param page 
     * La pagina a buscar. 
     */
    async getOwners(page?: number) {
        let owners = await fetchOwners(this.id, page)
        // Chequa resulta
        if (owners.length > 0) {
            this.owners = owners;
        }
    }

    /**
     * Busca las transacciones del cock.
     * 
     * @param page
     * La pagina a buscar.
     */
    async getTransactions(page?: number) {
        let txs = await fecthTransactions(this.id, page);
        // Chequea resulta
        if (txs.length > 0) {
            this.transactions = txs;
        }
    }

    /**
     * Busca el creador del cock.
     */
    async getCreator() {
        let creator = await fetchCreatorTransaction(this.id);
        // Chequea resulta
        if (creator) {
            this.creator = creator;
        }
    }

    /**
     * Busca cuantos cocks hay. Podemos buscar en el DB de central o el smart contract.
     * 
     * @param where
     * Si queremos buscar en el DB de central o en el smart contract.
     * 
     * @returns {number}
     */
    static async getCockCount(where?: string) {
        let count = 0;
        // Si queremos buscar en el smart contract
        if (where === "contract") {
            count = await cockAmount();
        } else {
            count = await cockAmountFromServer();
        }
        return count;
    }

    /**
     * Busca los siblings de un cock.
     */
    async getSiblings() {
        // Lambda para chequea si el cock es successo, si es asi lo agrega a la lista de siblings
        let addCock = (cock, siblings) => {
            if (cock) {
                siblings.push(cock);
            }
        }

        // Busca dos cocks al maximo.
        // Busca el cock anterior. Solo si el id es mayor que 1.
        // Busca el cock siguiente. Solo si el id es menor que el maximo.
        let siblings: MonsterCock[] = [];
        let max = await MonsterCock.getCockCount();
        let prev = this.id - 1;
        let next = this.id + 1;
        if (prev > 0) {
            let cock = await fetchCock(prev);
            addCock(cock, siblings);
        }
        if (next < max) {
            let cock = await fetchCock(next);
            addCock(cock, siblings);
        }

        // Chequea resulta
        if (siblings.length > 0) {
            this.siblings = {
                previous: siblings[0],
                next: siblings[1]
            };
        }
    }
}