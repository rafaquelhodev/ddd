import AccountBuilder from "./AccountBuilder";
import AccountRepository from "./AccountRepository";
import CreditCommand from "./CreditCommand";
import DebitCommand from "./DebitCommand";
import Publisher from "./Publisher";
import TransferCommand from "./TransferCommand";

export default class AccountApplicationService {

    constructor(readonly publisher: Publisher, readonly accountRepository: AccountRepository) {
    }

    create(document: string) {
        const account = new AccountBuilder(document).build();
        this.accountRepository.save(account);
    }

    credit(document: string, amount: number) {
        const creditCommand = new CreditCommand(document, amount);
        this.publisher.publish(creditCommand);
    }

    debit(document: string, amount: number) {
        const creditCommand = new DebitCommand(document, amount);
        this.publisher.publish(creditCommand);
    }

    transfer(documentFrom: string, documentTo: string, amount: number) {
        const transferCommand = new TransferCommand(documentFrom, documentTo, amount);
        this.publisher.publish(transferCommand);
    }

    get(document: string) {
        return this.accountRepository.get(document);
    }

}