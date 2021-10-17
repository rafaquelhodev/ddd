import Account from "./Account";
import AccountRepository from "./AccountRepository";

export default class AccountRepositoryMemory implements AccountRepository {
    accounts: Account[];

    constructor() {
        this.accounts = [];
    }

    get(document: string): Account {
        const account = this.accounts.find(account => account.document == document);
        if (!account) throw new Error("Account not found");
        return account;
    }

    save(account: Account) {
        this.accounts.push(account);
    }
}