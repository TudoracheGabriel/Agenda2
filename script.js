const container = document.querySelector(".container")
const screen = document.querySelector(".screen")
const time=document.querySelector(".time")
const green = document.querySelector(".green_button")
const moveButtons = document.querySelector(".move_buttons")
const up = document.querySelector(".up_button")
const right = document.querySelector(".right_button")
const down = document.querySelector(".down_button")
const left = document.querySelector(".left_button")
const red = document.querySelector(".red_button")
const buttons = document.querySelectorAll(".numbers button");
const menuButton = document.getElementById("menu-text"); 
const menuContainer = document.getElementById("menu-container");
const agendaButton = document.getElementById("agenda");
const calculatorButton = document.getElementById("calculator");


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
  
let inMenu = false; 
// let currentScreen = "main"; 
 

//MENIU
// red.addEventListener("click", function () {
//     if (currentScreen === "agenda" || currentScreen === "calculator") {
//         menuContainer.style.display = "block";
//         currentScreen = "menu"; 
//         inMenu = true;
//     } else if (currentScreen === "menu") {
//         menuContainer.style.display = "none"; 
//         menuButton.style.display = "block";
//         currentScreen = "main";
//         inMenu=false
//     }
// });

menuButton.addEventListener("click", function () {
    if (!inMenu) {
        menuButton.style.display = "none"; 
        menuContainer.style.display = "flex";
        inMenu = true;
        currentScreen = "menu";
    }
});

agendaButton.addEventListener("click", function () {
    screen.textContent = "Agenda"; 
    menuContainer.style.display = "none";
    currentScreen = "agenda"; 
});

calculatorButton.addEventListener("click", function () {
    screen.textContent = "Calculator"; 
    menuContainer.style.display = "none"; 
    currentScreen = "calculator"; 
});




// BUTONUL VERDE
green.addEventListener("click", function () {
    callHistory = JSON.parse(localStorage.getItem("callHistory")) || []; 
    if (callHistory.length === 0) {
      screen.innerHTML = "<p>Nu exista apeluri recente!</p>";
    } else {
      screen.innerHTML = `
        <h3>Apeluri recente</h3>
        <ul>
            ${callHistory
              .map((call) => `<li>${call.name} - ${call.number}</li>`)
              .join("")}
        </ul>
      `;
    }
  });