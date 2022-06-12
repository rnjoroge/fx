


/**
 * Create Transaction Data Transasfer Object
 * An Object Representing create transaction request 
 *
 */
export interface CreateTransactionDTO {
    TransactionID: string;
    CustomerID:string,
    amount:number,
    currency:string 
  }