import React from 'react';

import M from 'materialize-css';

import Spinner from './components/Spinner';
import { YEARS_MONTHS, getYearMonth, currentDate } from './helpers/dateHelpers';
import {
    apiGetTransactionsByPeriod,
    apiCreateUpdate,
    apiRemove,
} from './api/api';

import Select from './components/Select';
import ButtonIncDec from './components/ButtonIncDec';
import Transactions from './components/Transactions';
import Summary from './components/Summary';
import ModalTransaction from './components/ModalTransaction';

global.colorGreen = '#009432';
global.colorRed = '#c23616';

const TRANSACTION = {
    _id: '',
    description: '',
    category: '',
    value: 0,
    type: '-',
    yearMonthDay: currentDate(),
};

let transactionsByPeriod = {};

export default function App() {
    const [selectedYearMonth, setSelectedYearMonth] = React.useState(
        getYearMonth()
    );
    const [filteredTransactions, setFilteredTransactions] = React.useState({});
    const [filter, setFilter] = React.useState('');
    const [selectedTransaction, setSelectedTransaction] = React.useState({
        TRANSACTION,
    });
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(true);

    React.useEffect(() => {
        document.title = 'Controle Financeiro Pessoal';
        M.AutoInit();
    }, []);

    React.useEffect(() => {
        async function getTransactionsByPeriod() {
            setLoadingData(true);
            const transactions = await apiGetTransactionsByPeriod(
                selectedYearMonth
            );

            transactionsByPeriod = transactions.transactions;

            setTimeout(() => {
                setFilteredTransactions(transactionsByPeriod);
                setLoadingData(false);
            }, 1000);
        }

        getTransactionsByPeriod();
    }, [selectedYearMonth]);

    function handleYearMonthChange(newYearMonth) {
        setSelectedYearMonth(newYearMonth);
    }

    function incDecYearMonth(incDec) {
        let index = YEARS_MONTHS.indexOf(
            YEARS_MONTHS.find((ym) => ym.value === selectedYearMonth)
        );

        //Faz o ++ ou -- de acordo com o incDec
        eval(`index${incDec}${incDec}`);

        //Limita o index em 0 ou na quantidade de YEARS_MONTHS
        if (index < 0 || index === YEARS_MONTHS.length) {
            return;
        }

        handleYearMonthChange(YEARS_MONTHS[index].value);
    }

    const handleFilterKeyUp = ({ target }) => {
        setFilter(target.value.toString());
        executeFilter();
    };

    const executeFilter = () => {
        const filterLowerCase = filter.toLowerCase();

        const filteredTransactions = transactionsByPeriod.filter(
            ({ description }) => {
                return description.toLowerCase().includes(filterLowerCase);
            }
        );

        setFilteredTransactions(filteredTransactions);
    };

    const handleModalOpen = (transaction) => {
        if (transaction._id) {
            setSelectedTransaction(transaction);
        } else {
            TRANSACTION.yearMonthDay = `${selectedYearMonth}-01`;
            setSelectedTransaction(TRANSACTION);
        }

        setIsModalOpen(true);
    };

    const showMsg = (msg, error = false) => {
        const classe = error ? 'red darken-4' : 'blue darken-4';
        M.toast({ html: msg, classes: classe });
    };

    const handleModalSave = async (formData) => {
        const result = await apiCreateUpdate(formData);

        if (result.status !== 200) {
            showMsg(result.data.error, true);
        } else {
            setIsModalOpen(false);
            showMsg(result.data.message);

            const yearMonth = getYearMonth(formData.yearMonthDay);
            if (yearMonth !== selectedYearMonth) {
                setFilter('');
                handleYearMonthChange(yearMonth);
            } else {
                let newTransactions = [...transactionsByPeriod];

                const index = newTransactions.findIndex(({ _id }) => {
                    return _id === formData._id;
                });

                if (index > -1) {
                    newTransactions[index] = result.data.transaction;
                } else {
                    newTransactions.unshift(result.data.transaction);
                }

                transactionsByPeriod = [...newTransactions];
                executeFilter();
            }
        }
    };

    const handleRemove = async (id) => {
        const result = await apiRemove(id);

        if (result.status !== 200) {
            showMsg(result.data.error, true);
        } else {
            showMsg(result.data.message);

            const transactions = filteredTransactions.filter(({ _id }) => {
                return _id !== id;
            });

            setFilteredTransactions(transactions);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <h4 className="center">Bootcamp Full Stack - Desafio Final</h4>
            <h5 className="center">Controle Financeiro Pessoal</h5>
            <hr style={{ marginBottom: '50px' }} />

            <div className="default-flex-row flex-row-center">
                <ButtonIncDec value="-" onClick={incDecYearMonth} />
                <Select
                    values={YEARS_MONTHS}
                    selectedValue={selectedYearMonth}
                    onChange={handleYearMonthChange}
                />
                <ButtonIncDec value="+" onClick={incDecYearMonth} />
            </div>

            {loadingData && <Spinner />}
            {!loadingData && (
                <>
                    <div
                        style={{
                            marginTop: '30px',
                            textAlign: 'center',
                        }}
                        className="default-flex-row flex-row-center"
                    >
                        <div className="input-field" style={{ width: '70%' }}>
                            <i className="material-icons prefix">filter_alt</i>
                            <input
                                id="filterTransactions"
                                placeholder="Informe uma descrição para filtrar no período selecionado"
                                type="text"
                                onKeyUp={handleFilterKeyUp}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            paddingBottom: '10px',
                        }}
                        className="default-flex-row"
                    >
                        <div>
                            <button
                                title="Novo lançamento"
                                onClick={handleModalOpen}
                                className="btn-floating btn waves-effect waves-light teal darken-3"
                            >
                                <i className="material-icons">add</i>
                            </button>
                        </div>
                        <div style={{ flexGrow: 1, marginLeft: '15px' }}>
                            <Summary>{filteredTransactions}</Summary>
                        </div>
                    </div>

                    <Transactions
                        onEdit={handleModalOpen}
                        onRemove={handleRemove}
                        transactions={filteredTransactions}
                    />
                </>
            )}
            {isModalOpen && (
                <ModalTransaction
                    onSave={handleModalSave}
                    onClose={handleModalClose}
                    transaction={selectedTransaction}
                />
            )}
        </div>
    );
}
