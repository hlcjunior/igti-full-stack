import React, { Component } from 'react';
import CopyTextButton from '../copy-text-button/CopyTextButton';

import css from './input.module.css';

export default class Input extends Component {
    handleInputChange = (event) => {
        const { readOnly } = this.props;
        if (!readOnly) {
            const newText = event.target.value;
            this.props.onChange(newText);
        }
    };

    render() {
        const {
            id,
            label,
            value,
            placeholder,
            readOnly,
            copyButton,
        } = this.props;

        return (
            <div>
                <span>{label ? label + ':' : ''}</span>

                <div className={css.flexRow}>
                    <input
                        id={id}
                        placeholder={placeholder}
                        type="text"
                        value={value}
                        onChange={this.handleInputChange}
                        readOnly={readOnly}
                    />

                    {copyButton ? (
                        <CopyTextButton target={id} />
                    ) : (
                        <span></span>
                    )}
                </div>
            </div>
        );
    }
}
