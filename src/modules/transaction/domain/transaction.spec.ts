
import {Transaction} from './transaction.entity';
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { Money } from './money';


/**
 * Transaction  Entity Test spec
 *
 */

describe("Transaction Entity Testing", () => {
    // impilment unit test
    test("should return an instance of result type transaction entity ", () => {
      let input= Money.create(500,'KES');
      let output= Money.create(5,'USD');
      let Transactionref= new UniqueEntityID();
      const transactionOrError = Transaction.create({ 
        TransactionID: "1234",
        CustomerID:"1111",
        input:input.getValue() ,
        output:output.getValue(),
        transactionDate:new Date().toISOString()
      },Transactionref);
      expect(transactionOrError instanceof Result ).toBe(true);
    });
    

   
  });