const overlay = document.querySelector(".overlay");
const invisibleOverlay = document.querySelector(".invisibleOverlay");

const dropdown = document.getElementById("dropdown");
const dropdownContent = document.getElementById("input2");

dropdown.addEventListener("click", () => {
    dropdownContent.style.display = dropdownContent.style.display === "flex" ? "none" : "flex";
    invisibleOverlay.style.display = invisibleOverlay.style.display === "block" ? "none" : "block";

    invisibleOverlay.addEventListener("click", () => {
        dropdownContent.style.display = "none";
        invisibleOverlay.style.display = "none";
    });
});

const profileCard = document.getElementById("profileCard");
const close = document.getElementById("close");

close.addEventListener("click", () => {
    profileCard.style.display = "none";
    overlay.style.display = "none";
});

const dialog = document.getElementById('dialog');
const closeButton = dialog.querySelector('sl-button[slot="footer"]');

settings.addEventListener('click', () => {
    dialog.show();
    invisibleOverlay.style.display = "none";
    dropdownContent.style.display = "none";
});

closeButton.addEventListener('click', () => {
    dialog.hide()
    overlay.style.display = "none";
    location.reload();
});

  function setLanguage(lang) {
    localStorage.setItem("language", lang);
}

setTimeout(() => {
const deleteButton = document.querySelectorAll(".delete-btn");
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", () => {
        confirmDialog.show();
    });

    if (language == "de") {
        btn.classList.add("german");
      } else if (language == "sv") {
        btn.classList.add("swedish");
      }
}

const confirmDialog = document.getElementById("switchDialog");
const confirmSwitch = document.getElementById("switch");
const confirmClose = document.getElementById("deleteConfirm");

confirmDialog.addEventListener("sl-hide", () => {
    confirmSwitch.checked = false;
    confirmClose.setAttribute("disabled", "");
});

confirmSwitch.addEventListener("click", () => {
    const isChecked = confirmSwitch.checked;
    if(isChecked) {
        confirmClose.removeAttribute("disabled");
    } else {
        confirmClose.setAttribute("disabled", "");
    }
});
}, 1000);

const languageSelector = document.getElementById("language-select-sl");
const settingsText = document.getElementById("settingsInfo");

languageSelector.classList.remove("margin-de");
languageSelector.classList.remove("margin-sv");

if (language === "de") {
    languageSelector.classList.add("margin-de");
    settingsText.style.fontSize = "14px";

} else if (language === "sv") {
    languageSelector.classList.add("margin-sv");
    settingsText.style.fontSize = "14.5px";
}

function redirect() {
    window.location.href = "index.html";
}