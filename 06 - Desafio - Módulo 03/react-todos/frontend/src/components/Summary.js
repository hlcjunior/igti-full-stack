import React from 'react';

export default function Summary({ summary, mainSummary }) {
    const { totalTodo, totalDone, totalNotDone } = summary;
    return (
        <div style={mainSummary ? styles.mainSummary : styles.subSummary}>
            <div>
                Total de tarefas:{' '}
                <span className="blue-text text-darken-4">{totalTodo}</span>
            </div>
            <div style={styles.space}>|</div>
            <div>
                Tarefas cumpridas:{' '}
                <span className="teal-text text-darken-4">{totalDone}</span>
            </div>
            <div style={styles.space}>|</div>
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
        //marginBottom: '40px',
        fontWeight: 'bold',
        fontSize: '1.2em',
    },
    space: {
        marginLeft: '5px',
        marginRight: '5px',
    },
};
