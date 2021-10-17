import Command from "./Command";

export default class CreditCommand implements Command {
    operation = "debit"

    constructor(readonly accountDocument: string, readonly amount: number) {
    }

}