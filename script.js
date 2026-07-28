let display = document.getElementById('display');
let current = '';
let firstNum = null;
let operator = null;

function appendNumber(num) {
  current += num;
  display.value = current;
}

function appendOperator(op) {
  if (current === '') return;
  firstNum = current;
  operator = op;
  current = '';
  display.value = firstNum + ' ' + op;
}

function clearDisplay() {
  current = '';
  firstNum = null;
  operator = null;
  display.value = '';
}

function deleteLast() {
  current = current.slice(0, -1);
  display.value = current;
}

async function calculate() {
  if (firstNum === null || current === '') return;

  try {
    const response = await fetch('http://localhost:5000/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ num1: firstNum, num2: current, operator })
    });

    const data = await response.json();

    if (data.error) {
      display.value = data.error;
    } else {
      display.value = data.result;
      current = data.result.toString();
      firstNum = null;
      operator = null;
    }
  } catch (err) {
    display.value = 'Backend not running!';
  }
}