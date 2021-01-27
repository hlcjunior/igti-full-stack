import React from 'react';

export default function Summary({ todos, mainSummary }) {
    const totalDone = todos.filter((todo) => todo.done).length;
    const totalTodo = todos.length;
    const totalNotDone = totalTodo - totalDone;

    return (
        <div style={mainSummary ? styles.mainSummary : styles.subSummary}>
            <div>
                Total de tarefas:{' '}
                <span className="blue-text text-darken-4">{totalTodo}</span>
            </div>

            <div style={styles.separator}>|</div>

            <div>
                Tarefas cumpridas:{' '}
                <span className="teal-text text-darken-4">{totalDone}</span>
            </div>

            <div style={styles.separator}>|</div>

            <div>
                Tarefas não cumpridas:{' '}
                <span className="deep-orange-text text-accent-4">
                    {totalNotDone}
                </span>
            </div>
        </div>
    );
}

const styles = {
    mainSummary: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
        fontWeight: 'bold',
        fontSize: '1.4em',
    },
    subSummary: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontWeight: 'bold',
        fontSize: '1.2em',
    },
    separator: {
        marginLeft: '5px',
        marginRight: '5px',
    },
};
