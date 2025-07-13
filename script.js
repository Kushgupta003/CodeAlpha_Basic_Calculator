// script.js
// this script handles the calculator's functionality
const display = document.getElementById('display');
let currentInput = '';
let resultDisplayed = false;

function updateDisplay(value) {
    display.textContent = value || '0';
}

function appendNumber(num) {
    if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
    }
    currentInput += num;
    updateDisplay(currentInput);
}

function appendOperator(op) {
    if (currentInput === '') return;
    const lastChar = currentInput.slice(-1);
    if ("+-*/".includes(lastChar)) {
        currentInput = currentInput.slice(0, -1); // Replace last operator
    }
    currentInput += op;
    updateDisplay(currentInput);
}

function clearDisplay() {
    currentInput = '';
    resultDisplayed = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}
// this function evaluates the expression in currentInput
function calculate() {
    if (currentInput === '') return;

    try {
        // Replace symbols if needed
        const finalExpression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(finalExpression);
        updateDisplay(result);
        currentInput = result.toString();
        resultDisplayed = true;
    } catch (e) {
        updateDisplay("Error");
        currentInput = '';
    }
}

// Keyboard Support 
// Listen for keyboard events to handle calculator input
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key) || key === '.') {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

