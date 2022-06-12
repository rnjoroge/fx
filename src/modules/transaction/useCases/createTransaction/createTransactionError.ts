import { UseCaseError } from "../../../../core/logic/UseCaseError";
import { Result } from "../../../../core/logic/Result";


/**
 * Create Transaction Errors
 * Bussines Error that can happen During creation of a transaction
 *
 */

export namespace CreateTransactionErrors {

  export class InvalidTransactionAmount extends Result<UseCaseError> {    
    constructor (amount: number) {
      super(false, {
        message: `The Amount ${amount} is Invalid`
      } as UseCaseError)
    }
  }

  export class TransactionAlreadyExists extends Result<UseCaseError> {    
    constructor (TransactionID: string) {
      super(false, {
        message: `The TransactionID ${TransactionID}  already exists`
      } as UseCaseError)
    }
  }

}