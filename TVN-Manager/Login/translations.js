const t = {
    "en": {
        "title": "Login",
        "description": "Signing in enables the syncing of your subscriptions across different devices.",
        "google": "Sign in with Google",
        "microsoft": "Sign in with Microsoft",
        "back": "Back",
        "title2": "TVN Manager - Login",
    },

    "de": {
        "title": "Anmeldung",
        "description": "Mit der Anmeldung werden deine Abonnements auf verschiedenen Geräten synchronisiert.",
        "google": "Anmeldung mit Google",
        "microsoft": "Anmeldung mit Microsoft",
        "back": "Zurück",
        "title2": "TVN Manager - Anmeldung",
    },

    "sv": {
        "title": "Inloggning",
        "description": "Logga in för att synkronisera dina abonnemang på olika enheter.",
        "google": "Logga in med Google",
        "microsoft": "Logga in med Microsoft",
        "back": "Tillbaka",
        "title2": "TVN Manager - Inloggning",
    },
}

let language = localStorage.getItem("language") || "en";

const title = document.querySelector(".title");
const description = document.querySelector(".description");
const google = document.getElementById("google");
const microsoft = document.getElementById("microsoft");
const back = document.querySelector(".back-button");

title.textContent = t[language].title;
description.textContent = t[language].description;
google.textContent = t[language].google;
microsoft.textContent = t[language].microsoft;
back.querySelector('span').textContent = t[language].back; 

document.title = t[language].title2;
