import toDateTime from "../utils/to_date_time";

export default class Owner {
    address: string;
    previous: string;
    tokenId: number;
    date: Date;
    isCurrentOwner: boolean;

    constructor(address, previous, tokenId, date, isCurrentOwner) {
        this.address = address;
        this.previous = previous;
        this.tokenId = tokenId;
        this.date = toDateTime(+date);
        this.isCurrentOwner = isCurrentOwner;
    }
}