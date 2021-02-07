const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const dbDate = (date) => {
    const dbDate = date.split('-');
    const day = dbDate[2];
    const month = dbDate[1];
    const year = dbDate[0];

    return { day, month, year };
};

const findByPeriod = async (req, res) => {
    const yearMonth = req.query.period;

    if (!yearMonth) {
        res.status(400).send({
            error:
                'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
        });
        return;
    }

    try {
        const data = await TransactionModel.find({ yearMonth }).sort({
            day: 1,
        });

        res.send({ length: data.length, transactions: data });
    } catch (error) {
        res.status(500).send({
            error: error.message || 'Erro ao listar transações',
        });
    }
};

const findByDescription = async (req, res) => {
    const description = req.query.description;

    if (!description) {
        res.status(400).send({
            error:
                'É necessário informar o parâmetro "description", para buscar',
        });
        return;
    }

    try {
        const data = await TransactionModel.find({ description }).sort({
            yearMonthDay: 1,
        });

        res.send({ length: data.length, transactions: data });
    } catch (error) {
        res.status(500).send({
            error: error.message || 'Erro ao listar transações por description',
        });
    }
};

const create = async (req, res) => {
    const { description, category, value, yearMonthDay, type } = req.body;

    if (!description || !category || !value || !yearMonthDay || !type) {
        res.status(400).send({
            error:
                'É necessário informar todos os campos para cadastrar uma transação',
        });
        return;
    }

    const { day, month, year } = dbDate(yearMonthDay);

    const transaction = new TransactionModel({
        description,
        value,
        category,
        year,
        month,
        day,
        yearMonth: `${year}-${month}`,
        yearMonthDay,
        type,
    });

    try {
        await transaction.save(transaction);

        res.send({ message: 'Transação inserida com sucesso', transaction });
    } catch (error) {
        res.status(500).send({
            error: error.message || 'Erro ao inserir a transação',
        });
    }
};

const update = async (req, res) => {
    const id = req.params.id;
    const { description, category, value, yearMonthDay } = req.body;

    if (!description || !category || !value || !yearMonthDay) {
        res.status(400).send({
            error:
                'É necessário informar todos os campos para atualizar uma transação',
        });
        return;
    }

    const { day, month, year } = dbDate(yearMonthDay);
    const newTransaction = {
        description,
        value,
        category,
        year,
        month,
        day,
        yearMonth: `${year}-${month}`,
        yearMonthDay,
    };

    try {
        const transaction = await TransactionModel.findByIdAndUpdate(
            { _id: id },
            newTransaction,
            {
                new: true,
            }
        );

        if (!transaction) {
            res.status(404).send({
                message: `Transação com id ${id} não encontrada para atualizar`,
            });
        } else {
            res.send({
                message: 'Transação atualizada com sucesso',
                transaction,
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message || 'Erro ao atualizar a transação',
        });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await TransactionModel.findByIdAndRemove(id);

        if (!data) {
            res.status(404).send({
                message: `Transação com id ${id} não encontrada para exclusão`,
            });
        } else {
            res.send({ message: 'Transação excluída com sucesso' });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message || 'Erro ao excluir a transação',
        });
    }
};

module.exports = { findByPeriod, findByDescription, create, update, remove };
