const YEARS = [2019, 2020, 2021];
const MONTHS = [
    { monthNumber: 1, month: 'JAN' },
    { monthNumber: 2, month: 'FEV' },
    { monthNumber: 3, month: 'MAR' },
    { monthNumber: 4, month: 'ABR' },
    { monthNumber: 5, month: 'MAI' },
    { monthNumber: 6, month: 'JUN' },
    { monthNumber: 7, month: 'JUL' },
    { monthNumber: 8, month: 'AGO' },
    { monthNumber: 9, month: 'SET' },
    { monthNumber: 10, month: 'OUT' },
    { monthNumber: 11, month: 'NOV' },
    { monthNumber: 12, month: 'DEZ' },
];

function getAllYears() {
    return YEARS;
}

function getAllMonths() {
    return MONTHS;
}

function formatDateBR(date) {
    const objDate = new Date(`${date} 23:59:59`);
    return objDate.toLocaleDateString('pt-BR');
}

export { getAllYears, getAllMonths, formatDateBR };
