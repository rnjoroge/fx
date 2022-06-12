

import { BaseController } from "../../../../core/infra/BaseController";
import {CreateTransactionUsecase} from './createTransactio.usecase';
import {CreateTransactionDTO} from './createtransaction.dto';
import {CreateTransactionErrors} from './createTransactionError';

/**
 *  Create Transaction Controller
 *  a transaction controller that handles and process the api request for creating a transaction
 */
export class CreateTransactionController extends BaseController {
    private useCase: CreateTransactionUsecase;


    constructor (useCase: CreateTransactionUsecase) {
        super();
        this.useCase = useCase;
      }

     async  executeImpl(): Promise<any> {
        try {
            const dto: CreateTransactionDTO = this.req.body as CreateTransactionDTO;
            const result = await this.useCase.execute(dto);
            if(result.isRight()) {
                return this.ok(this.res,result.value.getValue());
            }
            if (result.isLeft()) {
              const error = result.value;
              switch (error.constructor) {
                case CreateTransactionErrors.TransactionAlreadyExists:
                  return this.conflict(error.errorValue().message)
                default:
                  return this.fail(error.error);
              }
            } 
            else {
              return this.ok(this.res,{result});
            }
      
          } catch (err) {
            return this.fail(err)
          }
        }
    
}  