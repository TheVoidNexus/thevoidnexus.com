import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, set, get, push, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

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
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

let userCheck;
let usersave = {};

auth.languageCode = language;

const loginIcon = document.getElementById("profile");

function successfulLogin(user) {
    usersave = JSON.parse(localStorage.getItem("User")) || {};
    usersave.profileURL = user.photoURL;
    usersave.displayName = user.displayName;
    usersave.email = user.email;
    usersave.creationTime = user.metadata.creationTime;
    usersave.uid = user.uid;
    localStorage.setItem("User", JSON.stringify(usersave));
    const pfp = document.getElementById("pfp");
    pfp.src = usersave.profileURL || "https://i.ibb.co/BPXJpy4/Bild-2024-12-10-084719879.png";
}

function successfulLogout() {
    localStorage.removeItem("User");
    location.reload();
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        userCheck = user;

        const userID = user.uid;
        
        if(userID == "GW8WuvI9CGYdyavqGaeBrTaZwaL2") {
            document.getElementById("verified-check").style.display = "flex";
        }

        successfulLogin(user);
    } else {
            const loginButton = document.getElementById("login-button")         
            loginButton.addEventListener("click", () => {
                window.location.href = "tvn-login.html";
            });

            loginButton.style.display = "flex";
        

        loginIcon.addEventListener("click", function () {
            window.location.href = "tvn-login.html";
        });
        const skeleton = document.querySelector('.card2');
        skeleton.style.display = 'none';

        const subscriptions = document.getElementById("subscriptions");
        if (subscriptions.childElementCount === 0) {
            const p = document.createElement("p");
            p.textContent = t[language].noSubscriptions;
            p.classList.add("no-subscriptions");
            subscriptions.appendChild(p);
        }
    }
});

const signoutButton = document.getElementById("signoutButton");
signoutButton.addEventListener("click", () => {
    auth.signOut().then(() => {
        successfulLogout();
        profileCard.style.display = "none";
        overlay.style.display = "none";
    }).catch((error) => {
        console.error(error);
    });
});

const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", () => {
    profileCard.style.display = "none";
    overlay.style.display = "none";
});

const dropdown = document.getElementById("dropdown");
dropdown.addEventListener("click", () => {
    if (userCheck) {
        profileDropdown.childNodes[2].textContent = t[language].profile;
    } else {
        profileDropdown.childNodes[2].textContent = t[language].login;
    }
});

const profileDropdown = document.getElementById("profile");
const pfp = document.getElementById("pfp");
const usernamePopup = document.getElementById("username");
const creation = document.getElementById("created");

profileDropdown.addEventListener("click", () => {
    if (userCheck) {
        let username = usersave.displayName;
        overlay.style.display = "block";
        profileCard.style.display = "flex";
        invisibleOverlay.style.display = "none";
        dropdownContent.style.display = "none";
        pfp.src = usersave.profileURL || "https://i.ibb.co/BPXJpy4/Bild-2024-12-10-084719879.png";
        creation.innerHTML = timeSince(usersave.creationTime);
        usernamePopup.textContent = username;
    }
});

const profileCard = document.getElementById("profileCard");

const profileCardHandler = () => {
    profileCard.style.display = "flex";
    overlay.style.display = "block";
}

const overlayClickHandler = () => {
    profileCard.style.display = "none";
    overlay.style.display = "none";
};

if (userCheck) {
    profileDropdown.addEventListener("click", profileCardHandler);
    overlay.addEventListener("click", overlayClickHandler);
}

function timeSince(date) {
    const now = new Date();
    const past = new Date(date);
    const prefix = t[language].created;
    let swedishSuffix = "";
    const secondsPast = Math.floor((now - past) / 1000);
    const minutesPast = Math.floor(secondsPast / 60);
    const hoursPast = Math.floor(minutesPast / 60);
    const daysPast = Math.floor(hoursPast / 24);
    const weeksPast = Math.floor(daysPast / 7);
    const monthsPast = Math.floor(daysPast / 30);
    const yearsPast = Math.floor(monthsPast / 12);
    let timeUnitKey;
    let timeValue;
    let timeUnit;

    if(language == "sv") {
        swedishSuffix = " sedan";
    }

    if (yearsPast > 0) {
        timeValue = yearsPast;
        timeUnitKey = timeValue > 1 ? t[language].years : t[language].year;
    } else if (monthsPast > 0) {
        timeValue = monthsPast;
        timeUnitKey = timeValue > 1 ? t[language].months : t[language].month;
    } else if (weeksPast > 0) {
        timeValue = weeksPast;
        timeUnitKey = timeValue > 1 ? t[language].weeks : t[language].week;
    } else if (daysPast > 0) {
        timeValue = daysPast;
        timeUnitKey = timeValue > 1 ? t[language].days : t[language].day;
    } else if (hoursPast > 0) {
        timeValue = hoursPast;
        timeUnitKey = timeValue > 1 ? t[language].hours : t[language].hour;
    } else if (minutesPast > 0) {
        timeValue = minutesPast;
        timeUnitKey = timeValue > 1 ? t[language].minutes : t[language].minute;
    } else {
        return prefix + t[language].just_now;
    }
    timeUnit = [timeUnitKey];
    return prefix + t[language].ago + ' ' + timeValue + ' ' + timeUnit + swedishSuffix;
}

