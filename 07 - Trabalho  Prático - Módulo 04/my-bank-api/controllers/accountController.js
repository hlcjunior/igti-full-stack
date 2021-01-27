import { accountModel } from '../models/accountModule.js';

const msgNotAccount = (branch, accountNumber) => {
    return `Não foi encontrada a conta nº ${accountNumber} na agência nº ${branch}`;
};

class AccountController {
    async create(fields) {
        try {
            const account = new accountModel(fields);

            await account.save();

            return account;
        } catch (error) {
            throw new Error(`Falha ao inserir a conta: ${error}`);
        }
    }

    async deposit(branch, accountNumber, value) {
        try {
            if (value <= 0) {
                throw new Error(
                    'O depósito só aceita valores maiores que 0 (zero)'
                );
            }

            const filter = { agencia: branch, conta: accountNumber };
            const set = {
                $inc: {
                    balance: value,
                },
            };
            const options = {
                new: true,
                projection: { _id: 0, balance: 1 },
            };

            const account = await accountModel.findOneAndUpdate(
                filter,
                set,
                options
            );

            if (!account) {
                throw new Error(msgNotAccount(branch, accountNumber));
            }

            return account;
        } catch (error) {
            throw new Error(
                `Falha ao fazer o depósito na conta: ${error.message}`
            );
        }
    }

    async withdrawal(branch, accountNumber, value, rate = 1) {
        try {
            if (value <= 0) {
                throw new Error('Informe um valor maior que 0 (zero)');
            }

            const filter = { agencia: branch, conta: accountNumber };

            const account = await accountModel.findOne(filter);

            if (!account) {
                throw new Error(msgNotAccount(branch, accountNumber));
            }

            const balance = account.balance - (value + rate);
            if (balance < 0) {
                throw new Error(
                    `Seu saldo de ${account.balance} é insuficiente`
                );
            }

            const set = {
                balance: balance,
            };
            const options = {
                new: true,
                projection: { _id: 0, balance: 1 },
            };
            const updatedAccount = await accountModel.findOneAndUpdate(
                filter,
                set,
                options
            );

            return updatedAccount;
        } catch (error) {
            throw new Error(
                `Falha ao fazer o saque da conta: ${error.message}`
            );
        }
    }

    async balance(branch, accountNumber) {
        try {
            const filter = { agencia: branch, conta: accountNumber };

            const account = await accountModel.findOne(filter, {
                _id: 0,
                balance: 1,
            });

            if (!account) {
                throw new Error(msgNotAccount(branch, accountNumber));
            }

            return account;
        } catch (error) {
            throw new Error(
                `Falha ao buscar o saldo da conta: ${error.message}`
            );
        }
    }

    async delete(branch, accountNumber) {
        try {
            const filter = { agencia: branch, conta: accountNumber };

            const account = await accountModel.findOneAndDelete(filter);

            if (!account) {
                throw new Error(msgNotAccount(branch, accountNumber));
            }

            const totalAccounts = await accountModel
                .where({ agencia: parseInt(branch) })
                .countDocuments();

            return { totalAccounts };
        } catch (error) {
            throw new Error(`Falha ao excluir a conta: ${error.message}`);
        }
    }

    async transfer(accountNumberOrigin, accountNumberTarget, value) {
        try {
            let rate = 0;

            const filterOrigin = { conta: accountNumberOrigin };
            const filterTarget = { conta: accountNumberTarget };

            const accountOrigin = await accountModel.findOne(filterOrigin);
            if (!accountOrigin) {
                throw new Error(
                    `A conta de origem nº ${accountNumberOrigin} não existe!`
                );
            }

            const accountTarget = await accountModel.findOne(filterTarget);
            if (!accountTarget) {
                throw new Error(
                    `A conta de destino nº ${accountNumberTarget} não existe!`
                );
            }

            if (accountOrigin.agencia !== accountTarget.agencia) {
                rate = 8;
            }

            const accountOriginAfter = await this.withdrawal(
                accountOrigin.agencia,
                accountOrigin.conta,
                value,
                rate
            );
            await this.deposit(
                accountTarget.agencia,
                accountTarget.conta,
                value
            );

            return { balance: accountOriginAfter.balance };
        } catch (error) {
            throw new Error(
                `Falha ao fazer a transferência entre as contas: ${error.message}`
            );
        }
    }

    async avgBalance(branch) {
        try {
            const filter = { agencia: parseInt(branch) };

            const avgBalance = await accountModel.aggregate([
                { $match: filter },
                {
                    $group: {
                        _id: '$agencia',
                        avg: { $avg: '$balance' },
                    },
                },
            ]);

            return { avgBalance };
        } catch (error) {
            throw new Error(
                `Falha ao calcular a média do saldo das contas: ${error.message}`
            );
        }
    }

    async lowestBalances(limit) {
        try {
            const lowestBalances = await accountModel
                .find({}, { _id: 0, conta: 1, agencia: 1, balance: 1 })
                .sort({ balance: 1 })
                .limit(parseInt(limit))
                .exec();

            return { lowestBalances };
        } catch (error) {
            throw new Error(
                `Falha ao buscar os menores saldos em conta: ${error.message}`
            );
        }
    }

    async biggestBalances(limit, branch = 0) {
        try {
            const filter = branch > 0 ? { agencia: parseInt(branch) } : {};

            const biggestBalances = await accountModel
                .find(filter, { _id: 0 })
                .sort({ balance: -1 })
                .limit(parseInt(limit))
                .exec();

            return { biggestBalances };
        } catch (error) {
            throw new Error(
                `Falha ao buscar os maiores saldos em conta: ${error.message}`
            );
        }
    }

    async transferToPrivate() {
        try {
            //TODO conferir se não está pegando a agência 99
            const branchs = await accountModel
                .distinct('agencia', { agencia: { $ne: 99 } })
                .exec();

            for (const branch of branchs) {
                const biggest = await this.biggestBalances(1, branch);
                const { conta, agencia, name } = biggest.biggestBalances[0];

                const filter = { conta, agencia, name };

                const set = {
                    agencia: 99,
                };
                const options = {
                    new: true,
                    projection: { _id: 0 },
                };
                await accountModel.findOneAndUpdate(filter, set, options);
            }
            const privateAccounts = accountModel.find({ agencia: 99 }).exec();

            return privateAccounts;
        } catch (error) {
            throw new Error(
                `Falha ao transferir os clientes de maiores saldos para a agência private: ${error.message}`
            );
        }
    }
}

export { AccountController };
