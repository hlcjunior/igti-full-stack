import React, { Component } from 'react';
import Input from './components/input/Input';
import * as textHelpers from './helpers/textHelpers';

const TRANSFORM = [
    {
        id: 'invertedText',
        label: 'Texto invertido',
        functionTransform: (text) => textHelpers.invertText(text),
    },
    {
        id: 'numericText',
        label: 'Texto numérico',
        functionTransform: (text) => textHelpers.numericText(text),
    },
    {
        id: 'csvText',
        label: 'CSV',
        functionTransform: (text) => textHelpers.csvText(text),
    },
    {
        id: 'slugText',
        label: 'Slug',
        functionTransform: (text) => textHelpers.slugText(text),
    },
    {
        id: 'vowelsOnlyText',
        label: 'Somente Vogais',
        functionTransform: (text) => textHelpers.vowelsOnlyText(text),
    },
    {
        label: 'Somente Consoantes',
        id: 'consonantsOnlyText',
        functionTransform: (text) => textHelpers.consonantsOnlyText(text),
    },
    {
        label: 'Variável',
        id: 'camelCaseText',
        functionTransform: (text) => textHelpers.camelCaseText(text),
    },
];

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

                {TRANSFORM.map(({ label, id, functionTransform }) => {
                    return (
                        <Input
                            key={id}
                            id={id}
                            label={label}
                            value={functionTransform(userInput)}
                            readOnly
                            copyButton
                        />
                    );
                })}
            </div>
        );
    }
}
