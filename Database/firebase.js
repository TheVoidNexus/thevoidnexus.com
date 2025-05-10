import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAalxeqm5oEtMoYHI3irna7CACdUcFilzk",
    authDomain: "thevoidclicker.firebaseapp.com",
    databaseURL: "https://thevoidclicker-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "thevoidclicker",
    storageBucket: "thevoidclicker.appspot.com",
    messagingSenderId: "394237974349",
    appId: "1:394237974349:web:c645d91eff47a8b0b30904",
    measurementId: "G-NYD0V53G7R",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

auth.languageCode = 'en'
const provider = new GoogleAuthProvider();


const googleLogin = document.getElementById("login");
googleLogin.addEventListener("click", function() {

signInWithPopup(auth, provider)
.then((result) => {
const credential = GoogleAuthProvider.credentialFromResult(result);
let user = result.user;
console.log(user);
console.log(credential);

localStorage.setItem("DisplayName", user.displayName)
const loginMessage = "You are logged in as " + user.displayName + "."
showToast(loginMessage, 3000, "success")

successfulLogin(user);

}).catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
console.error(errorCode);
console.error(errorMessage);
showToast("An error occured", 3000, "warning")
});
})

function successfulLogin(user) {
let profilePicture = user.photoURL
let username = user.displayName

const googleLogin = document.getElementById("login");
const pfp = document.getElementById("pfp")

pfp.src = profilePicture;
pfp.style.display = "flex"

googleLogin.style.display = "none";

const loginMessage = "You are logged in as <strong>" + username + "</strong>."
showToast(loginMessage, 3000, "success")
}

function successfulLogout() {
const googleLogin = document.getElementById("login");
const pfp = document.getElementById("pfp")

googleLogin.style.display = "inline-block"
pfp.style.display = "none"

showToast("Successfully logged out.", 3000, "info")
}

onAuthStateChanged(auth, (user) => {
if (user) {
successfulLogin(user);
} else {
showToast("You are not logged in.", 3000, "info")
}
});


const pfp = document.getElementById("pfp");
const popup = document.getElementById("popup");
const usernamePopup = document.getElementById("username");
const signoutButton = document.getElementById("signout");
const overlay = document.querySelector(".overlay");

pfp.addEventListener("click", () => {

let username = localStorage.getItem("DisplayName");

overlay.style.display = "block"

popup.style.display = "block";
usernamePopup.style.display = "block"
usernamePopup.innerHTML = "Logged in as <strong>" + username + "</strong>";

signoutButton.addEventListener("click", () => {
  auth.signOut().then(() => {
      successfulLogout();
      popup.style.display = "none";
      overlay.style.display = "none";

  }).catch((error) => {
      console.error(error);
      showToast("An error occured.", 3000, "warning")
  });
});
});

overlay.addEventListener("click", () => {
popup.style.display = "none";
overlay.style.display = "none";
});

const exportButton = document.getElementById("export");
exportButton.addEventListener("click", () => {
exportData();
})

function exportData() {
alert("Not available.")
}

const importButton = document.getElementById("import");
importButton.addEventListener("click", () => {
importData();
})

function importData() {
alert("Not available.")
}

function showToast(message, duration, type) {
const toast = document.getElementById("toast");
const clear = document.getElementById("clear");
toast.innerHTML = message;

if (type === "warning") {
toast.style.backgroundColor = "rgba(202, 0, 0, 0.6)";
toast.style.border = "2px solid rgb(255, 0, 0)";
}

if (type === "info") {
toast.style.backgroundColor = "rgba(160, 133, 0, 0.6)";
toast.style.border = "2px solid rgb(255, 170, 0)";
}

if (type === "success") {
toast.style.backgroundColor = "rgba(0, 160, 16, 0.6)";
toast.style.border = "2px solid rgb(0, 255, 17)";
}

toast.style.opacity = 1;
toast.style.display = "block";

setTimeout(() => {
toast.style.opacity = 0;
clear.style.opacity = 1;
setTimeout(() => {
toast.style.display = "none";
}, 1000);
}, duration);
}