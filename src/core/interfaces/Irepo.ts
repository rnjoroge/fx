
import {Transaction} from '../../modules/transaction/domain/transaction.entity';
import {ITransactionDocument} from './ItransactionModel';
import { Result } from "../logic/Result";

export interface ITransactionRepo {
    listAllTransactions(): Result<ITransactionDocument[]>;
    findTransactionByTransactionID (TransactionID: string): Result<ITransactionDocument>;
    save(tran: Transaction): Promise<void>;
    transactionidExists(transactionID: string): Promise<boolean>;
  }