import { ValueObject } from "../../../core/domain/ValueObject";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";

interface MoneyProps {
  currency: string;
  amount:number
}

export class Money extends ValueObject<MoneyProps> {
  get amount (): number {
    return this.props.amount;
  }
  get currency (): string {
    return this.props.currency;
  }
  
  private constructor (props: MoneyProps) {
    super(props);
  }

  public static create (amount:number,currency: string): Result<Money> {
     const guardedProps = [
        { argument: amount, argumentName: 'amount' },
        { argument: currency, argumentName: 'currency' },
      ];
    if(amount < 0) {
        return Result.fail<Money>(" The amount is less than zero "); 
    }
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<Money>(guardResult.message);
    } else {
       // let mn= parseFloat(Number.parseFloat(amount.toString()).toFixed(2));
      return Result.ok<Money>(new Money({amount,currency:currency.toUpperCase()}))
    }
  }
}