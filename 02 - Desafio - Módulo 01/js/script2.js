const inputSearchText = document.querySelector('#inputSearchText');
const btSearch = document.querySelector('#btSearch');

let searchResult = document.querySelector('#searchResult');
let statisticsResult = document.querySelector('#statisticsResult');

let numberFormat = null;

let json = [];

const start = () => {
    numberFormat = Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 2,
    });

    connect();
};

const handleSearch = (event) => {
    const user = inputSearchText.value.trim();

    btSearch.disabled = user === '';

    if (
        user !== '' &&
        (event.key === 'Enter' || event.target.id === 'btSearch')
    ) {
        searchUser(user);
    }
};

const searchUser = () => {
    let resultHTML = "<div class='result'>";
    let total = 0;

    const statistics = json
        .map((user) => {
            const { name, picture, dob, gender } = user;

            return {
                name: `${name.first} ${name.last}`,
                picture: picture.thumbnail,
                age: dob.age,
                gender,
            };
        })
        .sort((a, b) => {
            return a.name.localeCompare(b.name);
        })
        .filter((user) => {
            const filter = user.name
                .toString()
                .toLowerCase()
                .includes(inputSearchText.value.toString().toLowerCase());

            if (filter) {
                const userHTML = `
            <div class='user'>
                <img src="${user.picture}">
                ${user.name}, ${user.age}
            </div>
        `;

                resultHTML += userHTML;

                total++;

                return user;
            }
            return false;
        })
        .reduce(
            (accumulator, current) => {
                if (current.gender === 'male') {
                    accumulator.sumMale++;
                }

                if (current.gender === 'female') {
                    accumulator.sumFemale++;
                }

                accumulator.sumAge += current.age;

                return accumulator;
            },
            { sumMale: 0, sumFemale: 0, sumAge: 0 }
        );

    resultHTML += '</div>';

    if (total > 0) {
        const headerResult = `
            <div class='header-result'>
                ${total} usuário(s) encontrado(s)
            </div>
        `;

        searchResult.innerHTML = headerResult + resultHTML;

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
    } else {
        searchResult.innerHTML =
            'Nenhum usuário encontrado com "' + inputSearchText.value + '"';
    }
};

const connect = async () => {
    var res = await fetch('http://localhost:3001/results').catch(() => {
        alert(
            'Não foi possível recuperar os dados do servidor, recerrague a página'
        );
        return;
    });
    json = await res.json();

    prepareSearch();
};

const prepareSearch = () => {
    inputSearchText.disabled = false;
    inputSearchText.focus();
    inputSearchText.addEventListener('keyup', handleSearch);
    btSearch.addEventListener('click', handleSearch);
};

start();
