const YEAR_NUMBERS = [2019, 2020, 2021];

const MONTH_DESCRIPTIONS = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

const joinYearsMonths = () => {
    const yearsMonths = [];
    YEAR_NUMBERS.forEach((year) => {
        MONTH_DESCRIPTIONS.forEach((month, index) => {
            yearsMonths.push({
                id: `ym${year}-${index + 1}`,
                description: `${month}/${year.toString()}`,
                value: `${year}-${String(index + 1).padStart(2, '0')}`,
            });
        });
    });

    return yearsMonths;
};
export const YEARS_MONTHS = joinYearsMonths();

export const getYearMonth = (date) => {
    const today = date ? new Date(`${date} 00:00:00`) : new Date();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const y = today.getFullYear();
    return `${y}-${m}`;
};

export const currentDate = () => {
    const today = new Date();
    const d = String(today.getDay() + 1).padStart(2, '0');
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const y = today.getFullYear();
    return `${y}-${m}-${d}`;
};
