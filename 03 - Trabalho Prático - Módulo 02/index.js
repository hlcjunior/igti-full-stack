import { promises as fs } from 'fs';

const citiesStatePath = './json/cities-by-state';
let top5States;
let bottom5States;
let citiesOfBiggerNames;
let citiesOfSmallerNames;
let biggestCityName;
let smallestCityName;

const init = async () => {
    try {
        const jsonStates = JSON.parse(await readFile('./json/States.json'));
        const jsonCities = JSON.parse(await readFile('./json/Cities.json'));

        await createJsonFilesCitiesByState(jsonStates, jsonCities);

        top5States = await getTop5States(jsonStates);
        bottom5States = await getTop5States(jsonStates, true);
        citiesOfBiggerNames = await getCitiesOfBiggerNames(jsonStates);
        citiesOfSmallerNames = await getCitiesOfBiggerNames(jsonStates, true);
        biggestCityName = await getBiggestCityName(
            citiesOfBiggerNames.slice(0)
        );
        smallestCityName = await getBiggestCityName(
            citiesOfSmallerNames.slice(0),
            true
        );

        printData();
    } catch (error) {
        console.error(error);
    }
    console.timeEnd();
};

const getBiggestCityName = async (cities, reverse) => {
    const citiesSort = cities.sort((a, b) => {
        if (parseInt(a.length) === parseInt(b.length)) {
            return a.localeCompare(b);
        }

        return reverse
            ? parseInt(a.length) > parseInt(b.length)
                ? 1
                : -1
            : parseInt(b.length) > parseInt(a.length)
            ? 1
            : -1;
    });

    return citiesSort[0];
};

const getCitiesOfBiggerNames = async (jsonStates, reverse) => {
    let citiesOfBiggerNames = [];

    for (const { Sigla } of jsonStates) {
        const cities = JSON.parse(
            await readFile(`${citiesStatePath}/${Sigla}.json`)
        );

        const citiesSort = cities
            .map(({ Nome }) => {
                return {
                    city: Nome,
                    state: Sigla,
                    totalString: parseInt(Nome.length),
                };
            })
            .sort((a, b) => {
                if (a.totalString === b.totalString) {
                    return a.city.localeCompare(b.city);
                }

                return reverse
                    ? a.totalString > b.totalString
                        ? 1
                        : -1
                    : b.totalString > a.totalString
                    ? 1
                    : -1;
            });

        citiesOfBiggerNames.push(`${citiesSort[0].city} - ${Sigla}`);
    }

    return citiesOfBiggerNames;
};

const getTop5States = async (jsonStates, reverse) => {
    let statesCountCities = [];

    for (const { Sigla } of jsonStates) {
        statesCountCities.push(`${Sigla} - ${await getTotalCities(Sigla)}`);
    }

    let ordered = statesCountCities.sort((a, b) => {
        const totalA = parseInt(a.replace(/\D/g, ''));
        const totalB = parseInt(b.replace(/\D/g, ''));

        return reverse ? (totalA > totalB ? 1 : -1) : totalB > totalA ? 1 : -1;
    });

    return ordered.slice(0, 5);
};

const getTotalCities = async (state) => {
    const jsonFile = JSON.parse(
        await readFile(`${citiesStatePath}/${state}.json`)
    );
    return parseInt(jsonFile.length);
};

const createJsonFilesCitiesByState = async (jsonStates, jsonCities) => {
    for (const state of jsonStates) {
        const citiesOfState = jsonCities.filter(
            ({ Estado }) => Estado === state.ID
        );

        const file = `${citiesStatePath}/${state.Sigla}.json`;

        await createFile(file, JSON.stringify(citiesOfState));
    }
};

const readFile = async (file) => {
    try {
        return await fs.readFile(file);
    } catch (error) {
        throw `Falha ao ler o arquivo json "${file}": ${error}`;
    }
};

const createFile = async (file, data) => {
    try {
        await fs.writeFile(file, data);
    } catch (error) {
        throw `Falha ao criar o arquivo ${file}: ${error}`;
    }
};

const printData = () => {
    console.log('5 UFs com mais cidades: ', top5States);
    console.log('5 UFs com menos cidades: ', bottom5States);
    console.log('Lista das cidades com maior nome por UF', citiesOfBiggerNames);
    console.log(
        'Lista das cidades com menor nome por UF',
        citiesOfSmallerNames
    );
    console.log('Cidade com o maior nome: ', biggestCityName);
    console.log('Cidade com o menor nome: ', smallestCityName);
};

console.time();
init();
