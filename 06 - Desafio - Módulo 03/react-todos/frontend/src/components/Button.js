import React from 'react';

export default function Button({
    value,
    description,
    selected,
    color,
    onButtonClick,
}) {
    const handleButtonClick = (event) => {
        onButtonClick(event.target.value);
    };

    return (
        <div style={{ marginRight: 5 }}>
            <button
                className={`btn waves-light waves-effect ${
                    +selected === +value ? 'black' : color
                }`}
                value={value}
                onClick={handleButtonClick}
            >
                {description}
            </button>
        </div>
    );
}
