import AccountApplicationService from "./AccountApplicationService";
import AccountBuilder from "./AccountBuilder";
import AccountRepositoryMemory from "./AccountRepositoryMemory";
import CreditHandler from "./CreditHandler";
import DebitHandler from "./DebitHandler";
import Publisher from "./Publisher";
import TransferHandler from "./TransferHandler";

let service: AccountApplicationService;

beforeEach(function () {
    const repo = new AccountRepositoryMemory();

    const publisher = new Publisher();
    publisher.register(new CreditHandler(repo));
    publisher.register(new DebitHandler(repo));
    publisher.register(new TransferHandler(repo));

    service = new AccountApplicationService(publisher, repo);
});

test("Should create account", function () {
    const account = new AccountBuilder("345.678.312-2")
        .setBank("033")
        .setBranch("001")
        .setAccount("1234")
        .build();

    expect(account.getBalance()).toBe(0);
});

test("Should create account and make a credit", function () {
    service.create("345.678.312-2");
    service.credit("345.678.312-2", 1000);
    const account = service.get("345.678.312-2");
    expect(account.getBalance()).toBe(1000);
});

test("Should create account and make a debit", function () {
    service.create("345.678.312-2");
    service.credit("345.678.312-2", 1000);
    service.debit("345.678.312-2", 500);
    const account = service.get("345.678.312-2");
    expect(account.getBalance()).toBe(500);
});

test("Should create two accounts and transfer money", function () {
    service.create("345.678.312-2");
    service.credit("345.678.312-2", 1000);

    service.create("999.678.312-2");
    service.credit("999.678.312-2", 500);

    service.transfer("345.678.312-2", "999.678.312-2", 700);

    const accountFrom = service.get("345.678.312-2");
    const accountTo = service.get("999.678.312-2");

    expect(accountFrom.getBalance()).toBe(300);
    expect(accountTo.getBalance()).toBe(1200);
});