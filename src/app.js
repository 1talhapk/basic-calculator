console.log('first')
class Calculator {
    constructor(prevCalculations, currentCalculations) {
        this.previousCalculations = prevCalculations;
        this.currentCalculations = currentCalculations;
        this.operation = '';
    }

    clear() {
        this.previousCalculations = '';
        this.currentCalculations = '';
        this.operation = '';
        this.showResults();
    }
    compute() {
        if (this.previousCalculations === '') {
            this.previousCalculations = this.currentCalculations;
            this.currentCalculations = '';
        } else {
            switch (this.operation) {
                case '+':
                    this.previousCalculations = (parseFloat(this.previousCalculations) + parseFloat(this.currentCalculations)).toString();
                    this.currentCalculations = '';
                    break;
                case '-':
                    this.previousCalculations = (parseFloat(this.previousCalculations) - parseFloat(this.currentCalculations)).toString();
                    this.currentCalculations = '';
                    break;
                case '×':
                    this.previousCalculations = (parseFloat(this.previousCalculations) * parseFloat(this.currentCalculations)).toString();
                    this.currentCalculations = '';
                    break;
                case '÷':
                    this.previousCalculations = (parseFloat(this.previousCalculations) / parseFloat(this.currentCalculations)).toString();
                    this.currentCalculations = '';
                    break;
                default:
                    console.log('nothing happened')
                    break;
            }
        }
    }
    operationPressed(operationPressed) {
        if (this.currentCalculations === '') {
            this.operation = operationPressed;
            this.showResults();
            return
        }
        this.compute();
        this.operation = operationPressed;
        this.showResults();
    }
    equalPressed() {
        if (this.currentCalculations === '') return
        this.compute()
        this.currentCalculations = this.previousCalculations;
        this.previousCalculations = '';
        this.operation = '';
        this.showResults();

    }
    appendNext(typedNumber) {
        if (this.currentCalculations.length >= 17) return
        if (typedNumber == '.' && this.currentCalculations.includes('.')) return;
        if (typedNumber === '0') {
            if (this.currentCalculations.includes('.')) {
                this.currentCalculations = this.currentCalculations + typedNumber.toString();
            } else {
                if (parseInt(this.currentCalculations) === 0) {
                    return
                } else {
                    this.currentCalculations = this.currentCalculations + typedNumber.toString();
                }
            }
        } else {
            this.currentCalculations = this.currentCalculations + typedNumber.toString();
        }
        this.showResults();
    }
    deletePressed() {
        if (this.currentCalculations === '') return
        this.currentCalculations = this.currentCalculations.slice(0, -1);
        this.showResults();
    }
    showResults() {
        if (this.previousCalculations === '') {
            prevData.innerText = '';
        } else {
            prevData.innerText = this.previousCalculations + ' ' + this.operation;

        }
        currentData.innerHTML = this.currentCalculations;
    }
}

let numberBtn = document.querySelectorAll('[numberBtn]');
let operationBtn = document.querySelectorAll('[operationBtn]');
let prevData = document.querySelector('.prev-data')
let currentData = document.querySelector('.current-data')
let allClear = document.querySelector('.all-clear')
let equalBtn = document.querySelector('.equalBtn')
let deleteBtn = document.querySelector('[deleteBtn]')

let calculator = new Calculator(prevData.innerText, currentData.innerText);

allClear.addEventListener('click', () => calculator.clear());
equalBtn.addEventListener('click', () => calculator.equalPressed());
deleteBtn.addEventListener('click', () => calculator.deletePressed());
numberBtn.forEach(numberPressed => {
    numberPressed.addEventListener('click', () => calculator.appendNext(numberPressed.innerText))
});

operationBtn.forEach(operationPressed => {
    operationPressed.addEventListener('click', () => calculator.operationPressed(operationPressed.innerText))
});
