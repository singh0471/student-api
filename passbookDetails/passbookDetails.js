const Bank = require('./bank/bank.js');

class PassbookDetails{
    #passbookDetailsID;
    #date;
    #time;
    #transactionType;
    #currentAmount;

    constructor(passbookDetailsID,date,time,transactionType,currentAmount){
        this.#passbookDetailsID = passbookDetailsID;
        this.#date = date;
        this.#time = time;
        this.#transactionType = transactionType;
        this.#currentAmount = currentAmount;
    }

    static createNewPassbookDetails(passbookDetailsID,date){
        
    }

}