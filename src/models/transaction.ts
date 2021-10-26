import toDateTime from "../utils/to_date_time";

export default class Transaction {
    hash: string;
    from: string;
    to: string;
    event: string;
    tokenId: number;
    date: Date;

    constructor(hash, from, to, event, tokenId, date) {
        this.hash = hash;
        this.from = from;
        this.to = to;
        this.event = event;
        this.tokenId = tokenId;
        this.date = toDateTime(+date);
    }
}