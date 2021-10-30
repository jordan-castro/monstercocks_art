/**
 * Function to return the amount of pages based on the limit.
 * If the amout divided by the limit is rounded down, the amount of pages is the rounded down amount plus one.
 * If the amount divided by the limit is rounded up, the amount of pages is the rounded up amount.
 * 
 * @param amount
 * number of items 
 * @param limit 
 * limit of items per page
 * 
 * @returns `number`
 */
const pageAmount = (amount, limit) => {
    const amountOfPages = Math.floor(amount / limit);
    const remainder = amount % limit;

    if (remainder === 0) {
        return amountOfPages;
    } else {
        return amountOfPages + 1;
    }
}

export default pageAmount;