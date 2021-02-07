import axios from 'axios';

const urlBase = 'http://localhost:3001/api/transaction';

async function fetchJson(url) {
    const resource = await fetch(url);
    const json = await resource.json();
    return json;
}

export async function apiGetTransactionsByPeriod(yearMonth) {
    const url = `${urlBase}?period=${yearMonth}`;
    const filteredTransactions = await fetchJson(url);
    return filteredTransactions;
}

export async function apiCreateUpdate(transaction) {
    const url = `${urlBase}`;
    const id = transaction._id;

    try {
        //Tem id então é update
        if (id !== '') {
            return await axios.patch(`${url}/${id}`, transaction);
        }
        return await axios.post(url, transaction);
    } catch (error) {
        return error.response;
    }
}

export async function apiRemove(id) {
    const url = `${urlBase}`;

    try {
        //Tem id então é update
        if (id !== '') {
            return await axios.delete(`${url}/${id}`);
        }
    } catch (error) {
        return error.response;
    }
}
