let usersave = JSON.parse(localStorage.getItem("User"));

const googleLogin = document.getElementById("google-login");
const pfp = document.getElementById("pfp");

if(usersave) {

pfp.src = usersave.profileURL
pfp.style.display = "flex";
googleLogin.style.display = "none";

} else {
 googleLogin.style.opacity = 0.5;

 googleLogin.addEventListener('mouseover', () => {
  googleLogin.style.backgroundColor = '';
  googleLogin.style.color = '';
  googleLogin.style.cursor = 'no-drop';
});

 googleLogin.addEventListener("click", function() {
    window.location.href = "/";
  })
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
        "title": "404 - Not found",
        "header_title": "Not found",
        "menu_title": "Other Projects",
        "menu_appearance": "Appearance",
        "menu_language": "Language",
        "menu_other": "Other",
        "menu_developer": "Developer",
        "privacy_policy": "Privacy Policy",
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
        "title": "404 - Nicht gefunden",
        "header_title": "Nicht gefunden",
        "menu_title": "Andere Projekte",
        "menu_appearance": "Aussehen",
        "menu_language": "Sprache",
        "menu_other": "Sonstiges",
        "menu_developer": "Entwickler",
        "privacy_policy": "Datenschutzrichtlinie",
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
        "title": "404 - Felathittat",
        "header_title": "Felathittat",
        "menu_title": "Andra projekt",
        "menu_appearance": "Utseende",
        "menu_language": "Språk",
        "menu_other": "Övrigt",
        "menu_developer": "Utvecklare",
        "privacy_policy": "Integritetspolicy",
    }
}

let language = localStorage.getItem("PreferredLanguage") || "en";
const h2 = document.getElementById("h2");
const removed = document.getElementById("removed");
const returnButton = document.getElementById("return");
const select = document.getElementById("language-select");
const database = document.getElementById("database");
const calculator = document.getElementById("calculator");
const title = document.getElementById("title");
const menu_verified = document.getElementById("menu-tooltip");
const menu_project = document.getElementById("menu-projects");
const menu_language = document.getElementById("menu-language");
const menu_privacy = document.getElementById("menu-privacy");
const menu_other = document.getElementById("menu-other");
const menu_developer = document.getElementById("menu-developer");


function setLanguage(lang) {
    language = lang;
    localStorage.setItem("PreferredLanguage", language);

    h2.innerHTML = t[language].h2;
    removed.innerHTML = t[language].p;
    returnButton.innerHTML = t[language].return;
    database.innerHTML = t[language].database;
    calculator.innerHTML = t[language].calculator;
    title.innerHTML = t[language].header_title;
    menu_verified.innerHTML = t[language].verified
    menu_project.innerHTML = t[language].menu_title
    menu_language.innerHTML = t[language].menu_language
    menu_privacy.innerHTML = t[language].privacy_policy
    menu_developer.innerHTML = t[language].menu_developer
    menu_other.innerHTML = t[language].menu_other

    document.title = t[language].title;

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

setLanguage(language);


function openNav() {
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth <= 768) {
      sidebar.style.width = "80%";
    } else {
      sidebar.style.width = "400px";
    }
    overlay.style.display = "flex";
    overlay.addEventListener("click", function() {
      closeNav();
    })
  }
  
  function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    overlay.style.display = "none";
  }
  
  document.getElementById("menuIcon").addEventListener("click", function() {
    if (document.getElementById("sidebar").style.width === "400px" || document.getElementById("sidebar").style.width === "80%") {
        closeNav();
    } else {
        openNav();
    }
  });

function redirect() {
    window.location.href = "/";
}