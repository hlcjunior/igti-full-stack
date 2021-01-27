import React from 'react';
import { formatDateBR } from '../helpers/dateHelpers';

export default function Todo({ id, date, description, done }) {
    const borderColor = done ? '#009688' : '#dd2c00';

    return (
        <div
            style={{
                ...styles.todo,
                borderLeft: `5px solid ${borderColor}`,
            }}
            className="card horizontal"
        >
            <div>
                <strong>{formatDateBR(date)}</strong> - {description}
            </div>
        </div>
    );
}

const styles = {
    todo: {
        padding: '20px',
        fontSize: '1.3em',
        marginBottom: '20px',
    },
};
