const Account = require('../account/account.js');

class Person{
    static #accountNumber = 0;
    #accounts;
    #personID;
    #isActive;

    constructor(personID,firstName,lastName,age,isActive){
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.#personID = personID;
            this.#accounts = [];
            this.#isActive = isActive;
    }

    getAllAccounts(){
        return this.#accounts;
    }

    getPersonID(){
        return this.#personID;
    }

    getIsActive(){
        return this.#isActive;
    }

    static createNewPerson(personID,firstName,lastName,age){
            try{
               
                const account = Account.createNewAccount(Person.#accountNumber++);
                const person = new Person(personID,firstName,lastName,age,true);
                person.getAllAccounts().push(account);
                return person;
            }
            catch(error){
                console.log(error);
            }
    }

    createNewBankAccount(){
        try{
            const accountNo = Person.#accountNumber++;
            let  account = Account.createNewAccount(accountNo);
            this.#accounts.push(account);

        }
        catch(error){
            console.log(error);
        }
    }

    getAccountWithAccountID(accountID){
        try{
            if(typeof accountID !== "number")
                throw new Error("invalid account number entered");
            if(accountID<0 && accountID>=this.#accounts.length)
                throw new Error("account does not exist");

            for(let i=0;i<this.#accounts.length;i++){
                if(this.#accounts[i].getAccountNumer()===accountID && this.#accounts[i].getIsActive())
                    return this.#accounts[i];
            }
            throw new Error("account does not exist");

        }
        catch(error){
            console.log(error);
        }
    }

    transactionBetweenAccounts(account1,account2,amount){

        try{
            if(typeof amount !== "number")
                throw new Error("invalid amount number");
            const creditAccount = this.getAccountWithAccountID(account1);
            const debitAccount = this.getAccountWithAccountID(account2);
            creditAccount.credit(amount);
            debitAccount.debit(amount);
            console.log("transaction completed successfully");

        }
        catch(error){
            console.log(error);
        }
        
    }


    withdrawAmountWithAccountID(accountID,amount){
        try{
            if(typeof accountID !== "number")
                throw new Error("invalid account id");
            if(typeof amount !== "number")
                throw new Error("invalid amount number");

            this.getAccountWithAccountID(accountID).debit(amount);
            console.log("amount withdrawn successfully");

        }
        catch(error){
            console.log(error);
        }
    }

    deleteAccount(accountID){
        try{
            if(typeof accountID !== "number")
                throw new Error("invalid account number");
            const account = this.getAccountWithAccountID(accountID);
            let amount = account.deleteAccount();
            return amount;
        }
        catch(error){
            console.log(error);
        }
    }   

    deletePerson(){
        try{
            let totalBalance = 0;
            for(let i=0;i<this.#accounts.length;i++){
                let account = this.#accounts[i];
                if(account.getIsActive()){
                totalBalance += account.deleteAccount();
                }

                this.#isActive = false;
                return totalBalance;

            }

        }
        catch(error){
            console.log(error);
        }
    }

    totalBalanceInAllAccounts(){
        try{
            let totalBalance = 0;
            for(let i=0;i<this.#accounts;i++){
                let account = this.#accounts[i];
                if(account.getIsActive()){
                totalBalance += account.getAccountBalance();}
            }
            return totalBalance;

        }
        catch(error){
            console.log(error);
        }
    }





}


module.exports = Person;