import React from 'react';
// import M from 'materialize-css';

export default function Select({ values = [], selectedValue = '', onChange }) {
    // Se quiser usar o JavaScript do Materialize
    // Retire o className 'browser-default'
    // React.useEffect(() => {
    //     M.AutoInit();
    // }, []);

    const handleSelectChange = ({ target }) => {
        const newValue = target.value;
        onChange(newValue);
    };

    return (
        <select
            className="browser-default"
            value={selectedValue}
            onChange={handleSelectChange}
            style={styles.selectStyle}
        >
            {values.map(({ id, description, value }) => {
                return (
                    <option key={id} value={value}>
                        {description}
                    </option>
                );
            })}
        </select>
    );
}

const styles = {
    selectStyle: {
        height: '50px',
        width: '200px',
        marginLeft: '10px',
        marginRight: '10px',
        fontWeight: 'bold',
        fontSize: '1.2em',
        border: '1px solid lightgray',
        borderRadius: '10px',
        outline: 'none',
        color: '#333333',
        paddingLeft: '15px',
    },
};
