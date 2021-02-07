const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService');

transactionRouter.get('/', service.findByPeriod);
transactionRouter.get('/description', service.findByDescription);
transactionRouter.post('/', service.create);
transactionRouter.patch('/:id', service.update);
transactionRouter.delete('/:id', service.remove);

module.exports = transactionRouter;
