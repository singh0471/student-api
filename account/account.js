const PassbookDetails = require('../passbookDetails/passbookDetails.js');
class Account{
    #accountNumber;
    #accountBalance;
    #isActive;
    #passbook;
    static #passbookDetailsID = 0;


    constructor(accountNumber,accountBalance,isActive){
        this.#accountNumber = accountNumber;
        this.#accountBalance = accountBalance;
        this.#isActive = isActive;
        this.#passbook = [];
    }

    getAccountNumer(){
        return this.#accountNumber;
    }

    getAccountBalance(){
        return this.#accountBalance;
    }

    getIsActive(){
        return this.#isActive;
    }

    deleteAccount(){

        try{
            const amount = this.#accountBalance;
            this.debit(amount);
            this.#isActive = false;
            return amount;
        }
        catch(error){
            console.log(error);
        }
        
        
    }

    static createNewAccount(accountNumber){
            try{
                if(typeof accountNumber != "number")
                    throw new Error("invalid account number");

                const account = new Account(accountNumber,1000,true);
                return account;

            }
            catch(error){
                console.log(error);
            }
    }

    debit(amount){
        try{
            if(typeof amount !== "number")
                throw new Error("invalid amount");
            if(amount>this.#accountBalance)
                throw new Error("insufficient balance");
            this.#accountBalance -= amount;
            
            return;
        }
        catch(error){
            console.log(error);
        }
    }

    credit(amount){
        try{
            if(typeof amount !== "number")
                throw new Error("invalid amount");
            
            this.#accountBalance += amount;
            

            return;
        }
        catch(error){
            console.log(error);
        }
    }
    

    
}


module.exports = Account;