import { reverse } from 'dns';
import { promises as fs } from 'fs';

const citiesStatePath = './json/cities-by-state';

const init = async () => {
    try {
        const jsonStates = JSON.parse(await readFile('./json/States.json'));
        const jsonCities = JSON.parse(await readFile('./json/Cities.json'));

        await createJsonFilesCitiesByState(jsonStates, jsonCities);

        const top5States = await getTop5States(jsonStates);
        const bottom5States = await getTop5States(jsonStates, true);
        const citiesOfBiggerNames = await getCitiesOfBiggerNames(jsonStates);
        const citiesOfSmallerNames = await getCitiesOfBiggerNames(
            jsonStates,
            true
        );
        const cityOfBiggerName = await getBiggestCityName(
            citiesOfBiggerNames.slice(0)
        );
        const cityOfSmallerName = await getBiggestCityName(
            citiesOfSmallerNames.slice(0),
            true
        );

        console.log('5 UFs com mais cidades: ', top5States);
        console.log('5 UFs com menos cidades: ', bottom5States);
        console.log(
            'Lista das cidades com maior nome por UF',
            citiesOfBiggerNames
        );
        console.log(
            'Lista das cidades com menor nome por UF',
            citiesOfSmallerNames
        );
        console.log('Cidade com o maior nome: ', cityOfBiggerName);
        console.log('Cidade com o menor nome: ', cityOfSmallerName);
    } catch (error) {
        console.error(error);
    }
};

const getBiggestCityName = async (cities, reverse) => {
    const citiesSort = cities.sort((a, b) => {
        if (a.length == b.length) {
            return a.localeCompare(b);
        }

        if (reverse) {
            return a.length > b.length && reverse ? 1 : -1;
        } else {
            return a.length > b.length ? -1 : 1;
        }
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
                    total: Nome.length,
                };
            })
            .sort((a, b) => {
                if (a.city.length === b.city.length) {
                    return a.city.localeCompare(b.city);
                }
                if (reverse) {
                    return a.city.length > b.city.length ? 1 : -1;
                } else {
                    return b.city.length > a.city.length ? 1 : -1;
                }
            });
        citiesOfBiggerNames.push(`${citiesSort[0].city} - ${Sigla}`);
    }

    return citiesOfBiggerNames;
};

const getTop5States = async (jsonStates, reverse) => {
    let statesCountCities = [];

    for (const { Sigla } of jsonStates) {
        statesCountCities.push({
            state: Sigla,
            totalCities: await getTotalCities(Sigla),
        });
    }

    let ordered = statesCountCities.sort(
        (a, b) => b.totalCities - a.totalCities
    );

    ordered = reverse ? ordered.slice(-5) : ordered.slice(0, 5);

    let result = [];
    ordered.map(({ state, totalCities }) => {
        result.push(`${state} - ${totalCities}`);
    });

    return result;
};

const getTotalCities = async (state) => {
    const jsonFile = JSON.parse(
        await readFile(`${citiesStatePath}/${state}.json`)
    );
    return jsonFile.length;
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

init();
