export default class Transaction {
    constructor(readonly type: string, readonly amount: number) {
        this.type = type;
        this.amount = amount;
    }
}