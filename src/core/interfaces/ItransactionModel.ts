

interface MoneyValue {
    amount:number
    currency:string
}
export interface ITransactionDocument {
    TransactionID: string,
    CustomerID:string,
    input:MoneyValue,
    output:MoneyValue,
    transactionDate:string ,
    Transactionref:string
}