import React from 'react';
import Button from './Button';

export default function ButtonContainer({ buttons, selected, onClick, color }) {
    return (
        <div style={styles.flexRow}>
            {buttons.map(({ value, description }) => {
                return (
                    <Button
                        key={value}
                        value={value}
                        description={description}
                        selected={selected}
                        color={color}
                        onButtonClick={onClick}
                    />
                );
            })}
        </div>
    );
}

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '40px',
    },
};