function syncLocalStorage(subscriptions) {
    localStorage.setItem("Subscriptions", JSON.stringify(subscriptions));
}

function mergeSubscriptions(firebaseSubscriptions, localSubscriptions) {
    const mergedSubscriptions = [...firebaseSubscriptions];
    localSubscriptions = localSubscriptions || [];
    localSubscriptions.forEach(localSub => {
        if (!firebaseSubscriptions.some(firebaseSub => firebaseSub.name === localSub.name)) {
            mergedSubscriptions.push(localSub);
        }
    });
    return mergedSubscriptions;
}

function calculateNextBillingDate(startDate, billingCycle, numberOfCounts = 24) {
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

function fetchSubscriptions() {
    const localSubscriptions = JSON.parse(localStorage.getItem("Subscriptions"));
    const usersave = JSON.parse(localStorage.getItem("User"));
    const subscriptionsList = document.getElementById("subscriptions");
  
    if (!subscriptionsList) {
      console.error("subscriptionsList element not found!");
      return;
    }
  
    if (usersave && usersave.uid) {
      const userID = usersave.uid;
      const userRef = ref(database, `users/${userID}/data`);

      console.warn("User logged in.")
  
      get(userRef)
        .then((snapshot) => {
          let firebaseSubscriptions = [];
  
          if (snapshot.exists()) {
            subscriptionsList.innerHTML = "";
  
            snapshot.forEach((childSnapshot) => {
              const subscription = childSnapshot.val();
              subscription.id = childSnapshot.key;
  
              let currentDate = subscription.date;
              if (currentDate && currentDate.includes(".")) {
                const [day, month, year] = currentDate.split(".");
                currentDate = `${year}-${month}-${day}`;
              }

            subscription.nextBillingDate = calculateNextBillingDate(currentDate, subscription.cycle);
  
              firebaseSubscriptions.push(subscription);
              displaySubscription(subscription);
            });
          } else {
            console.log("No subscriptions found for this user in Firebase.");
            const skeleton = document.querySelector('.card2');
            skeleton.style.display = 'none';

            const subscriptions = document.getElementById("subscriptions");
            if (subscriptions.childElementCount === 0) {
            const p = document.createElement("p");
            p.textContent = t[language].noSubscriptions;
            p.classList.add("no-subscriptions");
            subscriptions.appendChild(p);
        }
          }
  
          const mergedSubscriptions = mergeSubscriptions(firebaseSubscriptions, localSubscriptions);
  
          mergedSubscriptions.forEach((sub) => {
            if (!firebaseSubscriptions.some((firebaseSub) => firebaseSub.id === sub.id)) {
              const newSubRef = push(ref(database, `users/${usersave.uid}/data`));
              set(newSubRef, sub).then(() => (sub.id = newSubRef.key));
            }
          });
  
          syncLocalStorage(mergedSubscriptions);
  
          if (!snapshot.exists() && localSubscriptions.length > 0) {
            const subscriptionsList = document.getElementById("subscriptions");
            localSubscriptions.forEach((sub) => displaySubscription(sub));
          }
        })
        .catch((error) => {
          console.error("Error fetching subscriptions:", error);
          localSubscriptions ? localSubscriptions.forEach((sub) => displaySubscription(sub)) : null;
        });
    } else {

        if(!localSubscriptions || localSubscriptions.length == 0) {
            document.getElementById("subscriptions").innerHTML = "";
            const subscriptions = document.getElementById("subscriptions");
            const p = document.createElement("p");
            p.textContent = t[language].noSubscriptions;
            p.classList.add("no-subscriptions");
            subscriptions.appendChild(p);
        } else {
            document.getElementById("subscriptions").innerHTML = "";
            localSubscriptions.forEach((sub) => displaySubscription(sub));
        }

    const loginSubFetch = localStorage.getItem("Login");
    if (loginSubFetch) {
    localStorage.removeItem("Login");
    console.warn("New user login. Reloading...");
    setTimeout(() => {
        location.reload()
    },1000)
    } else {
        console.warn("User not logged in.");
    }
    }
}
  
function displaySubscription(subscription) {
    const subscriptionsList = document.getElementById("subscriptions");
    const subscriptionItem = document.createElement("li");
    const currency = subscription.currency;

    let usd = currency === "$" ? "$" : "";
    let currencyElse = currency === "$" ? "" : currency;

    let billingCycleElse = "";
    switch (subscription.cycle) {
        case "Yearly":
            billingCycleElse = t[language].year2;
            break;
        case "Quarterly":
            billingCycleElse = t[language].quarter;
            break;
        case "Monthly":
            billingCycleElse = t[language].month2;
            break;
        case "Weekly":
            billingCycleElse = t[language].week2;
            break;
    }

    const skeleton = document.querySelector('.card2');
    skeleton.style.display = 'none';

    let name = subscription.name.length > 25 ? subscription.name.slice(0, 24) + '...' : subscription.name;

    let nextBillingDate = Array.isArray(subscription.nextBillingDate)
        ? subscription.nextBillingDate[0]
        : subscription.nextBillingDate;

    nextBillingDate = loadTimeFormat(nextBillingDate);

    subscriptionItem.innerHTML = `
    <span class="item-wrapper"> 
        <span class="item">
            <strong>${name}</strong><br>
            ${t[language].nextBillingDate}${nextBillingDate}<br>
            ${t[language].price}${usd}${subscription.amount}${currencyElse} / ${billingCycleElse}
        </span>
        <button class="delete-btn" data-id="${subscription.id}" id="deleteButton-${subscription.id}">
            <svg viewBox="0 0 448 512" class="svgIcon">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
        </button>
    </span>
    `;

    subscriptionsList.appendChild(subscriptionItem);

    const deleteButton = subscriptionItem.querySelector(".delete-btn");
    deleteButton.replaceWith(deleteButton.cloneNode(true));
    const newDeleteButton = document.querySelector(`#deleteButton-${subscription.id}`);

    newDeleteButton.addEventListener("click", (event) => {
        const confirmDialog = document.getElementById("switchDialog");

        if (confirmDialog) {
            confirmDialog.show();
        }

        const confirmDelete = document.getElementById("deleteConfirm");
        confirmDelete.addEventListener("click", (event) => {
            event.stopPropagation();
            const confirmDialog = document.getElementById("switchDialog");
            if (confirmDialog) {
                confirmDialog.hide();
            }

            deleteSubscription(subscription.id);
        }, { once: true });
    });
}


function addSubscription(name, cycle, amount, date, currency) {
    if (name && cycle && amount && date && currency) {
        const newSubscription = { name, cycle, amount, date, currency };
        const localSubscriptions = JSON.parse(localStorage.getItem("Subscriptions")) || [];

        if (usersave && usersave.uid) {
            const userID = usersave.uid;
            const userRef = ref(database, `users/${userID}/data`);
            const newSubscriptionRef = push(userRef);
            set(newSubscriptionRef, newSubscription)
                .then(() => {
                    console.log("New subscription added to database:", newSubscription);

                    let currentDate = newSubscription.date;
                    if (currentDate && currentDate.includes(".")) {
                      const [day, month, year] = currentDate.split(".");
                      currentDate = `${year}-${month}-${day}`;
                    }

                    newSubscription.id = newSubscriptionRef.key;
                    newSubscription.nextBillingDate = calculateNextBillingDate(newSubscription.cycle, currentDate);

                    localSubscriptions.push(newSubscription);

                    syncLocalStorage(localSubscriptions);

                    if(localSubscriptions.length == 0) {
                        document.querySelector(".no-subscriptions").remove();
                    }
                })
                .catch((error) => { });
        } else {
            let currentDate = newSubscription.date;
            if (currentDate && currentDate.includes(".")) {
              const [day, month, year] = currentDate.split(".");
              currentDate = `${year}-${month}-${day}`;
            }
            newSubscription.id = `local-${Date.now()}`;
            newSubscription.nextBillingDate = calculateNextBillingDate(currentDate, newSubscription.cycle);
            displaySubscription(newSubscription);
            localSubscriptions.push(newSubscription);
            syncLocalStorage(localSubscriptions);
        }
    }

    location.reload();
}

const addNewSubscription = document.getElementById("save-event-button");
addNewSubscription.addEventListener("click", () => {
    const name = document.getElementById("event-name").value;
    const cycle = document.getElementById("billing-cycle").value;
    const amount = document.getElementById("amount").value;
    const currency = localStorage.getItem("currency");

    if(!name || !cycle || !amount) {
        return;
    }

    setTimeout(() => {
        const dateElement = document.getElementById('date');
        const date = dateElement.textContent;
    
        addSubscription(name, cycle, amount, date, currency);
    }, 200)
});

function deleteSubscription(id) {
    const localSubscriptions = JSON.parse(localStorage.getItem("Subscriptions")) || [];
    const usersave = JSON.parse(localStorage.getItem("User"));

    if (!usersave || !usersave.uid) {
        const updatedSubscriptions = localSubscriptions.filter((sub) => sub.id !== id);

        syncLocalStorage(updatedSubscriptions);

        const listItemToRemove = document.querySelector(`.delete-btn[data-id="${id}"]`).closest('li');
        if (listItemToRemove) {
            listItemToRemove.remove();
        }

        if (updatedSubscriptions.length === 0) {
            displayNoSubscriptionsMessage();
        }

        location.reload();
    } else {
        const userID = usersave.uid;
        const userRef = ref(database, `users/${userID}/data/${id}`);

        set(userRef, null)
            .then(() => {
                const updatedSubscriptions = localSubscriptions.filter((sub) => sub.id !== id);
                syncLocalStorage(updatedSubscriptions);

                const listItemToRemove = document.querySelector(`.delete-btn[data-id="${id}"]`).closest('li');
                if (listItemToRemove) {
                    listItemToRemove.remove();
                }

                if (updatedSubscriptions.length === 0) {
                    displayNoSubscriptionsMessage();
                }

                location.reload();
            })
            .catch((error) => {
                console.error("Error deleting subscription from database:", error);
            });
    }
}

function displayNoSubscriptionsMessage() {
    const subscriptionsList = document.getElementById("subscriptions");
    subscriptionsList.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = t[language].noSubscriptions;
    p.classList.add("no-subscriptions");
    subscriptionsList.appendChild(p);
}

fetchSubscriptions();

function setCurrency(currency) {
    let usersave = JSON.parse(localStorage.getItem("User"));

    if (usersave && usersave.uid) {
        const userID = usersave.uid;
        const userRef = ref(database, `users/${userID}/info`);

        update(userRef, { currency: currency })
            .then(() => {
            })
            .catch((error) => {
                console.error("Error updating currency in database:", error);
            });
    } else {
        usersave = usersave || {};
        usersave.currency = currency;
        localStorage.setItem("User", JSON.stringify(usersave));
    }

    localStorage.setItem("currency", currency);
}

async function fetchCurrency() {
    let usersave = JSON.parse(localStorage.getItem("User"));
    const defaultCurrency = "$";

    if (usersave && usersave.uid) {
        const userID = usersave.uid;
        const userRef = ref(database, `users/${userID}/info`);

        try {
            const snapshot = await get(userRef);
            if (snapshot.exists() && snapshot.val().currency) {
                const currency = snapshot.val().currency;
                localStorage.setItem("currency", currency);
                return currency;
            } else {
                let currency = localStorage.getItem("currency") || defaultCurrency;
                localStorage.setItem("currency", currency);
                return currency;
            }
        } catch (error) {
            console.error("Error fetching currency from database:", error);
            let currency = localStorage.getItem("currency") || defaultCurrency;
            localStorage.setItem("currency", currency);
            return currency;
        }
    } else {
        const localCurrency = localStorage.getItem("currency");
        if (localCurrency) {
            return localCurrency;
        } else {
            localStorage.setItem("currency", defaultCurrency);
            return defaultCurrency;
        }
    }
}

const selectElement = document.getElementById("currency-select");

document.addEventListener("DOMContentLoaded", async () => {
    const currentCurrency = await fetchCurrency();
    setCurrency(currentCurrency);
    document.addEventListener('sl-load', () => {
        selectElement.value = currentCurrency || "$"; 
      });
});

selectElement.addEventListener("sl-change", (event) => {
    const selectedValue = event.target.value;
    setCurrency(selectedValue);
});