import React from 'react';

import { formatDateBR } from '../helpers/dateHelpers';

import Summary from './Summary';
import Todo from './Todo';

export default function Todos({ todos }) {
    let dayTodos = [];
    let currentDate = '';

    const showHeader = (date) => {
        return (
            <div className="center">
                <strong style={{ fontSize: '1.3em' }}>
                    {formatDateBR(date)}
                </strong>
            </div>
        );
    };

    const showFooter = (todos) => {
        return (
            <div>
                {<Summary todos={todos} />}
                <hr style={styles.separator} />
            </div>
        );
    };

    const showDetails = (index, date, todo) => {
        if (index === 0) {
            currentDate = date;
            dayTodos.push(todo);
            return showHeader(date);
        } else {
            if (index > 0 && currentDate !== date) {
                const todos = [...dayTodos];

                currentDate = date;
                dayTodos = [{ ...todo }];

                return (
                    <>
                        {showFooter(todos)}
                        {showHeader(date)}
                    </>
                );
            } else {
                dayTodos.push(todo);
            }
        }
    };

    return (
        <div>
            {todos.map((todo, index) => {
                const { id, date, description, done } = todo;

                return (
                    <div key={id}>
                        {showDetails(index, date, todo)}
                        <Todo
                            id={id}
                            date={date}
                            description={description}
                            done={done}
                        />
                    </div>
                );
            })}
        </div>
    );
}

const styles = {
    separator: {
        marginBottom: '30px',
        marginTop: '30px',
        borderTop: '1px dashed #333333',
    },
};
