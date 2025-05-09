const translations = {
    "en": {
        "balance": "Balance",
        "second": "Per Second",
        "click": "Per click",
        "earn_money": "Earn Money",
        "total_clicks": "Clicks",
        "money_per_second": "Per Second<br>",
        "cost": "Cost",
        "money_per_click": "Per Click<br>",
        "playtime": "Playtime",
        "reset": "Reset Progress",
        "manager": "Manager",
        "database": "Database",
        "calculator": "Calculator",
        "signOut": "Sign out",
        "username": "<strong>",
        "english": "English",
        "german": "German",
        "swedish": "Swedish",
        "logged_in": "You are logged in as <strong>",
        "error": "An error occured.",
        "cancelled": "Operation cancelled.",
        "logged_out": "Successfully logged out.",
        "not_logged_in": "You are not logged in.",
        "not_authenticated": "You are not authenticated.",
        "login": "Sign in",
        "title": "VoidClicker by TheVoidNexus",
        "popupText": "<strong>Do you really want to reset your progress?</strong><br>This action cannot be undone.",
        "cancel": "Cancel",
        "confirm": "Confirm",
        "verified": "Verified Account",
        "ago": "",
        "year": "year ago",
        "years": "years ago", 
        "month": "month ago",
        "months": "months ago",
        "week": "week ago",
        "weeks": "weeks ago",
        "day": "day ago",
        "days": "days ago",
        "hour": "hour ago",
        "hours": "hours ago",
        "minute": "minute ago",
        "minutes": "minutes ago",
        "just_now": " just now",
        "created": "Created: ",
        "menu_title": "Other Projects",
        "menu_appearance": "Appearance",
        "menu_language": "Language",
        "menu_other": "Other",
        "menu_developer": "Developer",
        "privacy_policy": "Privacy Policy",
        "contribute": "Contribute",
        "unavailable": "This feature is currently not available.",
    },
    "de": {
        "balance": "Kontostand",
        "second": "Pro Sekunde",
        "click": "Pro Klick",
        "earn_money": "Verdiene Geld",
        "total_clicks": "Klicks",
        "money_per_second": "Pro Sekunde<br>",
        "cost": "Preis",
        "money_per_click": "Pro Klick<br>",
        "playtime": "Spielzeit",
        "reset": "Fortschritt zurücksetzen",
        "manager": "Manager",
        "database": "Datenbasis",
        "calculator": "Rechner",
        "signOut": "Ausloggen",
        "username": "<strong>",
        "english": "Englisch",
        "german": "Deutsch",
        "swedish": "Schwedisch",
        "logged_in": "Du bist eingeloggt als <strong>",
        "error": "Ein Fehler ist aufgetreten.",
        "cancelled": "Aktion abgebrochen.",
        "logged_out": "Erfolgreich ausgeloggt.",
        "not_logged_in": "Du bist nicht eingeloggt.",
        "not_authenticated": "Du bist nicht authentifiziert.",
        "login": "Einloggen",
        "title": "VoidClicker von TheVoidNexus",
        "popupText": "<strong>Möchtest du deinen Fortschritt wirklich zurücksetzen?</strong><br>Diese Aktion kann nicht rückgängig gemacht werden.",
        "cancel": "Abbrechen",
        "confirm": "Bestätigen",
        "verified": "Verifizierter Account",
        "ago": "vor ",
        "year": "Jahr",
        "years": "Jahre", 
        "month": "Monat",
        "months": "Monaten",
        "week": "Woche",
        "weeks": "Wochen",
        "day": "Tag",
        "days": "Tage",
        "hour": "Stunde",
        "hours": "Stunden",
        "minute": "Minute",
        "minutes": "Minuten",
        "just_now": "ein paar Sekunden",
        "created": "Erstellt: ",
        "menu_title": "Andere Projekte",
        "menu_appearance": "Aussehen",
        "menu_language": "Sprache",
        "menu_other": "Sonstiges",
        "menu_developer": "Entwickler",
        "privacy_policy": "Datenschutzrichtlinie",
        "contribute": "Beitragen",
        "unavailable": "Diese Funktion ist derzeit nicht verfügbar.",
    },
    "sv": {
        "balance": "Balans",
        "second": "Per sekund",
        "click": "Per klick",
        "earn_money": "Tjäna pengar",
        "total_clicks": "Klickat",
        "money_per_second": "Per sekund",
        "cost": "Kostnad",
        "money_per_click": "Per klick",
        "playtime": "Speltid",
        "reset": "Återställ framsteg",
        "manager": "Manager",
        "database": "Databas",
        "calculator": "Kalkylator",
        "signOut": "Logga ut",
        "username": "<strong>",
        "english": "Engelska",
        "german": "Tyska",
        "swedish": "Svenska",
        "logged_in": "Du är inloggad som <strong>",
        "error": "Ett fel inträffade.",
        "exportConfirm": "Denna åtgärd kommer att åsidosätta statistiken som sparats i databasen. Vill du fortsätta?",
        "importConfirm": "Denna åtgärd kommer att åsidosätta din nuvarande statistik. Vill du fortsätta?",
        "cancelled": "Åtgärden avbröts.",
        "logged_out": "Utloggning lyckades.",
        "not_logged_in": "Du är inte inloggad.",
        "not_authenticated": "Du är inte autentiserad.",
        "login": "Logga in",
        "title": "VoidClicker av TheVoidNexus",
        "popupText": "<strong>Vill du verkligen återställa dina framsteg?</strong><br>Denna åtgärd kan inte aterställas.",
        "cancel": "Avbryt",
        "confirm": "Bekräfta",
        "verified": "Verifierad konto",
        "ago": "",
        "year": "år sen",
        "years": "år sen", 
        "month": "månad sen",
        "months": "månader sen",
        "week": "vecka sen",
        "weeks": "veckor sen",
        "day": "dag sen",
        "days": "dagar sen",
        "hour": "timme sen",
        "hours": "timmar sen",
        "minute": "minut sen",
        "minutes": "minuter sen",
        "just_now": "just nu",
        "created": "Skapad: ",
        "menu_title": "Andra projekt",
        "menu_appearance": "Utseende",
        "menu_language": "Språk",
        "menu_other": "Övrigt",
        "menu_developer": "Utvecklare",
        "privacy_policy": "Integritetspolicy",
        "contribute": "Bidra",
        "unavailable": "Denna funktion är för tillfället inte tillgänglig.",
    }
};

