const two = 2;

let input = $('.calculator-input');
let clear = $('.calculator__item_clear');
let result = $('.calculator__item_result');
let item = $('.calculator__item');
let log = $('.log');
let forLog;

let inputVal = 0;
input.val(inputVal);

$(item).click(function () {
    if (inputVal === 0) {
        inputVal = '';
    }
    if (this.innerText !== 'AC' && this.innerText !== '=') {
        inputVal += this.innerText;
        input.val(inputVal);
        forLog = inputVal;
    }
    let current = inputVal[inputVal.length - 1];
    let previous = inputVal[inputVal.length - 1 -1];

    let flag = false;
    if (current === '+' || current === '-' || current === '*' || current === '/') {
        flag = true;
    }
    let flagNew = false;
    if (previous === '+' || previous === '-' || previous === '*' || previous === '/') {
        flagNew = true;
    }
    if (flag && flagNew) {
        inputVal = inputVal.replace(previous,current);
            inputVal = Array.from(inputVal);
            inputVal.pop();
            inputVal = inputVal.join('');
            inputVal = parseInt(inputVal) + current;
            input.val(inputVal);
        }
})

$(result).click(function () {
    inputVal = Function('return ' + inputVal)();
    if (parseInt(inputVal.toFixed()) !== inputVal){
        inputVal = inputVal.toFixed(two);
    }
    input.val(inputVal);

    if (inputVal === 'Infinity') {
        inputVal = 'ERROR';
        input.val(inputVal);
    }
    if (inputVal !== 'ERROR' && inputVal !== undefined) {
        let textInItem = forLog + ' = ' + inputVal;

        let logItem = document.createElement('div');
        logItem.innerText = textInItem;
        logItem.classList.add('log-item');

        if (textInItem.includes('48')) {
            $(logItem).css('textDecoration', 'underline');
        }

        let delIcon = document.createElement('div');
        delIcon.classList.add('delete');
        logItem.append(delIcon);

        let circle = document.createElement('div');
        circle.classList.add('circle');
        logItem.prepend(circle);
        log.prepend(logItem);

        $(delIcon).click(function () {
            logItem.remove();
        })
        $(circle).click(function () {
            $(circle).toggleClass('bgc');
        })
    }
})

$(clear).click(function () {
    inputVal = '';
    input.val(inputVal);
})

log.scroll(function () {
    console.log('Scroll Top: ' + log.scrollTop());
})