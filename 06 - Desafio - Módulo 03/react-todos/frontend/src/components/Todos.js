import React from 'react';
import { formatDateBR } from '../helpers/dateHelpers';
import Summary from './Summary';
import Todo from './Todo';

export default function Todos({ todos }) {
    let summary = {};
    let totalTodo = 0;
    let totalDone = 0;
    let totalNotDone = 0;
    let showHeader = false;
    let showSummary = false;
    let currentDate = '';

    const calcTotals = (done, clear = false) => {
        if (clear) {
            totalTodo = 0;
            totalDone = 0;
            totalNotDone = 0;
        }
        totalTodo++;
        done ? totalDone++ : totalNotDone++;
    };

    return (
        <div>
            {todos.map(({ id, date, description, done }, index) => {
                if (index === 0) {
                    currentDate = date;
                    showHeader = true;
                    calcTotals(done);
                } else {
                    if (index > 0 && currentDate !== date) {
                        currentDate = date;
                        showHeader = true;
                        showSummary = true;
                        summary = {
                            totalTodo,
                            totalDone,
                            totalNotDone,
                        };
                        calcTotals(done, true);
                    } else {
                        showHeader = false;
                        showSummary = false;
                        calcTotals(done);
                    }
                }

                return (
                    <div key={id}>
                        {showSummary && (
                            <div>
                                <Summary summary={summary} />{' '}
                                <hr style={styles.separator} />
                            </div>
                        )}
                        {showHeader && (
                            <div className="center">
                                <strong style={{ fontSize: '1.3em' }}>
                                    {formatDateBR(date)}
                                </strong>
                            </div>
                        )}
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
