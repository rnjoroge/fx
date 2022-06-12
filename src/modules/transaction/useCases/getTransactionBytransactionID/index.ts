
import {GetByTransactionIDController} from './getByTransactionIDController';
import { GetByTransactionIDUsecase } from './getByTransactionIDUseCase';
import {transactionFileRepoImpl} from '../../../../core/repository';

const getByTransactionIDUsecase = new GetByTransactionIDUsecase(transactionFileRepoImpl);
const getByTransactionIDController = new GetByTransactionIDController(getByTransactionIDUsecase);

export {
    getByTransactionIDController
}