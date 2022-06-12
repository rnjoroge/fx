import { Result } from "../../../../core/logic/Result";
import { UseCaseError } from "../../../../core/logic/UseCaseError";

export namespace getTransactionbyTransactionIDErrors {

  export class InvalidTransactionID extends Result<UseCaseError> {    
    constructor (transactionID: string) {
      super(false, {
        message: `The Transactionid ${transactionID} is Invalid`
      } as UseCaseError)
    }
  }
}