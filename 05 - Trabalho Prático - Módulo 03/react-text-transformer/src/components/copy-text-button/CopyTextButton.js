import materialize from 'materialize-css';
import React, { Component } from 'react';

export default class CopyTextButton extends Component {
    handleClick = () => {
        const copyText = document.querySelector(`#${this.props.target}`);

        copyText.select();
        copyText.setSelectionRange(0, 99999);

        document.execCommand('copy');

        materialize.toast({
            html: 'Texto copiado para área de transferência!',
        });
    };
    render() {
        return (
            <button
                className="waves-effect waves-teal btn-flat"
                onClick={this.handleClick}
            >
                <i className="material-icons center">content_copy</i>
            </button>
        );
    }
}
