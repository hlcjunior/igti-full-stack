import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import * as dateHelper from './helpers/dateHelpers';

import ButtonContainer from './components/ButtonContainer';
import Summary from './components/Summary';
import Todos from './components/Todos';

export default function App() {
    const years = dateHelper.getAllYears();
    const months = dateHelper.getAllMonths();

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedTodos, setSelectedTodos] = useState([]);

    useEffect(() => {
        const getTodos = async () => {
            const todos = await api.getTodosByYearMonth(
                selectedYear,
                selectedMonth
            );
            setSelectedTodos(todos);
        };

        getTodos();
    }, [selectedYear, selectedMonth]);

    const handleYearClick = (year) => {
        setSelectedYear(year);
    };

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
    };

    return (
        <div className="container">
            <h1 className="center">React Todos</h1>

            <ButtonContainer
                buttons={years}
                selected={selectedYear}
                onClick={handleYearClick}
                color="indigo darken-4"
            />

            <ButtonContainer
                buttons={months}
                selected={selectedMonth}
                onClick={handleMonthClick}
                color="red darken 4"
            />

            <Summary todos={selectedTodos} mainSummary={true} />

            {<Todos todos={selectedTodos} />}
        </div>
    );
}
