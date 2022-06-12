
import {ListAlltransactionsController} from './listAllTransactionsController';
import {ListAllTransactionsUsecase} from './listAllTransactionsUseCase';
import {transactionFileRepoImpl} from '../../../../core/repository';

const listAllTransactionsUsecase = new ListAllTransactionsUsecase(transactionFileRepoImpl);
const listAlltransactionsController = new ListAlltransactionsController(listAllTransactionsUsecase);

export {
    listAlltransactionsController
}
