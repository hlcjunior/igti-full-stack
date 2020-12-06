const inputSearchText = document.querySelector('#inputSearchText');
const btSearch = document.querySelector('#btSearch');

let searchResult = document.querySelector('#searchResult');
let statisticsResult = document.querySelector('#statisticsResult');

let allUsers = [];
let usersFiltered = [];

let numberFormat = null;

const start = async () => {
    numberFormat = Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 2,
    });

    await connect();
    prepareSearch();
};

const handleSearch = ({ key, target }) => {
    const user = inputSearchText.value.trim();

    btSearch.disabled = user === '';

    if (user !== '' && (key === 'Enter' || target.id === 'btSearch')) {
        searchUser(user);
    }
};

const searchUser = () => {
    const searchText = inputSearchText.value.toString().toLowerCase();
    usersFiltered = allUsers.filter(({ nameLower }) => {
        return nameLower.includes(searchText);
    });

    renderResults();
    renderStatistics();
};

const renderResults = () => {
    let resultHTML = "<div class='result'>";

    usersFiltered.forEach((user) => {
        const { picture, name, age } = user;

        const userHTML = `
            <div class='user'>
                <img src="${picture}">
                ${name}, ${age}
            </div>
        `;

        resultHTML += userHTML;
    });

    resultHTML += '</div>';

    const total = usersFiltered.length;

    if (total > 0) {
        const headerResult = `
            <div class='header-result'>
                ${total} usuário(s) encontrado(s)
            </div>
        `;

        searchResult.innerHTML = headerResult + resultHTML;
    } else {
        searchResult.innerHTML =
            'Nenhum usuário encontrado com "' + inputSearchText.value + '"';
    }
};

const renderStatistics = () => {
    const total = usersFiltered.length;

    if (total <= 0) {
        statisticsResult.innerHTML =
            'Nenhuma estatística encontrada para "' +
            inputSearchText.value +
            '"';

        return;
    }

    const statistics = usersFiltered.reduce(
        (accumulator, { gender, age }) => {
            gender === 'male' ? accumulator.sumMale++ : accumulator.sumFemale++;

            accumulator.sumAge += age;

            return accumulator;
        },
        { sumMale: 0, sumFemale: 0, sumAge: 0 }
    );

    const headerStatistic = `
            <div class='header-statistic'>
                Estatísticas
            </div>
        `;

    const avgAge = numberFormat.format(
        parseInt(statistics.sumAge) / parseInt(total)
    );

    const statisticHTML = `
        <div class='statistic'>
            <p>Sexo masculino: ${numberFormat.format(statistics.sumMale)}</p>
            <p>Sexo feminino: ${numberFormat.format(statistics.sumFemale)}</p>
            <p>Soma das idades: ${numberFormat.format(statistics.sumAge)}</p>
            <p>Média das idades: ${avgAge}</p>
        </div>
    `;

    statisticsResult.innerHTML = headerStatistic + statisticHTML;
};

const connect = async () => {
    var res = await fetch('http://localhost:3001/results').catch(() => {
        alert(
            'Não foi possível recuperar os dados do servidor, recerrague a página'
        );
        return;
    });
    var json = await res.json();

    allUsers = json
        .map(({ name, picture, dob, gender }) => {
            const nameFull = `${name.first} ${name.last}`;

            return {
                name: nameFull,
                nameLower: nameFull.toLowerCase(),
                picture: picture.thumbnail,
                age: dob.age,
                gender,
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
};

const prepareSearch = () => {
    inputSearchText.disabled = false;
    inputSearchText.focus();
    inputSearchText.addEventListener('keyup', handleSearch);
    btSearch.addEventListener('click', handleSearch);
};

start();
