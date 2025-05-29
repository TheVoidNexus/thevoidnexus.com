import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZSOkH0t3N66YMrXwgOIA5U1rL9LYEoak",
    authDomain: "tvn-manager.firebaseapp.com",
    projectId: "tvn-manager",
    storageBucket: "tvn-manager.firebasestorage.app",
    databaseURL: "https://tvn-manager-default-rtdb.europe-west1.firebasedatabase.app",
    messagingSenderId: "1014615721112",
    appId: "1:1014615721112:web:20e62b6188f53a995ebced",
    measurementId: "G-1R5230V4SH"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

let events = {};
const currentDate = new Date();
let selectedDate;
let uid;

function calculateFutureBillingDates(startDate, billingCycle, numberOfCounts = 24) {
    const futureDates = [];
    let nextDate = new Date(startDate);

    for (let i = 1; i <= numberOfCounts; i++) {
        switch (billingCycle) {
            case "Weekly":
                nextDate.setDate(nextDate.getDate() + 7);
                break;
            case "Quarterly":
                nextDate.setMonth(nextDate.getMonth() + 3);
                break;
            case "Monthly":
                nextDate.setMonth(nextDate.getMonth() + 1);
                break;
            case "Yearly":
                nextDate.setFullYear(nextDate.getFullYear() + 1);
                break;
            default:
                break;
        }

        const formattedDate = nextDate.toISOString().split('T')[0];

        futureDates.push(formattedDate);
    }

    return futureDates;
}


function fetchEvents() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            const userEventsRef = ref(database, `users/${uid}/data`);

            onValue(userEventsRef, (snapshot) => {
                const data = snapshot.val();
                events = {};

                if (data) {
                    for (let eventId in data) {
                        const event = data[eventId];
                        const billingDate = event.date;
                        const billingCycle = event.cycle;
                
                        let currentDate = formatBillingDate(billingDate);
                
                        const futureBillingDates = calculateFutureBillingDates(
                            new Date(currentDate),
                            billingCycle
                        );
                
                        futureBillingDates.push(currentDate);
                
                        futureBillingDates.forEach((date, index) => {
                            if (!events[date]) {
                                events[date] = [];
                            }
                            const nextBillingDate = findClosestFutureDate(futureBillingDates, new Date());
                            events[date].push({ ...event, billingDate: date, nextBillingDate2: nextBillingDate, futureBillingDates: futureBillingDates });
                        });
                    }
                    renderCalendar(new Date().getMonth(), new Date().getFullYear());
                }
            });
        } else {
            const data = localStorage.getItem("Subscriptions");
            if (data) {
                const storedEvents = JSON.parse(data);

                storedEvents.forEach(event => {
                    const billingDate = event.date;
                    const billingCycle = event.cycle;
                    let currentDate = formatBillingDate(billingDate);

                    const futureBillingDates = calculateFutureBillingDates(
                        new Date(currentDate),
                        billingCycle
                    );

                    futureBillingDates.push(currentDate);

                    futureBillingDates.forEach((date, index) => {
                        if (!events[date]) {
                            events[date] = [];
                        }
                        const nextBillingDate = findClosestFutureDate(futureBillingDates, new Date());
                        events[date].push({ ...event, billingDate: date, nextBillingDate: event.nextBillingDate, nextBillingDate2: nextBillingDate, futureBillingDates: futureBillingDates });
                    });
                });
            }
        }
        renderCalendar(new Date().getMonth(), new Date().getFullYear());
    });
}

function formatBillingDate(date) {
    if (date && date.includes(".")) {
        const [day, month, year] = date.split(".");
        return `${year}-${month}-${day}`;
    }
    return date;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
        fetchEvents();
    } else {
        uid = null;
        fetchEvents();
    }
});

