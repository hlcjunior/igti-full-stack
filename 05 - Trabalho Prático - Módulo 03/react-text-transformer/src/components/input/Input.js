import React, { Component } from 'react';
import CopyTextButton from '../copy-text-button/CopyTextButton';

import css from './input.module.css';

export default class Input extends Component {
    handleInputChange = (event) => {
        const newText = event.target.value;
        this.props.onChange(newText);
    };

    handleInputFocus = (event) => {
        const { selectOnFocus } = this.props;

        if (selectOnFocus) {
            event.target.select();
        }
    };

    render() {
        const {
            id,
            focus = false,
            label,
            value,
            placeholder = ' ',
            readOnly = false,
            copyButton = false,
        } = this.props;

        return (
            <div>
                <div className={css.flexRow}>
                    <div className="input-field" style={{ flex: 7 }}>
                        <label htmlFor={id}>{label && label + ':'}</label>
                        <input
                            id={id}
                            autoFocus={focus}
                            className="input-field"
                            onFocus={this.handleInputFocus}
                            placeholder={placeholder}
                            type="text"
                            value={value}
                            onChange={this.handleInputChange}
                            readOnly={readOnly}
                        />
                    </div>

                    {copyButton && <CopyTextButton target={id} />}
                </div>
            </div>
        );
    }
}
