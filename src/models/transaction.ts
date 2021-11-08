import { addBaseToImage } from "../utils/add_base_to_image";
import toDateTime from "../utils/to_date_time";

export default class Transaction {
    hash: string;
    from: string;
    to: string;
    event: string;
    tokenId: number;
    date: Date;
    image?: string;
    name?: string;
    fromName?: string;
    fromImage?: string;
    toName?: string;
    toImage?: string;

    constructor(hash, from, to, event, tokenId, date) {
        this.hash = hash;
        this.from = from;
        this.to = to;
        this.event = event;
        this.tokenId = tokenId;
        this.date = toDateTime(+date);
    }

    /**
     * Constructor para la actividad.
     * 
     * @returns {Transaction}
     */
    static fromActivity(activity) {
        let transaction = new Transaction(
            activity.hash,
            activity.addressFrom,
            activity.addressTo,
            activity.event,
            activity.tokenId,
            activity.date
        );

        transaction.image = activity.image ? addBaseToImage(activity.image) : undefined;
        transaction.name = activity.name;
        transaction.fromName = activity.fromName;
        transaction.fromImage = activity.fromImage ? addBaseToImage(activity.fromImage) : undefined;
        transaction.toName = activity.toName;
        transaction.toImage = activity.toImage ? addBaseToImage(activity.toImage) : undefined;

        return transaction;
    }
}