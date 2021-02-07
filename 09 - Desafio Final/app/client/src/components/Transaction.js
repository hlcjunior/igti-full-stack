import React from 'react';

import { currencyFormat } from '../helpers/numberHelpers';

import css from './transaction.module.css';

export default function Transaction({ transaction, onEdit, onRemove }) {
    const { _id, day, description, category, type, value } = transaction;

    const typeColor = type === '+' ? global.colorGreen : global.colorRed;
    const iconTransaction = type === '+' ? 'arrow_upward' : 'arrow_downward';

    const handleActionUpdate = () => {
        onEdit(transaction);
    };

    const handleActionRemove = () => {
        onRemove(_id);
    };

    return (
        <div
            style={{
                borderLeft: `8px solid ${typeColor}`,
            }}
            className={`${css.transactionCard} default-flex-row card-panel`}
        >
            <span className={css.day}>
                <i className={`material-icons ${css.dayIcon}`}>
                    calendar_today
                </i>
                <span className={css.innerNum} style={{ color: typeColor }}>
                    {String(day).padStart(2, '0')}
                </span>
            </span>

            <div className={css.categoryDescription}>
                <div className={css.category}>{category}</div>
                <div>{description}</div>
            </div>

            <div
                className={`${css.value} icon-container`}
                style={{ color: typeColor }}
            >
                <i className={`material-icons ${css.icons}`}>
                    {iconTransaction}
                </i>
                {currencyFormat.format(value)}
            </div>

            <div>
                <i
                    onClick={handleActionUpdate}
                    className={`material-icons ${css.iconActions} ${css.edit}`}
                >
                    edit
                </i>
                <i
                    onClick={handleActionRemove}
                    className={`material-icons ${css.iconActions} ${css.delete}`}
                >
                    delete
                </i>
            </div>
        </div>
    );
}
