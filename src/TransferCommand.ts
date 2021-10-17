import Command from "./Command";

export default class CreditCommand implements Command {
    operation = "transfer"

    constructor(readonly accountFrom: string,
        readonly accountTo: string,
        readonly amount: number) {
    }
}