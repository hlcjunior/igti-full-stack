function normalizeText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function invertText(text) {
    return text.split('').reverse().join('');
}

function numericText(text) {
    const textArray = normalizeText(text.toUpperCase()).split('');

    return textArray
        .map((letter) => {
            switch (letter) {
                case 'O':
                    return 0;
                case 'L':
                    return 1;
                case 'E':
                    return 3;
                case 'A':
                    return 4;
                case 'S':
                    return 5;
                case 'T':
                    return 7;
                default:
                    return letter;
            }
        })
        .join('');
}

function csvText(text) {
    return `"${text.split(' ').join('";"')}"`;
}

function slugText(text) {
    return normalizeText(text.toLowerCase().split(' ').join('-'));
}

function vowelsOnlyText(text) {
    const textArray = text.split('');

    return textArray
        .filter((letter) => {
            switch (normalizeText(letter.toUpperCase())) {
                case 'A':
                case 'E':
                case 'I':
                case 'O':
                case 'U':
                case ' ':
                    return letter;
                default:
                    return '';
            }
        })
        .join('');
}

function consonantsOnlyText(text) {
    const textArray = text.split('');

    return textArray
        .filter((letter) => {
            switch (normalizeText(letter.toUpperCase())) {
                case 'A':
                case 'E':
                case 'I':
                case 'O':
                case 'U':
                    return '';
                default:
                    return letter;
            }
        })
        .join('');
}

function camelCaseText(text) {
    const textArray = normalizeText(text.toLowerCase()).split(' ');

    return (
        textArray[0] +
        textArray
            .slice(1)
            .map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join('')
    );
}

export {
    normalizeText,
    invertText,
    numericText,
    csvText,
    slugText,
    vowelsOnlyText,
    consonantsOnlyText,
    camelCaseText,
};
