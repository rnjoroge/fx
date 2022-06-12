
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { GenericAppError } from "../../../../core/logic/AppError";
import { UseCase } from "../../../../core/domain/UseCase";
import {CreateTransactionDTO} from './createtransaction.dto';
import {CreateTransactionErrors} from './createTransactionError';
import {Money} from '../../domain/money';
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import {Transaction} from '../../domain/transaction.entity';
import {ITransactionRepo} from '../../../../core/interfaces/Irepo';
import { v4 as uuid } from 'uuid';


type Response = Either<
  GenericAppError.UnexpectedError |
  CreateTransactionErrors.InvalidTransactionAmount |
  Result<any>, 
  Result<void>
>


/**
 * Create Transaction Usecase
 * Business usecase for creating a transaction
 *
 */


export class CreateTransactionUsecase implements UseCase<CreateTransactionDTO, Promise<Response>>  {
    private transactionRepo: ITransactionRepo;

    constructor (transactionRepo:ITransactionRepo) {
        this.transactionRepo=transactionRepo;
    }

   async execute(request?: CreateTransactionDTO): Promise<Response>  {
        try {
            

            let Transactionref= new UniqueEntityID("ref-".concat(uuid()));
             let inputOrError = Money.create(request.amount,request.currency);
             let outputOrError = this.CalculateOutput(request.amount,request.currency);
           
             const combinedPropsResult = Result.combine([ inputOrError, outputOrError ]);

             if (combinedPropsResult.isFailure) {
                return left(Result.fail<void>(combinedPropsResult.error)) as Response;
              }
          
            const transactionOrError = Transaction.create({ 
                TransactionID: request.TransactionID,
                CustomerID:request.CustomerID,
                input:inputOrError.getValue() ,
                output:outputOrError.getValue(),
                transactionDate:new Date().toISOString()
              },Transactionref);

            if (transactionOrError.isFailure) {
                return left(Result.fail<void>(transactionOrError.error)) as Response;
            }
            const transactionAlreadyExists = await this.transactionRepo.transactionidExists(request.TransactionID);
            if (transactionAlreadyExists) {
              return left(new CreateTransactionErrors.TransactionAlreadyExists(request.TransactionID)) as Response;
            }
  
            
            const tran: Transaction = transactionOrError.getValue();
            await this.transactionRepo.save(tran)
            return right(Result.ok<any>({Transactionref})) as Response;
          } catch (err) {
            return left(new GenericAppError.UnexpectedError(err)) as Response;
          }
    }

    private CalculateOutput(inputAmount:number,inputCurrency:string): Result<Money> {
         let rate=0.1;
         return Money.create(inputAmount*rate,inputCurrency);
    }

}