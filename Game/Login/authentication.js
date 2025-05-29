import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, OAuthProvider } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAalxeqm5oEtMoYHI3irna7CACdUcFilzk",
    authDomain: "thevoidclicker.firebaseapp.com",
    databaseURL: "https://thevoidclicker-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "thevoidclicker",
    storageBucket: "thevoidclicker.appspot.com",
    messagingSenderId: "394237974349",
    appId: "1:394237974349:web:c645d91eff47a8b0b30904",
    measurementId: "G-NYD0V53G7R",
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const GoogleProvider = new GoogleAuthProvider();
const MicrosoftProvider = new OAuthProvider('microsoft.com');

const googleLogin = document.getElementById("google");
const microsoftLogin = document.getElementById("microsoft");

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "voidclicker.html";
    }
});

googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, GoogleProvider)
        .then((result) => {
            let user = result.user;
            successfulLogin(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
        });
});

microsoftLogin.addEventListener("click", function() {
    signInWithPopup(auth, MicrosoftProvider)
        .then((result) => {
            let user = result.user;
            successfulLogin(user);
  })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
  });
});

const back = document.getElementById("back");
back.addEventListener("click", function() {
    window.location.href = "voidclicker.html";
});