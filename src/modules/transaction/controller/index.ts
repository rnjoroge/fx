import express from 'express';

import {createTransactionController} from '../useCases/createTransaction';
import {getByTransactionIDController} from '../useCases/getTransactionBytransactionID';
import {listAlltransactionsController} from '../useCases/listTransactions';

/**
 * Transaction Api
 */

const transactionRouter = express.Router();

transactionRouter.post('/',
  (req, res) => createTransactionController.execute(req, res)
)

transactionRouter.get('/list',
  (req, res) => listAlltransactionsController.execute(req, res)
)

transactionRouter.get('/:TransactionID',
  (req, res) => getByTransactionIDController.execute(req, res)
)





export { transactionRouter };