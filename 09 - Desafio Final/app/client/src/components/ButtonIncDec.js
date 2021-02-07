import React from 'react';

export default function ButtonIncDec({ value, onClick }) {
    const handleClick = ({ currentTarget }) => {
        const newValue = currentTarget.value;
        onClick(newValue);
    };

    return (
        <button
            className="waves-effect waves-light btn grey lighten-2"
            value={value}
            onClick={handleClick}
            style={styles.buttonStyle}
        >
            <div style={styles.buttonText}>{value === '+' ? '>' : '<'}</div>
        </button>
    );
}

const styles = {
    buttonStyle: {
        height: '45px',
        width: '45px',
        borderRadius: '5px',
        outline: 'none',
        marginTop: '-2px',
    },
    buttonText: {
        marginTop: '-3px',
        marginLeft: '-10px',
        marginRight: '-10px',
        fontWeight: 'bold',
        fontSize: '35px',
        color: '#333333',
        fontFamily: 'Consolas',
    },
};
