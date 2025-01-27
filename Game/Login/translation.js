function setLanguage(lang) {
    if (lang.includes("en")) {
        lang = "en";
    }

    if (lang.includes("de")) {
        lang = "de";
    }

    language = lang;
    localStorage.setItem("PreferredLanguage", language);

    const menu_language = document.getElementById("menu-language");
    const menu_developer = document.getElementById("menu-developer");
    const menu_bugs = document.getElementById("menu-bugs");
    const title = document.getElementById("title");
    const select = document.getElementById('language-select');
    const login_info = document.getElementById("login-info");
    const login_text = document.getElementById("login-text");
    const login_text2 = document.getElementById("login-text2");
    const login_code = document.getElementById("login-code");

    select.value = language;
    select.addEventListener('sl-change', (event) => {
        const selectedValue = event.target.value;
        setLanguage(selectedValue);
      });

    menu_language.innerHTML = t[language].menu_language;
    menu_developer.innerHTML = t[language].menu_developer;
    menu_bugs.innerHTML = t[language].menu_bugs;
    title.innerHTML = t[language].title;
    login_info.innerHTML = t[language].login_info;
    login_text.innerHTML = t[language].login_text;
    login_text2.innerHTML = t[language].login_text2;
    login_code.innerHTML = t[language].login_code;

    document.title = t[language].sitetitle;
}

const t = {
    en: {
        menu_language: "Language",
        menu_developer: "Developer",
        menu_bugs: "If you encounter any bugs<br>or have a suggestion,<br>please contact TheVoidNexus.",
        english: "English",
        german: "German",
        title: "Login",
        login_info: "Log in to sync your progress on all your connected devices.",
        login_text: "Sign in with Google",
        login_text2: "Sign in with Microsoft",
        login_code: "Logged out",
        sitetitle: "Login - TheVoidNexus",

    },
    de: {
        menu_language: "Sprache",
        menu_developer: "Entwickler",
        menu_bugs: "Falls du einen Fehler gefunden<br> oder einen Vorschlag hast,<br>kontaktiere bitte TheVoidNexus.",
        english: "Englisch",
        german: "Deutsch",
        title: "Anmelden",
        login_info: "Melde dich an, um deinen Fortschritt auf all deinen eingeloggten Geräten zu synchronisieren.",
        login_text: "Anmelden mit Google",
        login_text2: "Anmelden mit Microsoft",
        login_code: "Abgemeldet",
        sitetitle: "Anmelden - TheVoidNexus",
    }
}

let language = localStorage.getItem("PreferredLanguage") || navigator.language || navigator.userLanguage;
setLanguage(language);