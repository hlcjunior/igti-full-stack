import axios from 'axios';

const API_URL = 'http://localhost:3001/todos';

async function getTodosByYearMonth(year, month) {
    const res = await axios.get(`${API_URL}?year=${year}&month=${month}`);
    const todos = res.data;
    todos
        .sort((a, b) => {
            return a.day - b.day;
        })
        .sort((a, b) => {
            return a.month - b.month;
        });
    return todos;
}

export { getTodosByYearMonth };
