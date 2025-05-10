const t = {
    "en": {
        "title": "Polyrythm",
        "description": "Click anywhere to toggle sound",
        "toggle": "Toggle Pulse",
    },

    "de": {
        "title": "Polyrythmus",
        "description": "Klicke um den Sound zu aktivieren",
        "toggle": "Puls umschalten",
    },

    "sv": {
        "title": "Polyrtm",
        "description": "Klicka för att aktivera ljud",
        "toggle": "Växla puls",
    },
}

const language = localStorage.getItem("language") || "en";

function loadLanguagePackage(lang) {
    document.title = t[lang].title;
    document.getElementById("sound-message-text").textContent = t[lang].description;
    document.getElementById("sound-toggle").title = t[lang].toggle;
}

loadLanguagePackage(language);

function redirect() {
    window.location.href = "index.html";
}