let currency = localStorage.getItem("currency") || "$";

const t = {
    "en": {
        "title": "TVN Manager - Subscriptions",
        "profile": "Profile",
        "login": "Login",
        "settings": "Settings",
        "logout": "SIGN OUT",
        "close": "CLOSE",
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
        "today": "Today",
        "created": "Created: ",
        "delete": "Delete",
        "content": "Language: ",
        "save": "Save",
        "english": "English",
        "german": "German",
        "currency": "Currency: ",
        "settingsInfo": "Attention! Clicking on \"Save\" will reload the page.",
        "addEvent": "Add Subscription on ",
        "subscriptionName": "Subscription Name (max. 25 characters)",
        "billingCycle": "Billing Cycle",
        "billingCyclePlaceholder": "Select recurring period",
        "amount": "Amount (" + currency + ")",
        "billingDate": "Billing Date",
        "subscriptionPlaceholder": "Enter name",
        "amountPlaceholder": "Enter amount",
        "weekly": "Weekly",
        "monthly": "Monthly",
        "quarterly": "Quarterly",
        "yearly": "Yearly",
        "addEventButton": "Add",
        "eventsOn": "Billings on ",
        "noEvents": "➤ No due dates on this day.",
        "addEvents": "Add Subscription",
        "year2": "year",
        "quarter": "quarter",
        "month2": "month",
        "week2": "week",
        "price": "Price: ",
        "nextBillingDate": "Next Billing Date: ",
        "subscriptionTitle": "Your Subscriptions",
        "noSubscriptions": "➤ You don't have any subscriptions yet. Use the calender to create one.",
        "otherEvents": "other",
        "timeformat": "<strong>Time Format</strong><br>",
        "englishFormat": "English: <pre><code>Month/Day/Year (e.g. 03/02/2025)</code></pre>",
        "germanFormat": "German: <pre><code>Day.Month.Year (e.g. 02.03.2025)</code>",
        "swedishFormat": "Swedish: <pre style='margin-bottom: 0;'><code>Year-Month-Day (e.g. 2025-03-02)</code>",
        "verified": "Verified Account",
        "confirmation": "Confirmation",
        "deleteInfo": "Are you sure you want to delete this subscription?",
        "fillAllFields": "Please fill in all fields.",
    },

    "de": {
        "title": "TVN Manager - Abonnements",
        "profile": "Profil",
        "login": "Anmelden",
        "settings": "Einstellungen",
        "logout": "ABMELDEN",
        "close": "SCHLIESSEN",
        "ago": "vor ",
        "year": "Jahr",
        "years": "Jahren",
        "month": "Monat",
        "months": "Monaten",
        "week": "Woche",
        "weeks": "Wochen",
        "day": "Tag",
        "days": "Tagen",
        "hour": "Stunde",
        "hours": "Stunden",
        "minute": "Minute",
        "minutes": "Minuten",
        "just_now": "vor ein paar Sekunden",
        "today": "Heute",
        "created": "Erstellt: ",
        "delete": "Löschen",
        "content": "Sprache: ",
        "save": "Speichern",
        "english": "Englisch",
        "german": "Deutsch",
        "currency": "Währung: ",
        "settingsInfo": "Achtung! Beim Klicken auf \"Speichern\" wird die Seite neu geladen.",
        "addEvent": "Erstelle Abonnement am ",
        "subscriptionName": "Abonnementname (max. 25 Zeichen)",
        "billingCycle": "Abrechnungszyklus",
        "billingCyclePlaceholder": "Wähle Abrechnungsperiode",
        "amount": "Betrag (" + currency + ")",
        "billingDate": "Abrechnungsdatum",
        "subscriptionPlaceholder": "Name eingeben",
        "amountPlaceholder": "Betrag eingeben",
        "weekly": "Wöchentlich",
        "monthly": "Monatlich",
        "quarterly": "Quartalsweise",
        "yearly": "Jährlich",
        "addEventButton": "Hinzufügen",
        "eventsOn": "Abrechnungen am ",
        "noEvents": "➤ Keine Abrechnungen an diesem Tag.",
        "addEvents": "Abonnement hinzufügen",
        "year2": "Jahr",
        "quarter": "Quartal",
        "month2": "Monat",
        "week2": "Woche",
        "price": "Preis: ",
        "nextBillingDate": "Nächstes Abrechnungsdatum: ",
        "subscriptionTitle": "Deine Abonnements",
        "noSubscriptions": "➤ Du hast noch keine Abonnements. Benutze den Kalender, um eines zu erstellen.",
        "otherEvents": "weiter",
        "timeformat": "<strong>Zeitformat</strong><br>",
        "englishFormat": "Englisch: <pre><code>Monat/Tag/Jahr (z.B. 03/02/2025)</code></pre>",
        "germanFormat": "Deutsch: <pre><code>Tag.Monat.Jahr (z.B. 02.03.2025)</code></pre>",
        "swedishFormat": "Schwedisch: <pre style='margin-bottom: 0;'><code>Jahr-Monat-Tag (z.B. 2025-03-02)</code>",
        "verified": "Verifizierter Account",
        "confirmation": "Bestätigung",
        "deleteInfo": "Möchtest du dieses Abonnement wirklich löschen?",
        "fillAllFields": "Bitte alle Felder ausfüllen.",
    },

    "sv": {
        "title": "TVN Manager - Abonnemang",
        "profile": "Profil",
        "login": "Logga in",
        "settings": "Inställningar",
        "logout": "LOGGA UT",
        "close": "STÄNG",
        "ago": "",
        "year": "år",
        "years": "år",
        "month": "månad",
        "months": "månader",
        "week": "vecka",
        "weeks": "veckor",
        "day": "dag",
        "days": "dagar",        
        "hour": "timme",
        "hours": "timmar",        
        "minute": "minut",
        "minutes": "minuter",
        "just_now": "just nu",
        "today": "Idag",
        "created": "Skapad: ",
        "delete": "Radera",
        "content": "Språk: ",
        "save": "Spara",
        "english": "Engelska",
        "german": "Tyska",
        "currency": "Valuta: ",
        "settingsInfo": "Varning! Om du klickar på \"Spara\" kommer sidan att laddas om.",
        "addEvent": "Skapa abonnemang på ",
        "subscriptionName": "Abonnemangs namn (max. 25 tecken)",
        "billingCycle": "Faktureringsperiod",
        "billingCyclePlaceholder": "Välj faktureringsperiod",
        "amount": "Belopp (" + currency + ")",
        "billingDate": "Faktureringsdatum",
        "subscriptionPlaceholder": "Ange namn",
        "amountPlaceholder": "Ange belopp",
        "weekly": "Veckovis",
        "monthly": "Månadsvis",
        "quarterly": "Kvartalsvis",
        "yearly": " Årvis",
        "addEventButton": "Lägg till",
        "eventsOn": "Fakturer på ",
        "noEvents": "➤ Inga fakturer denna dag.",
        "addEvents": "Skapa abonnemang",
        "year2": " år",
        "quarter": "kvartal",
        "month2": "månad",
        "week2": "vecka",
        "price": "Pris: ",
        "nextBillingDate": "Nästa faktueringsdatum: ",
        "subscriptionTitle": "Dina abonnemang",
        "noSubscriptions": "➤ Du har inga abonnemang. Använda kalendern för att skapa ett.",
        "otherEvents": "annan",
        "timeformat": "<strong>Tidsformat</strong><br>",
        "englishFormat": "Engelska: <pre><code>Månad/Dag/År (z.B. 03/02/2025)</code></pre>",
        "germanFormat": "Tyska: <pre><code>Dag.Månad.År (z.B. 02.03.2025)</code></pre>",
        "swedishFormat": "Svenska: <pre style='margin-bottom: 0;'><code>År-Månad-Dag (z.B. 2025-03-02)</code>",
        "verified": "Verifierad konto",
        "confirmation": "Bekräftelse",
        "deleteInfo": "Vill du verkligen radera detta abonnemang?",
        "fillAllFields": "Fyll i alla fält.",
    },
}

