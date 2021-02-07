import React from 'react';

import { currencyFormat } from '../helpers/numberHelpers';

export default function Summary({ children: transactions }) {
    const green = global.colorGreen;
    const red = global.colorRed;

    const ctTransactions = transactions.length;
    const sums = transactions.reduce(
        (accumulator, { type, value }) => {
            type === '+'
                ? (accumulator.incomes += value)
                : (accumulator.expenses += value);

            return accumulator;
        },
        { incomes: 0, expenses: 0 }
    );
    const incomes = sums.incomes;
    const expenses = sums.expenses;
    const balance = incomes - expenses;

    const balanceColor = balance >= 0 ? green : red;

    return (
        <div className="default-flex-row" style={styles.summary}>
            <div
                title="Quantidade de lançamentos no período"
                style={styles.tag}
            >
                Lançamentos
                <div className="icon-container">
                    <i style={styles.icon} className="material-icons">
                        multiple_stop
                    </i>
                    {ctTransactions}
                </div>
            </div>

            <div title="Total em receitas" style={styles.tag}>
                Entradas
                <span className="icon-container" style={{ color: green }}>
                    <i style={styles.icon} className="material-icons">
                        arrow_upward
                    </i>
                    {currencyFormat.format(incomes)}
                </span>
            </div>

            <div title="Total em despesas" style={styles.tag}>
                Saídas
                <span className="icon-container" style={{ color: red }}>
                    <i style={styles.icon} className="material-icons">
                        arrow_downward
                    </i>
                    {currencyFormat.format(expenses)}
                </span>
            </div>

            <div title="Saldo do período" style={styles.tag}>
                Saldo
                <span
                    className="icon-container"
                    style={{ color: balanceColor }}
                >
                    <i style={styles.icon} className="material-icons">
                        drag_handle
                    </i>
                    {currencyFormat.format(Math.abs(balance))}
                </span>
            </div>
        </div>
    );
}

const styles = {
    tag: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.2em',
        color: '#333333',
    },
    icon: {
        fontSize: '20px',
        marginRight: '5px',
    },
    summary: {
        padding: '10px',
    },
};
