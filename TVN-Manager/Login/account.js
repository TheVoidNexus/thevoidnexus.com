import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, OAuthProvider, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZSOkH0t3N66YMrXwgOIA5U1rL9LYEoak",
    authDomain: "tvn-manager.firebaseapp.com",
    databaseURL: "https://tvn-manager-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tvn-manager",
    storageBucket: "tvn-manager.firebasestorage.app",
    messagingSenderId: "1014615721112",
    appId: "1:1014615721112:web:20e62b6188f53a995ebced",
    measurementId: "G-1R5230V4SH"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

const GoogleProvider = new GoogleAuthProvider();
const MicrosoftProvider = new OAuthProvider('microsoft.com');

const googleLogin = document.getElementById("google");
const microsoftLogin = document.getElementById("microsoft");

onAuthStateChanged(auth, (user) => {
    if (user) {
        successfulLogin(user);
    }
});

function successfulLogin(user) {

    const userID = user.uid;

    const userRef = ref(database, `users/${userID}/info`);

        const userData = {
            name: user.displayName,
            email: user.email,
            pfp: user.photoURL,
            creationTime: user.metadata.creationTime,
            uid: user.uid,
            provider: user.providerData[0].providerId,
        };

        localStorage.setItem("Login", true)

        set(userRef, userData).then(() => {
            window.location.href = "tvn-manager.html";
        }).catch(error => {
            console.error("Error setting user data:", error);
            alert("An error occured")
            setTimeout(() => {
                window.location.href = "tvn-manager.html";
            }, 5000);
        });
}


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
    window.location.href = "tvn-manager.html";
});