let language = localStorage.getItem("language") || "en";

document.addEventListener('sl-load', () => {
    const languageSelect = document.getElementById('language-select-sl');
    languageSelect.value = language;

    const currencySelect = document.getElementById('currency-select');
    currencySelect.value = currency;
  });

function loadLanguagePackage(language) {

const select = document.getElementById('language-select-sl');
    select.addEventListener('sl-change', (event) => {
    const selectedValue = event.target.value;
    setLanguage(selectedValue);
  });

const settings = document.getElementById("settings");
const signout = document.getElementById("signout");
const close = document.getElementById("close");

settings.childNodes[2].textContent = t[language].settings;
signout.textContent = t[language].logout;
close.textContent = t[language].close;

const dialog2 = document.getElementById('dialog');
const switchDialog = document.getElementById('switchDialog');
const confirmClose = document.getElementById('deleteConfirm');
const confirmSwitch = document.getElementById('switch');

dialog2.setAttribute("label", t[language].settings);
switchDialog.setAttribute("label", t[language].confirmation);
confirmClose.textContent = t[language].delete;
confirmSwitch.innerHTML = t[language].deleteInfo;

const content = document.getElementById("language");
if (content) {
  content.textContent = t[language].content;
}

const footer = dialog2.querySelector('sl-button[slot="footer"]');
if (footer) {
  footer.textContent = t[language].save;
}

const currencyText = document.getElementById("currency");
const currencySelect = document.getElementById("currency-select");
currencyText.textContent = t[language].currency;
currencySelect.value = currency || "$";

const timeformat = document.getElementById('timeformat');
const englishFormat = document.getElementById('englishFormat');
const germanFormat = document.getElementById('germanFormat');
const swedishFormat = document.getElementById('swedishFormat');
timeformat.innerHTML = t[language].timeformat;
englishFormat.innerHTML = t[language].englishFormat;
germanFormat.innerHTML = t[language].germanFormat;
swedishFormat.innerHTML = t[language].swedishFormat;

const settingsInfo = document.getElementById("settingsInfo");
settingsInfo.textContent = t[language].settingsInfo;

const subscriptionName = document.getElementById('event-name')
const amount = document.getElementById('amount')
const add = document.getElementById('save-event-button')

const labelEventName = document.querySelector('label[for="event-name"]');
const labelAmount = document.querySelector('label[for="amount"]');
const billingCycle = document.getElementById('billing-cycle');
billingCycle.value = "Monthly";
billingCycle.label = t[language].billingCycle;
billingCycle.placeholder = t[language].billingCyclePlaceholder;

labelEventName.textContent = t[language].subscriptionName;
labelAmount.textContent = t[language].amount;

add.textContent = t[language].addEventButton

subscriptionName.placeholder = t[language].subscriptionPlaceholder
amount.placeholder = t[language].amountPlaceholder

const billingCycleOptions = billingCycle.querySelectorAll('sl-option');

billingCycleOptions[0].innerHTML = t[language].weekly
billingCycleOptions[1].innerHTML = t[language].monthly
billingCycleOptions[2].innerHTML = t[language].quarterly
billingCycleOptions[3].innerHTML = t[language].yearly

const openAddEventModal = document.getElementById('open-add-event-modal');
openAddEventModal.textContent = t[language].addEvents;

const subscriptionTitle = document.getElementById('subscription-list-title');
subscriptionTitle.textContent = t[language].subscriptionTitle;

const loginText = document.getElementById('login-text');
loginText.textContent = t[language].login;

const tooltip = document.getElementById('tooltip');
tooltip.textContent = t[language].verified;

document.title = t[language].title;

}

function loadTimeFormat(date) {
    if(language == "de") {
        if (date && date.includes("-")) {
            const [year, month, day] = date.split("-");
            date = `${day}.${month}.${year}`;
        }
    } else if (language == "en") {
        if (date && date.includes(".")) {
            const [day, month, year] = date.split(".");
            date = `${month}/${day}/${year}`;
        } else {
            const [year2, month2, day2] = date.split("-");
            date = `${month2.padStart(2, '0')}/${day2.padStart(2, '0')}/${year2}`;
        }
    } else if (language == "sv") {
        if (date && date.includes(".")) {
            const [day, month, year] = date.split(".");
            date = `${year}-${month}-${day}`;
        }
    }

    return date;
}

loadLanguagePackage(language);