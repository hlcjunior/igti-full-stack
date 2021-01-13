function normalizeText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function invertText(text) {
    return [...text].reverse().join('');
}

export function numericText(text) {
    return normalizeText(text)
        .toUpperCase()
        .replace(/['O']/g, '0')
        .replace(/['L']/g, '1')
        .replace(/['E']/g, '3')
        .replace(/['A']/g, '4')
        .replace(/['S']/g, '5')
        .replace(/['T']/g, '7');
}

export function csvText(text) {
    return `"${text.split(' ').join('";"')}"`;
}

export function slugText(text) {
    return normalizeText(text).toLowerCase().split(' ').join('-');
}

export function vowelsOnlyText(text) {
    return normalizeText(text).replace(/['BCDFGHJKLMNPQRSTVWXYZ']/gi, '');
}

export function consonantsOnlyText(text) {
    return normalizeText(text).replace(/['AEIOU']/gi, '');
}

export function camelCaseText(text) {
    const textArray = normalizeText(text).toLowerCase().split(' ');

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
