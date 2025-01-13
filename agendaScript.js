const container = document.querySelector(".container")
const screen = document.querySelector(".screen")
const time=document.querySelector(".time")
const green = document.querySelector(".green_button")
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
let currentScreen = "main"; 

//AGENDA

class AgendaTelefonica {
  constructor() {
      this.contacts = JSON.parse(localStorage.getItem("agendaContacts")) || [];
  }

  addContact(name, number) {
      this.contacts.push({ name, number });
      this.saveToLocalStorage();
  }

  getContacts() {
      return this.contacts;
  }

  deleteContact(index) {
      if (index >= 0 && index < this.contacts.length) {
          this.contacts.splice(index, 1); 
          this.saveToLocalStorage();
      }
  }

  saveToLocalStorage() {
      localStorage.setItem("agendaContacts", JSON.stringify(this.contacts));
  }
}


  const agenda = new AgendaTelefonica();
  const viewAgendaButton = document.getElementById('view-agenda')
  const addContact = document.getElementById('add-contact')
  let currentNumber = "";
  let callHistory = JSON.parse(localStorage.getItem("callHistory")) || [];

// SALVARE APEL IN STORAGE
function saveCallHistory() {
  localStorage.setItem("callHistory", JSON.stringify(callHistory));
}

// ADAUGA APEL IN CALL HISTORY
function addToCallHistory(name, number) {
  callHistory.unshift({ name, number }); 
  if (callHistory.length > 10) {
    callHistory.pop(); 
  }
  saveCallHistory(); 
  console.log(callHistory)
}

  
  addContact.addEventListener('click', ()=>{
    screen.innerHTML = `
    <div class="agenda-show">
    <div>
      <label for="name">Nume:</label>
      <input type="text" id="name" placeholder="Introdu numele" />
    </div>
    <div>
      <label for="number">Numar:</label>
      <input type="text" id="number" placeholder="Introdu numarul" disabled />
    </div>
    <button id="save-contact">Salveaza Contact</button>
    </div>
  `;
  const nameInput = document.getElementById("name");
  const numberInput = document.getElementById("number");
  const saveButton = document.getElementById("save-contact");

  buttons.forEach((button) => {
    button.onclick = () => {
      const buttonValue = button.textContent;
      currentNumber += buttonValue;
      numberInput.value = currentNumber;
    };
  });

  // SALVEAZA CONTACT
saveButton.addEventListener("click", function () {
  const name = nameInput.value.trim();
  const number = numberInput.value.trim();

  // VERIFICARE NUMAR DE TELEFON
  if (name && number) {
      if (number.length === 10 && number[0] === '0') {
          agenda.addContact(name, number); 
          console.log(agenda)
          alert(`Contact salvat: ${name} - ${number}`);
          screen.innerHTML = `<p>Contactul a fost salvat cu succes!</p>`;
          currentNumber = ""; 
      } else {
          alert("Numarul de telefon nu respecta regulile:\n- Trebuie sa inceapa cu cifra 0\n- Nu trebuie sa fie mai lung sau scurt de 10 caractere");
      }
  } else {
      alert("Completeaza toate campurile!");
  }
});
  })

  viewAgendaButton.addEventListener("click", function () {
    const contacts = agenda.getContacts();
    console.log(contacts)

    if (contacts.length === 0) {
        screen.innerHTML = "<p>Agenda este goala!</p>";
    } else {
      screen.innerHTML = `
      <ul>
          ${contacts.map((contact, index) => `
              <li>
                  ${contact.name} - ${contact.number}
                  <button class="call-contact" data-index="${index}">Apel</button>
                  <button class="delete-contact" data-index="${index}">Sterge</button>
              </li>
          `).join("")}
      </ul>
  `;

         // APEL
         const callButtons = document.querySelectorAll(".call-contact");
         callButtons.forEach(button => {
          button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"), 10);
            const contact = agenda.getContacts()[index];
            addToCallHistory(contact.name, contact.number); 
            alert("Apel efectuat către: " + contact.name);
          });
        });

        // STERGE CONTACT
        const deleteButtons = document.querySelectorAll(".delete-contact");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"), 10);
                agenda.deleteContact(index); 
                alert("Contact sters!");
                viewAgendaButton.click(); 
            });
        });
    }
});


///// BUTONUL VERDE
green.addEventListener("click", function () {
  if (callHistory.length === 0) {
      screen.innerHTML = "<p>Nu există apeluri recente!</p>";
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