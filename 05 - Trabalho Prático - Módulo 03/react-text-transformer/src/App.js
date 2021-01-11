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

        this.state = {
            userInput: '',
            invertedText: '',
            numericText: '',
            csvText: '',
            slugText: '',
            vowelsOnlyText: '',
            consonantsOnlyText: '',
            camelCaseText: '',
        };
    }

    handleChangeUserInput = (newText) => {
        this.setState({
            userInput: newText,
            invertedText: invertText(newText),
            numericText: numericText(newText),
            csvText: csvText(newText),
            slugText: slugText(newText),
            vowelsOnlyText: vowelsOnlyText(newText),
            consonantsOnlyText: consonantsOnlyText(newText),
            camelCaseText: camelCaseText(newText),
        });
    };

    render() {
        const {
            userInput,
            invertedText,
            numericText,
            csvText,
            slugText,
            vowelsOnlyText,
            consonantsOnlyText,
            camelCaseText,
        } = this.state;

        const transform = [
            {
                id: 'invertedText',
                label: 'Texto invertido',
                value: invertedText,
            },
            {
                id: 'numericText',
                label: 'Texto numérico',
                value: numericText,
            },
            {
                id: 'csvText',
                label: 'CSV',
                value: csvText,
            },
            {
                id: 'slugText',
                label: 'Slug',
                value: slugText,
            },
            {
                id: 'vowelsOnlyText',
                label: 'Somente Vogais',
                value: vowelsOnlyText,
            },
            {
                label: 'Somente Consoantes',
                id: 'consonantsOnlyText',
                value: consonantsOnlyText,
            },
            {
                label: 'Variável',
                id: 'camelCaseText',
                value: camelCaseText,
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
