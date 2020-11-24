window.addEventListener('load', start);

var arrUnitSpecialTen = [
    'zero',
    'um',
    'dois',
    'três',
    'quatro',
    'cinco',
    'seis',
    'sete',
    'oito',
    'nove',
    'dez',
    'onze',
    'doze',
    'treze',
    'catorze',
    'quinze',
    'dezesseis',
    'dezessete',
    'dezoito',
    'dezenove',
];

var arrTen = [
    'vinte',
    'trinta',
    'quarenta',
    'cinquenta',
    'sessenta',
    'setenta',
    'oitenta',
    'noventa',
];

var arrHundred = [
    'cento',
    'duzentos',
    'trezentos',
    'quatrocentos',
    'quinhentos',
    'seiscentos',
    'setecentos',
    'oitocentos',
    'novecentos',
];

function start() {
    document.querySelector('#range').addEventListener('change', setNumberFull);
}

function setNumberFull(event) {
    var number = event.target.value;

    var numberLen = number.length;

    var inputNumberFull = document.querySelector('#numberFull');

    document.querySelector('#number').value = number;

    switch (numberLen) {
        case 1:
            inputNumberFull.value = unitSpecialTenFull(number);
            break;
        case 2:
            inputNumberFull.value = tenFull(number);
            break;
        case 3:
            inputNumberFull.value = hundredFull(number);
            break;
        default:
            inputNumberFull.value = 'Ops, eu só sei os números entre 0 e 999';
    }
}

function unitSpecialTenFull(number) {
    return arrUnitSpecialTen[number];
}

function tenFull(number) {
    if (number < 20) {
        return unitSpecialTenFull(number);
    } else {
        var ten = parseInt(number / 10 - 2);
        var unit = parseInt(number % 10);

        return arrTen[ten] + (unit > 0 ? ' e ' + unitSpecialTenFull(unit) : '');
    }
}

function hundredFull(number) {
    if (number == 100) {
        return 'cem';
    } else {
        var hundred = parseInt(number / 100 - 1);

        var ten = parseInt(number % 100);

        var complement = ten > 0 ? ' e ' + tenFull(ten) : '';

        return arrHundred[hundred] + complement;
    }
}
