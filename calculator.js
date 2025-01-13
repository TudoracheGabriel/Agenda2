const time = document.querySelector(".time");
const container = document.querySelector(".container");
const screen = document.querySelector(".screen");
const green = document.querySelector(".green_button");
const red = document.querySelector(".red_button");
const buttons = document.querySelectorAll(".numbers button");
const butoane = document.getElementById('butoane');
const sterge = document.getElementById('sterge');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const multiple = document.getElementById('multiple');
const divide = document.getElementById('divide');
const equal = document.getElementById('equal');
const display = document.getElementById('display');

// ORA //
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
  
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    time.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  setInterval(updateTime, 1000);
  updateTime();

// NUMERE

let currentExpression = ""; 
let lastOperator = ""; 


function updateDisplay() {
    display.value = currentExpression;
  }
  
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      currentExpression += button.textContent;  
      updateDisplay();  
    });
  });


//OPERATII
plus.addEventListener("click", function() {
    currentExpression += "+";  
    updateDisplay();
  });
  
  
  minus.addEventListener("click", function() {
    currentExpression += "-";  
    updateDisplay();
  });
  
  
  multiple.addEventListener("click", function() {
    currentExpression += "*";  
    updateDisplay();
  });
  
  
  divide.addEventListener("click", function() {
    currentExpression += "/";  
    updateDisplay();
  });
  
  
  equal.addEventListener("click", function() {
    let result = calculate(); 
    currentExpression = result.toString(); 
    updateDisplay();
});

  sterge.addEventListener("click", function() {
    currentExpression = ""; 
    updateDisplay();
});
  
  function calculate() {
    let result = 0;
    let numbers = currentExpression.split(/[\+\-\*\/]/); 
    let operators = currentExpression.replace(/[0-9]/g, "").split(""); 

    result = parseFloat(numbers[0]); 

    
    for (let i = 0; i < operators.length; i++) {
        let num = parseFloat(numbers[i + 1]); 
        if (operators[i] === "+") {
            result += num;
        } else if (operators[i] === "-") {
            result -= num;
        } else if (operators[i] === "*") {
            result *= num;
        } else if (operators[i] === "/") {
            result /= num;
        }
    }

    return result;
}