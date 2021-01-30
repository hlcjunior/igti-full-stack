import express from 'express';

import { accountModel } from '../models/accountModule.js';

import { AccountController, create } from '../controllers/accountController.js';

const router = express.Router();

const accountController = new AccountController();

//CREATE
router.post('/account', async (req, res, next) => {
    next(await create(req, res));
});

//DEPOSIT
router.patch('/account/deposit', async (req, _res, next) => {
    const { agencia, conta, valor } = req.body;

    const account = await accountController.deposit(agencia, conta, valor);

    next(account);
});

//WITHDRAWAL
router.patch('/account/withdrawal', async (req, _res, next) => {
    const { agencia, conta, valor } = req.body;

    const account = await accountController.withdrawal(agencia, conta, valor);

    next(account);
});

//BALANCE
router.get('/account/balance/:agencia/:conta', async (req, _res, next) => {
    const { agencia, conta } = req.params;

    const account = await accountController.balance(agencia, conta);

    next(account);
});

//DELETE
router.delete('/account/:agencia/:conta', async (req, _res, next) => {
    const { agencia, conta } = req.params;

    const account = await accountController.delete(agencia, conta);

    next(account);
});

//TRANSFER
router.patch('/account/transfer', async (req, _res, next) => {
    const { contaOrigem, contaDestino, valor } = req.body;

    const account = await accountController.transfer(
        contaOrigem,
        contaDestino,
        valor
    );

    next(account);
});

//AVG BALANCE
router.get('/account/avg-balance/:agencia', async (req, _res, next) => {
    const { agencia } = req.params;

    const avg = await accountController.avgBalance(agencia);

    next(avg);
});

//LOWEST BALANCES
router.get('/account/lowest-balances/:limit', async (req, _res, next) => {
    const { limit } = req.params;

    const lowestBalances = await accountController.lowestBalances(limit);

    next(lowestBalances);
});

//BIGGEST BALANCES
router.get('/account/biggest-balances/:limit', async (req, _res, next) => {
    const { limit } = req.params;

    const biggestBalances = await accountController.biggestBalances(limit);

    next(biggestBalances);
});

//TRANSFER LARGE BALANCES TO PRIVATE
router.patch('/account/transfer-to-private', async (req, _res, next) => {
    const transferred = await accountController.transferToPrivate();

    next(transferred);
});

router.use((result, _req, res, _) => {
    if (result.error) {
        res.status(result.status || 500).send({
            error: result.message,
        });
        return;
    }
    res.send(result);
});

export { router as accountRouter };
