const t = {
    "en": {
        "database": "Database",
        "calculator": "VoidClicker",
        "english": "English",
        "german": "German",
        "swedish": "Swedish",
        "playtime": "Calculator",
        "calculate": "New Calculation",
        "result": "Enter an expression.",
        "input": "Enter expression",
        "empty": "Empty expression.",
        "invalid": "Invalid expression.",
        "tabname": "Calculator by TheVoidNexus",
        "toastresult": "Result: ",
        "logged_in": "You are logged in as ",
        "not_available": "This feature is not available here.<br>You can manage your account on the homepage.",
        "not_logged_in": "You are not logged in.<br>You can log in on the homepage.",
    },

    "de": {
        "database": "Datenbank",
        "calculator": "VoidClicker",
        "english": "Englisch",
        "german": "Deutsch (DE)",
        "swedish": "Schwedisch",
        "playtime": "Rechner",
        "calculate": "Neue Berechnung",
        "result": "Gib eine Rechnung ein.",
        "input": "Rechnung eingeben",
        "empty": "Rechnung leer.",
        "invalid": "Ungültige Rechnung.",
        "tabname": "Rechner von TheVoidNexus",
        "toastresult": "Ergebnis: ",
        "logged_in": "Du bist eingeloggt als ",
        "not_available": "Diese Funktion ist hier nicht verfügbar.<br>Du kannst deinen Account auf der Startseite verwalten.",
        "not_logged_in": "Du bist nicht eingeloggt.<br>Du kannst dich auf der Startseite einloggen.",
    },

    "sv": {
        "database": "Databas",
        "calculator": "VoidClicker",
        "english": "Engelska",
        "german": "Tyska",
        "swedish": "Svenska",
        "playtime": "Kalkylator",
        "calculate": "Ny beräkning",
        "result": "Ange en uttryck.",
        "input": "Ange uttryck",
        "empty": "Tom uttryck.",
        "invalid": "Ogiltigt uttryck.",
        "tabname": "Kalkylator av TheVoidNexus",
        "toastresult": "Resultat: ",
        "logged_in": "Du är inloggad som ",
        "not_available": "Denna funktion är inte tillgänglig här.<br>Du kan hantera ditt konto på startsidan.",
        "not_logged_in": "Du är inte inloggad.<br>Du kan logga in på startsidan.",
    }
}

let language = localStorage.getItem("PreferredLanguage") || "en";
const select = document.getElementById("language-select");
const database1 = document.getElementById("database");
const voidclicker1 = document.getElementById("voidclicker");
const playtime = document.getElementById("playtime");
const calculate1 = document.getElementById("calculate");
const result1 = document.getElementById("result");

function updateLanguage(lang) {
    language = lang;
    localStorage.setItem("PreferredLanguage", language);

    database1.innerHTML = t[language].database;
    voidclicker1.innerHTML = t[language].calculator;
    playtime.innerHTML = t[language].playtime;
    calculate1.innerHTML = t[language].calculate;
    result1.innerHTML = t[language].result;
    input.placeholder = t[language].input;

    document.title = t[language].tabname;

    select.options[0].textContent = t[language].english;
    select.options[1].textContent = t[language].german;
    select.options[2].textContent = t[language].swedish;
    

    if(language == "de") {
        select.options[1].selected = true;
    }

    if(language == "sv") {
        select.options[2].selected = true;
    }
}

updateLanguage(language);