import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';

/**
 * Exigido pelo componente Modal
 */
Modal.setAppElement('#root');

export default function ModalGrade({ onSave, onClose, transaction }) {
    const {
        _id,
        description,
        category,
        value,
        type,
        yearMonthDay,
    } = transaction;

    const [modalDescription, setModalDescription] = useState(description);
    const [modalCategory, setModalCategory] = useState(category);
    const [modalValue, setModalValue] = useState(value);
    const [modalType, setModalType] = useState(type);
    const [modalYearMonthDay, setModalYearMonthDay] = useState(yearMonthDay);

    /**
     * Evento para monitorar a tecla Esc, através de keydown
     */
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // Eliminando evento
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    /**
     * Cercando a tecla "Esc"
     * e fechando a modal caso
     * seja digitada
     */
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose(null);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = {
            _id,
            description: modalDescription,
            category: modalCategory,
            value: modalValue,
            type: modalType,
            yearMonthDay: modalYearMonthDay,
        };

        onSave(formData);
    };

    /**
     * Lidando com o fechamento da modal
     */
    const handleModalClose = () => {
        onClose(null);
    };

    const handleDescriptionChange = ({ target }) => {
        setModalDescription(target.value);
    };

    const handleCategoryChange = ({ target }) => {
        setModalCategory(target.value);
    };

    const handleValueChange = ({ target }) => {
        setModalValue(+target.value);
    };

    const handleTypeChange = ({ target }) => {
        setModalType(target.value);
    };

    const handleYearMonthDayChange = ({ target }) => {
        setModalYearMonthDay(target.value);
    };

    return (
        <Modal style={modalStyle} isOpen={true}>
            <div style={styles.flexRow}>
                <span style={styles.title}>
                    {_id === '' ? 'Inclusão de ' : 'Edição de '}lançamento
                </span>
                <button
                    className="waves-effect waves-lights btn red dark-4"
                    onClick={handleModalClose}
                >
                    X
                </button>
            </div>

            <form onSubmit={handleFormSubmit}>
                <div
                    className="default-flex-row flex-row-center"
                    style={{ marginTop: '-15px' }}
                >
                    <p style={{ marginRight: '50px' }}>
                        <label>
                            <input
                                name="modalType"
                                value="-"
                                checked={modalType === '-'}
                                onChange={handleTypeChange}
                                disabled={_id !== ''}
                                type="radio"
                            />
                            <span
                                style={{
                                    color: global.colorRed,
                                    fontWeight: 'bold',
                                }}
                            >
                                Despesa
                            </span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input
                                name="modalType"
                                value="+"
                                checked={modalType === '+'}
                                disabled={_id !== ''}
                                onChange={handleTypeChange}
                                type="radio"
                            />
                            <span
                                style={{
                                    color: global.colorGreen,
                                    fontWeight: 'bold',
                                }}
                            >
                                Receita
                            </span>
                        </label>
                    </p>
                </div>
                <div className="input-field">
                    <input
                        id="inputCategory"
                        autoFocus
                        type="text"
                        value={modalCategory}
                        onChange={handleCategoryChange}
                    />
                    <label className="active" htmlFor="inputCategory">
                        Categoria:
                    </label>
                </div>

                <div className="input-field">
                    <input
                        id="inputDescription"
                        type="text"
                        value={modalDescription}
                        onChange={handleDescriptionChange}
                    />
                    <label className="active" htmlFor="inputName">
                        Descrição:
                    </label>
                </div>

                <div className="default-flex-row">
                    <div className="input-field">
                        <input
                            id="inputValue"
                            type="number"
                            value={modalValue}
                            onChange={handleValueChange}
                        />
                        <label className="active" htmlFor="inputValue">
                            Valor:
                        </label>
                    </div>

                    <div className="input-field">
                        <input
                            id="inputYearMonthDay"
                            type="date"
                            defaultValue={yearMonthDay}
                            onChange={handleYearMonthDayChange}
                            onSelect={handleYearMonthDayChange}
                        />
                        <label className="active" htmlFor="inputYearMonthDay">
                            Data:
                        </label>
                    </div>
                </div>

                <div className="default-flex-row flex-row-center">
                    <button className="waves-effect waves-light btn teal darken-3">
                        <strong>Salvar</strong>
                    </button>
                </div>
            </form>
        </Modal>
    );
}

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
    },
};

const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(47, 54, 64,.7)',
        zIndex: 1000,
    },
    content: {
        borderRadius: '4px',
        border: '5px solid rgba(47, 54, 64,.1)',
        bottom: 'auto',
        height: '450px', // set height
        left: '50%',
        position: 'fixed',
        right: 'auto',
        top: '50%', // start from center
        transform: 'translate(-50%,-225px)', // adjust top "up" based on height
        width: '400px',
    },
};
