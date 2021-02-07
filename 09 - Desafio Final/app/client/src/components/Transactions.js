import React from 'react';
import Transaction from './Transaction';

export default function Transactions({ transactions, onEdit, onRemove }) {
    return (
        <div
            style={{
                overflow: 'auto',
                maxHeight: '500px',
                paddingRight: '10px',
            }}
        >
            {transactions.map((transaction) => {
                return (
                    <Transaction
                        key={transaction._id}
                        transaction={transaction}
                        onEdit={onEdit}
                        onRemove={onRemove}
                    />
                );
            })}
        </div>
    );
}
