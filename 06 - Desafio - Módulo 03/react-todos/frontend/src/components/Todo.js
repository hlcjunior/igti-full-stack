import React from 'react';
import { formatDateBR } from '../helpers/dateHelpers';

export default function Todo({ id, date, description, done }) {
    return (
        <div
            style={styles.todo}
            className={`card horizontal ${
                done ? 'teal' : ' deep-orange accent-2'
            }`}
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
