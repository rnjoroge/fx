import { Either, Result, left, right } from "../../../../core/logic/Result";
import { GenericAppError } from "../../../../core/logic/AppError";
import { UseCase } from "../../../../core/domain/UseCase";
import {ITransactionRepo} from '../../../../core/interfaces/Irepo';
import {getByTransactionidDTO} from './getByTranIdDTO';
import {getTransactionbyTransactionIDErrors} from './getByTransactionIDError';
import {ITransactionDocument} from '../../../../core/interfaces/ItransactionModel'
import { Guard } from "../../../../core/logic/Guard";

type Response = Either<
  GenericAppError.UnexpectedError |
  getTransactionbyTransactionIDErrors.InvalidTransactionID |
  Result<any>, 
  Result<void>
>

export class GetByTransactionIDUsecase implements UseCase<getByTransactionidDTO, Promise<Response>>  {
    private transactionRepo: ITransactionRepo;

    constructor (transactionRepo:ITransactionRepo) {
        this.transactionRepo=transactionRepo;
    }

   async execute(request: getByTransactionidDTO): Promise<Response>  {
        try {
           let guardedRequest= Guard.againstNullOrUndefined(request.TransactionID,"TransactionID");

           if (!guardedRequest.succeeded) {
              return left(new GenericAppError.UnexpectedError(guardedRequest.message)) as Response;
          } 

           let TransactionDocument=await this.transactionRepo.findTransactionByTransactionID(request.TransactionID);
           const TransactionFound = !!TransactionDocument === true;

           if (TransactionDocument.isFailure) {
            return left(
              new getTransactionbyTransactionIDErrors.InvalidTransactionID(request.TransactionID)
            ) as Response
          }
           return right(Result.ok<any>(TransactionDocument.getValue()))  ;
        }
        catch (err) {
            return left(new GenericAppError.UnexpectedError(err.message)) as Response;
        }
    }
}  