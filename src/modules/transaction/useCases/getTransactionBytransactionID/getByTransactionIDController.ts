
import { BaseController } from "../../../../core/infra/BaseController";
import {GetByTransactionIDUsecase} from './getByTransactionIDUseCase';
import {getByTransactionidDTO} from './getByTranIdDTO';
import {getTransactionbyTransactionIDErrors} from './getByTransactionIDError';


export class GetByTransactionIDController extends BaseController {

    private useCase: GetByTransactionIDUsecase;
  
    constructor (useCase: GetByTransactionIDUsecase) {
      super();
      this.useCase = useCase;
    }


    async executeImpl(): Promise<any> {
       try {
        const dto: getByTransactionidDTO = {
            TransactionID:this.req.params.TransactionID
        }
        
        const result = await this.useCase.execute(dto);
        if(result.isRight()) {
            return this.ok(this.res,result.value.getValue());
        }
        if (result.isLeft()) {
          const error = result.value;
          switch (error.constructor) {
            case getTransactionbyTransactionIDErrors.InvalidTransactionID:
              return this.fail(error.errorValue().message);
            default:
                return this.fail(error.errorValue().message);
          }
          
        } 
        else {
            return this.ok(this.res,result);
        }
       }
       catch (err) {
         return this.fail(err)
       }
    }

}  
