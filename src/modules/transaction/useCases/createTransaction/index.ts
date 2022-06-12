
import {CreateTransactionUsecase} from './createTransactio.usecase';
import {CreateTransactionController} from './createTransaction.controller';
import {transactionFileRepoImpl} from '../../../../core/repository';


const createTransactionUsecase = new CreateTransactionUsecase(transactionFileRepoImpl);
const createTransactionController =new CreateTransactionController(createTransactionUsecase);
export {
    createTransactionController
  }