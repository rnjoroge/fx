

import { Mapper } from "../../../core/infra/Mapper";
import { Transaction } from '../domain/transaction.entity'

export class TransactionMap extends Mapper<Transaction> {

    public static toPersistence (tran: any): any {
        return {
            TransactionID: tran.TransactionID,
            CustomerID:tran.CustomerID,
            input:{
                amount:tran.input.amount,
                currency:tran.input.currency
            },
            output:{
                amount:tran.output.amount,
                currency:tran.output.currency
            },
            transactionDate:tran.transactionDate ,
            Transactionref:tran.Transactionref
        }
    }

}