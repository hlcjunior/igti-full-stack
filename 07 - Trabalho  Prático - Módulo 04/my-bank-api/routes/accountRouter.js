import express from 'express';

import { accountModel } from '../models/accountModule.js';

import { AccountController } from '../controllers/accountController.js';

const router = express.Router();

const accountController = new AccountController();

const msgNotAccount = (agencia, conta) => {
    return `Não foi encontrada a conta nº ${conta} na agência nº ${agencia}`;
};

//CREATE
router.post('/account', async (req, res, next) => {
    try {
        const account = await accountController.create(req.body);

        res.send(account);
    } catch (error) {
        next(error);
    }
});

//DEPOSIT
router.patch('/account/deposit', async (req, res, next) => {
    try {
        const { agencia, conta, valor } = req.body;

        const account = await accountController.deposit(agencia, conta, valor);

        res.send(account);
    } catch (error) {
        next(error);
    }
});

//WITHDRAWAL
router.patch('/account/withdrawal', async (req, res, next) => {
    try {
        const { agencia, conta, valor } = req.body;

        const account = await accountController.withdrawal(
            agencia,
            conta,
            valor
        );

        res.send(account);
    } catch (error) {
        next(error);
    }
});

//BALANCE
router.get('/account/balance/:agencia/:conta', async (req, res, next) => {
    try {
        const { agencia, conta } = req.params;

        const account = await accountController.balance(agencia, conta);

        res.send(account);
    } catch (error) {
        next(error);
    }
});

//DELETE
router.delete('/account/:agencia/:conta', async (req, res, next) => {
    try {
        const { agencia, conta } = req.params;

        const account = await accountController.delete(agencia, conta);

        res.send(account);
    } catch (error) {
        next(error);
    }
});

//TRANSFER
router.patch('/account/transfer', async (req, res, next) => {
    try {
        const { contaOrigem, contaDestino, valor } = req.body;

        const account = await accountController.transfer(
            contaOrigem,
            contaDestino,
            valor
        );

        res.send(account);
    } catch (error) {
        next(error);
    }
});

//AVG BALANCE
router.get('/account/avg-balance/:agencia', async (req, res, next) => {
    try {
        const { agencia } = req.params;

        const avg = await accountController.avgBalance(agencia);

        res.send(avg);
    } catch (error) {
        next(error);
    }
});

//LOWEST BALANCES
router.get('/account/lowest-balances/:limit', async (req, res, next) => {
    try {
        const { limit } = req.params;

        const lowestBalances = await accountController.lowestBalances(limit);

        res.send(lowestBalances);
    } catch (error) {
        next(error);
    }
});

//BIGGEST BALANCES
router.get('/account/biggest-balances/:limit', async (req, res, next) => {
    try {
        const { limit } = req.params;

        const biggestBalances = await accountController.biggestBalances(limit);

        res.send(biggestBalances);
    } catch (error) {
        next(error);
    }
});

//TRANSFER LARGE BALANCES TO PRIVATE
router.patch('/account/transfer-to-private', async (req, res, next) => {
    try {
        const transferred = await accountController.transferToPrivate();

        res.send(transferred);
    } catch (error) {
        next(error);
    }
});

router.use((error, _req, res, _) => {
    res.status(error.status || 500).send({
        error: error.message,
    });
});

export { router as accountRouter };
