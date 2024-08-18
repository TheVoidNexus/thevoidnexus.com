let usersave = JSON.parse(localStorage.getItem("User"));

const googleLogin = document.getElementById("login");
const pfp = document.getElementById("pfp");

if(usersave) {

pfp.src = usersave.profileURL
pfp.style.display = "flex";
googleLogin.style.display = "none";

} else {
 googleLogin.style.opacity = 0.8;
 googleLogin.style.borderColor = "darkgray"
}

const t = {
    "en": {
        "h2": "The page you were looking for seems to have gotten lost in the digital void.",
        "p": "It may not exist or got removed.",
        "return": "Return to the Homepage",
        "database": "Database",
        "calculator": "Calculator",
        "english": "English",
        "german": "German",
        "swedish": "Swedish",
    },

    "de": {
        "h2": "Die Seite, die du suchst, scheint sich in der digitalen Leere verloren zu haben.",
        "p": "Sie existiert möglicherweise nicht oder wurde entfernt.",
        "return": "Zurück zur Startseite",
        "database": "Datenbank",
        "calculator": "Rechner",
        "english": "Englisch",
        "german": "Deutsch (DE)",
        "swedish": "Schwedisch",
    },

    "sv": {
        "h2": "Sidan du letade efter verkar ha glömts i det digitala världen.",
        "p": "Den kanske inte finns eller har tagits bort.",
        "return": "Tillbaka till startsidan",
        "database": "Databas",
        "calculator": "Kalkylator",
        "english": "Engelska",
        "german": "Tyska",
        "swedish": "Svenska",
    }
}

let language = localStorage.getItem("PreferredLanguage") || "en";
const h2 = document.getElementById("h2");
const removed = document.getElementById("removed");
const returnButton = document.getElementById("return");
const select = document.getElementById("language-select");
const database = document.getElementById("database");
const calculator = document.getElementById("calculator");

function updateLanguage(lang) {
    language = lang;
    localStorage.setItem("PreferredLanguage", language);

    h2.innerHTML = t[language].h2;
    removed.innerHTML = t[language].p;
    returnButton.innerHTML = t[language].return;
    database.innerHTML = t[language].database;
    calculator.innerHTML = t[language].calculator;

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