import React, { Component } from 'react';
import Input from './components/input/Input';
import {
    csvText,
    invertText,
    numericText,
    slugText,
    vowelsOnlyText,
    consonantsOnlyText,
    camelCaseText,
} from './helpers/textHelpers';

export default class App extends Component {
    constructor() {
        super();

        this.state = { userInput: '' };
    }

    handleChangeUserInput = (newText) => {
        this.setState({ userInput: newText });
    };

    render() {
        const { userInput } = this.state;

        const transform = [
            {
                id: 'invertedText',
                label: 'Texto invertido',
                value: invertText(userInput),
            },
            {
                id: 'numericText',
                label: 'Texto numérico',
                value: numericText(userInput),
            },
            {
                id: 'csvText',
                label: 'CSV',
                value: csvText(userInput),
            },
            {
                id: 'slugText',
                label: 'Slug',
                value: slugText(userInput),
            },
            {
                id: 'vowelsOnlyText',
                label: 'Somente Vogais',
                value: vowelsOnlyText(userInput),
            },
            {
                label: 'Somente Consoantes',
                id: 'consonantsOnlyText',
                value: consonantsOnlyText(userInput),
            },
            {
                label: 'Variável',
                id: 'camelCaseText',
                value: camelCaseText(userInput),
            },
        ];

        return (
            <div className="container">
                <h3 className="center-text">react-text-transformer</h3>

                <Input
                    focus
                    selectOnFocus
                    label="Digite um texto qualquer"
                    placeholder="Informe um texto"
                    value={userInput}
                    onChange={this.handleChangeUserInput}
                />

                <h3 className="center-text">Transformações</h3>

                {transform.map(({ label, id, value }) => {
                    return (
                        <Input
                            key={id}
                            label={label}
                            id={id}
                            value={value}
                            readOnly
                            copyButton
                        />
                    );
                })}
            </div>
        );
    }
}
