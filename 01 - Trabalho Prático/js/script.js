window.addEventListener('load', start);

var inputRange = null;
var inputNumber = null;
var inputNumberFull = null;

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
    inputRange = document.querySelector('#range');
    inputNumber = document.querySelector('#number');
    inputNumberFull = document.querySelector('#numberFull');

    inputRange.addEventListener('change', setNumber);
    inputRange.addEventListener('change', setNumberFull);
    inputRange.focus();
}

function setNumber() {
    inputNumber.value = inputRange.value;
}

function setNumberFull() {
    var number = inputNumber.value;
    var numberLen = number.length;

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
