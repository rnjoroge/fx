import { BaseController } from "../../../../core/infra/BaseController";
import { ListAllTransactionsUsecase } from './listAllTransactionsUseCase';

export class ListAlltransactionsController extends BaseController {

    private useCase: ListAllTransactionsUsecase;
  
    constructor (useCase: ListAllTransactionsUsecase) {
      super();
      this.useCase = useCase;
    }

    async executeImpl(): Promise<any> {
        try {     
            const result = await this.useCase.execute({});
            if(result.isRight()) {
                return this.ok(this.res,result.value.getValue());
            }
            if (result.isLeft()) {
              const error = result.value;
              return this.fail(error.errorValue().message);
              
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