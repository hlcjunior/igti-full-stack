const YEARS = [
    { value: 2019, description: 2019 },
    { value: 2020, description: 2020 },
    { value: 2021, description: 2021 },
];
const MONTHS = [
    { value: 1, description: 'JAN' },
    { value: 2, description: 'FEV' },
    { value: 3, description: 'MAR' },
    { value: 4, description: 'ABR' },
    { value: 5, description: 'MAI' },
    { value: 6, description: 'JUN' },
    { value: 7, description: 'JUL' },
    { value: 8, description: 'AGO' },
    { value: 9, description: 'SET' },
    { value: 10, description: 'OUT' },
    { value: 11, description: 'NOV' },
    { value: 12, description: 'DEZ' },
];

export function getAllYears() {
    return YEARS;
}

export function getAllMonths() {
    return MONTHS;
}

export function formatDateBR(date) {
    const objDate = new Date(`${date} 23:59:59`);
    return objDate.toLocaleDateString('pt-BR');
}
