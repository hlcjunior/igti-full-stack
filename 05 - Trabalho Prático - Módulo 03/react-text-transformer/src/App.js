import React, { Component } from 'react';
import CopyTextButton from './components/copy-text-button/CopyTextButton';
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

        return (
            <div className="container">
                <h3 className="center-text">react-text-transformer</h3>

                <Input
                    label="Digite um texto qualquer"
                    placeholder="Informe um texto"
                    value={userInput}
                    onChange={this.handleChangeUserInput}
                />

                <h3 className="center-text">Transformações</h3>

                <Input
                    label="Texto invertido"
                    id="invertedText"
                    value={invertedText}
                    readOnly={true}
                    copyButton={true}
                />

                <Input
                    label="Texto numérico"
                    id="numericText"
                    value={numericText}
                    readOnly={true}
                    copyButton={true}
                />

                <Input
                    label="CSV"
                    id="csvText"
                    value={csvText}
                    readOnly={true}
                    copyButton={true}
                />

                <Input
                    label="Slug"
                    id="slugText"
                    value={slugText}
                    readOnly={true}
                    copyButton={true}
                />

                <Input
                    label="Somente Vogais"
                    id="vowelsOnlyText"
                    value={vowelsOnlyText}
                    readOnly={true}
                    copyButton={true}
                />

                <Input
                    label="Somente Consoantes"
                    id="consonantsOnlyText"
                    value={consonantsOnlyText}
                    readOnly={true}
                    copyButton={true}
                />

                <Input
                    label="Variável"
                    id="camelCaseText"
                    value={camelCaseText}
                    readOnly={true}
                    copyButton={true}
                />
            </div>
        );
    }
}
