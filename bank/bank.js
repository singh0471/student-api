const Person = require('../person/person.js');
class Bank{
    static #personID = 0;
    static #persons = [];

    static getAllPersons(){
        return Bank.#persons;
    }

    static createNewCustomer(firstName,lastName,age){
        try{
            if(typeof firstName !== "string")
                throw new Error("Invalid first name");
            if(typeof lastName !== "string")
                throw new Error("Invalid last name");
            if(typeof age !== "number")
                throw new Error("invalid age");
            const personID = Bank.#personID++;
            const person = Person.createNewPerson(personID,firstName,lastName,age);
            Bank.#persons.push(person);
            return person;

        }
        catch(error){
            console.log(error);
        }
    }


    static getPersonByID(personID){
        try{

            if(typeof personID !== "number")
                throw new Error("invalid person id");
            
            if(personID<0 || personID>=Bank.#personID)
                throw new Error("person id does not exists.");

            for(let i=0;i<Bank.#persons.length;i++){
                let person = Bank.#persons[i];
                if(person.getPersonID() === personID && person.getIsActive())
                    return person;
            }

            throw new Error("person id does not exists.");
            
        }
        catch(error){
            console.log(error);
        }
    }

    static createNewAccountWithPersonID(personID){
        try{
            const person = Bank.getPersonByID(personID);
            person.createNewBankAccount();          
        }
        catch(error){
            console.log(error);
        }
    }

    static totalBalanceWithPersonID(personID){
        try{
            if(typeof personID !== "number")
                throw new Error("invalid person id");
            const person = Bank.getPersonByID(personID);
            let totalAmount = person.totalBalanceInAllAccounts();
            return totalAmount;
        }

        catch(error){
            console.log(error);
        }
    }

    static withdrawAmountWithPersonID(personID,accountID,amount){
        try{
            if(typeof personID !== "number")
                throw new Error("invalid person id");
            if(typeof accountID !== "number")
                throw new Error("invalid account id");
            if(typeof amount !== "number")
                throw new Error("invalid amount");

            const person = Bank.getPersonByID(personID);
            const account = person.getAccountWithAccountID(accountID);
            account.debit(amount);
            console.log("amount withdrawn successfully");
            return;

        }
        catch(error){
            console.log(error);
        }
    }

    static depositAmountWithPersonID(personID,accountID,amount){
        try{
            if(typeof personID !== "number")
                throw new Error("invalid person id");
            if(typeof accountID !== "number")
                throw new Error("invalid account id");
            if(typeof amount !== "number")
                throw new Error("invalid amount");

            const person = Bank.getPersonByID(personID);
            const account = person.getAccountWithAccountID(accountID);
            account.credit(amount);
            console.log("amount deposited successfully");
            return;

        }
        catch(error){
            console.log(error);
        }
    }

    static transferBetweenAccountsOfSamePerson(personID,debitAccount,creditAccount,amount){
        try{
            if(typeof personID !== "number")
                throw new Error("invalid person id");
            if(typeof debitAccount != "number")
                throw new Error("invalid account number entered");
            if(typeof creditAccount != "number")
                throw new Error("invalid account number entered");
            if(typeof amount != "number")
                throw new Error("invalid ammount");

            const person = Bank.getPersonByID(personID);
            person.transactionBetweenAccounts(debitAccount,creditAccount,amount);
            console.log("transaction has been sucessfully completed");
        }
        catch(error){
            console.log(error);
        }
    }

    static transferBetweenDifferentPerson(debitorPersonID,creditorPersonID,debitorAccountNumber,creditorAccountNumber,amount){
        try{
            if(typeof debitorPersonID !== "number")
                throw new Error("invalid debitor person id");
            if(typeof creditorPersonID !== "number")
                throw new Error("invalid creditor person id");
            if(debitorAccountNumber !== "number")
                throw new Error("invalid debitor account number");
            if(creditorAccountNumber !== "number")
                throw new Error("invalid creditor account number");
            if(typeof amount !== "number")
                throw new Error("invalid amount entered");

            const debitorPerson = Bank.getPersonByID(debitorPersonID);
            const creditorPerson = Bank.getPersonByID(creditorPersonID);
            const debitorAccount = debitorPerson.getAccountWithAccountID(debitorAccountNumber);
            const creditorAccount = creditorPerson.getAccountWithAccountID(creditorAccountNumber);
            debitorAccount.debit(amount);
            creditorAccount.credit(amount);
            console.log("transaction successful");
            return;
        }
        catch(error){
            console.log(error);
        }
    }

    static viewAllAccountsBalanceWithPersonID(personID){
        try{
            if(typeof personID !== "number")
                throw new Error("invalid person id");

            const person = Bank.getPersonByID(personID);
            let totalAmount = 0;
            const allAccounts = person.getAllAccounts();
            for(let i=0;i<allAccounts.length;i++){
                let account = allAccounts[i];
                if(account.getIsActive()){
                let accountBalance = account.getAccountBalance();
                totalAmount += accountBalance;
                console.log(`account balance of account number ${account.getAccountNumber()} is ${accountBalance}`);}
            }
            console.log(`total balance across all account is ${totalAmount}`);
           
        }
        catch(error){
            console.log(error);
        }
    }


    static deleteAccountWithPersonID(personID,accountID){
        try{
            if(typeof personID !== "number")
                throw new Error("invalid person id");
            if(typeof accountID !== "number")
                throw new Error("invalid account id");

            const person = Bank.getPersonByID(personID);
            let amount = person.deleteAccount(accountID);
            console.log(`Rs ${amount} has been withdrawn and the account has been deleted`);
            return;

        }
        catch(error){
            console.log(error);
        }
    }

    static deletePersonWithPersonID(personID){
        try{
            if(typeof personID !== "number")
                throw new Error("invalid person id");
            const person = Bank.getPersonByID(personID);
            let totalBalance = person.deletePerson();
            console.log(`total amount of ${totalBalance} has been withdrawn and the customer has been deleted`);
            return;
        }
        catch(error){
            console.log(error);
        }
    }


}

module.exports = Bank;