function setLanguage(lang) {
    language = lang;
    localStorage.setItem("PreferredLanguage", language);
    update();

    const ids = ["reset", "manager", "database", "calculator", "signout", "login-text", "PopupText", "cancel", "confirm", "tooltip", "menu-tooltip", "menu-projects", "menu-language", "menu-privacy", "menu-other", "menu-developer", "menu-appearance"];
    const [reset, manager, database, calculator, signOut, login, popupText, cancel, confirm, verified, menu_verified, menu_project, menu_language, menu_privacy, menu_other, menu_developer, menu_appearance] = ids.map(id => document.getElementById(id));

    reset.innerHTML = translations[language].reset;
    manager.innerHTML = translations[language].manager
    database.innerHTML = translations[language].database
    calculator.innerHTML = translations[language].calculator
    signOut.innerHTML = translations[language].signOut
    login.innerHTML = translations[language].login
    popupText.innerHTML = translations[language].popupText
    cancel.innerHTML = translations[language].cancel
    confirm.innerHTML = translations[language].confirm
    verified.innerHTML = translations[language].verified
    menu_verified.innerHTML = translations[language].verified
    menu_project.innerHTML = translations[language].menu_title
    menu_language.innerHTML = translations[language].menu_language
    menu_privacy.innerHTML = translations[language].privacy_policy
    menu_developer.innerHTML = translations[language].menu_developer
    menu_appearance.innerHTML = translations[language].menu_appearance
    menu_other.innerHTML = translations[language].menu_other

    const select = document.getElementById('language-select');
    select.options[0].innerHTML = translations[language].english
    select.options[1].innerHTML = translations[language].german
    select.options[2].innerHTML = translations[language].swedish

    if(language == "de") {
        select.options[1].selected = true;
    }

    if(language == "sv") {
        select.options[2].selected = true;
    }

    document.title = translations[language].title
}

setLanguage(language)