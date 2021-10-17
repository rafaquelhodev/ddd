import AccountRepository from "./AccountRepository";
import Observer from "./Observer";
import TransferCommand from "./TransferCommand";

export default class TransferHandler implements Observer {
    operation = "transfer";

    constructor(readonly accountRepository: AccountRepository) {
    }

    notify(command: TransferCommand): void {
        const accountFrom = this.accountRepository.get(command.accountFrom);
        const accountTo = this.accountRepository.get(command.accountTo);
        if (accountFrom && accountTo) {
            accountFrom.debit(command.amount);
            accountTo.credit(command.amount);
        }
    }

}