function renderCalendar(month, year) {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    const firstDay = (new Date(year, month)).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    let titleDate = currentDate.toLocaleString(language, { month: 'long' });
    titleDate = titleDate.charAt(0).toUpperCase() + titleDate.slice(1);
    document.getElementById('month-year').textContent = `${titleDate} ${year}`;

    for (let i = 0; i < firstDay; i++) {
        const blankDay = document.createElement('div');
        grid.appendChild(blankDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;

        const dateKey = new Date(year, month, day).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        if (events[dateKey]) {
            const existingSummary = dayElement.querySelector('.event-summary');
            if (existingSummary) {
                existingSummary.remove();
            }

            const eventInt = events[dateKey].length;
            const dot = document.createElement('div');
            const number = document.createElement('span');
            dot.className = 'dot';
            number.className = 'number';
            number.textContent = eventInt;

            if (window.innerWidth <= 480) {
                if(eventInt > 0) {
                    dayElement.style.backgroundColor = '#0066cc';
                }
            }

            dot.appendChild(number);
            dayElement.appendChild(dot);
        }

        dayElement.addEventListener('click', () => openEventDisplayModal(dateKey));
        grid.appendChild(dayElement);
    }
}

function findClosestFutureDate(dates, currentDate) {
    const dateObjects = dates.map(dateStr => {
      const [year, month, day] = dateStr.split('-');
      return new Date(year, month, day);
    });
  
        let minDiff = Infinity;
        let closestDate = null;
    
        dateObjects.forEach(date => {
            if (date > currentDate) {
                const diff = date - currentDate;
                if (diff < minDiff) {
                    minDiff = diff;
                    closestDate = date;
                } else if (diff === minDiff) {
                    closestDate = closestDate < date ? closestDate : date;
                }
            }
        });
  
    if (closestDate) {
      const day = closestDate.getDate().toString().padStart(2, '0');
      const month = (closestDate.getMonth() + 1).toString().padStart(2, '0');
      const year = closestDate.getFullYear();
      return loadTimeFormat(`${year}-${month}-${day}`);
  }
}

function openEventDisplayModal(dateKey) {
    selectedDate = dateKey;
    const displayModal = document.getElementById('event-display-modal');
    const eventList = document.getElementById('event-list');
    const selectedDateElement = document.getElementById('selected-date');

    displayModal.addEventListener('click', (event) => {
        if (event.target === displayModal) { 
            closeModal(displayModal.id);
          }
      });

    selectedDateElement.textContent = t[language].eventsOn + `${loadTimeFormat(selectedDate)}:`;
    eventList.innerHTML = '';

    (events[dateKey] || []).forEach(event => {

    const li = document.createElement('li');
    const currency = event.currency;

    let usd = "";
    let currencyElse = "";
  
    if (currency === "$") {
      usd = "$";
    } else {
      currencyElse = currency;
    }
  
    let billingCycleElse = "";
  
    if (event.cycle == "Yearly") {
      billingCycleElse = t[language].year2;
    } else if (event.cycle == "Quarterly") {
      billingCycleElse = t[language].quarter;
    } else if (event.cycle == "Monthly") {
      billingCycleElse = t[language].month2;
    } else if (event.cycle == "Weekly") {
      billingCycleElse = t[language].week2;
    }

        let name = event.name.length > 25 ? event.name.slice(0, 24) + '...' : event.name;

        const formattedDate = new Date(event.billingDate).toISOString().split('T')[0];
            
        let nextBillingDate = findClosestFutureDate(event.futureBillingDates, new Date(formattedDate));

        li.innerHTML = `<strong>${name}</strong><br>${t[language].nextBillingDate}${nextBillingDate}<br>
        ${t[language].price}${usd}${event.amount}${currencyElse} / ${billingCycleElse}`

        li.classList.add('event-item');
        
        eventList.appendChild(li);
    });

    if(eventList.children.length === 0) {
        const p = document.createElement('p');
        p.textContent = t[language].noEvents;
        p.classList.add('no-events');
        eventList.appendChild(p);
    }

    displayModal.style.display = 'flex';
}

function openAddEventModal() {
    const modal = document.getElementById('add-event-modal');
    const eventModal = document.getElementById('event-display-modal');
    const selectedDateElement = document.getElementById('selected-date2');

    modal.style.display = 'flex';
    eventModal.style.display = 'none';

    selectedDateElement.textContent = t[language].addEvent + `${loadTimeFormat(selectedDate)}:`;

    modal.addEventListener('click', (event) => {
        if (event.target === modal) { 
            closeModal(modal.id);
          }
      });
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function addEvent() {
    const eventName = document.getElementById('event-name').value.trim();
    const amount = parseInt(document.getElementById('amount').value.trim(), 10);
    const billingDate = selectedDate;

    const eventNameInput = document.getElementById('event-name'); 
    const billingCycleSelect = document.getElementById('billing-cycle');
    const amountInput = document.getElementById('amount');

    const dateElement = document.getElementById('date');
    dateElement.textContent = billingDate;

    if (eventName && billingDate && billingCycleSelect.value != "" && !isNaN(amount)) {
        fetchEvents();
        renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
        closeModal('add-event-modal');
    } else {
        alert(`${t[language].fillAllFields}`);
        return;
    }

    setTimeout(() => {
        eventNameInput.value = '';
        billingCycleSelect.value = 'Monthly';
        amountInput.value = '';
    }, 500);
}

setInterval(() => {
    if (localStorage.getItem("SubRemoved") === "true") {
        localStorage.removeItem("SubRemoved");
        fetchEvents();
    }
}, 500);

document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
});

document.getElementById('open-add-event-modal').addEventListener('click', openAddEventModal);
document.getElementById('save-event-button').addEventListener('click', addEvent);

document.getElementById('close-display-modal').addEventListener('click', () => closeModal('event-display-modal'));
document.getElementById('close-add-event-modal').addEventListener('click', () => closeModal('add-event-modal'));

window.addEventListener('load', () => renderCalendar(currentDate.getMonth(), currentDate.getFullYear()));