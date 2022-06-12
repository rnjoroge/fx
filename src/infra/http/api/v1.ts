import express from 'express'
import { transactionRouter } from '../../../modules/transaction/controller/index';

const v1Router = express.Router();

v1Router.use('/transaction', transactionRouter);

// All routes go here 

export { v1Router }