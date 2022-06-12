

import { ITransactionDocument } from '../interfaces/ItransactionModel';
import { Transaction } from '../../modules/transaction/domain/transaction.entity';
import {ITransactionRepo}  from '../interfaces/Irepo';
import {TransactionMap} from '../../modules/transaction/mappers/transaction.mapper'
import { Result } from "../logic/Result";

export default class TransactionFileRepoImpl implements ITransactionRepo {
    private txns:ITransactionDocument[]=[];

    constructor () {

    }
   async transactionidExists(transactionID: string): Promise<boolean> {
        let doc:ITransactionDocument =this.txns.find(element => element.TransactionID == transactionID);
        if(doc) {
            return true ;
        }else{
            return false ;
        }
    }
     listAllTransactions(): Result<ITransactionDocument[]> {
        return Result.ok<ITransactionDocument[]>(this.txns); ;
    }
    findTransactionByTransactionID(TransactionID: string): Result<ITransactionDocument> {
        let doc:ITransactionDocument =this.txns.find(element => element.TransactionID == TransactionID);
        if(doc) {
            return Result.ok<ITransactionDocument>(doc); ;
        }else{
            return Result.fail<Transaction>(" Transaction ID Not Found ")
        }

    }
    save(tran: Transaction): Promise<void> {
        
   // console.log(" persisting  == ",TransactionMap.toPersistence(tran.props));
    this.txns.push(TransactionMap.toPersistence(tran.props))

    return
    }

}
