import { Either, Result, left, right } from "../../../../core/logic/Result";
import { GenericAppError } from "../../../../core/logic/AppError";
import { UseCase } from "../../../../core/domain/UseCase";
import {ITransactionRepo} from '../../../../core/interfaces/Irepo';
import {ITransactionDocument} from '../../../../core/interfaces/ItransactionModel'
import { Guard } from "../../../../core/logic/Guard";

type Response = Either<
  GenericAppError.UnexpectedError |
  Result<any>, 
  Result<void>
>


export class ListAllTransactionsUsecase implements UseCase<any, Promise<Response>>  {
    private transactionRepo: ITransactionRepo;

    constructor (transactionRepo:ITransactionRepo) {
        this.transactionRepo=transactionRepo;
    }
    async execute(request?: any): Promise<Response>  {
        try {
           let Transactions= await this.transactionRepo.listAllTransactions();
            return right(Result.ok<any>(Transactions.getValue()))  ;
        }
        catch (err) {
            return left(new GenericAppError.UnexpectedError(err.message)) as Response;
        }
    }
}  