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
  languageCode: language,
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const provider = new GoogleAuthProvider();

const usersave = {};

auth.languageCode = language;

const googleLogin = document.getElementById("google-login");

function successfulLogin(user) {

    usersave.profileURL = user.photoURL;
    usersave.displayName = user.displayName;
    usersave.email = user.email;
    usersave.creationTime = user.metadata.creationTime;
    usersave.uid = user.uid;

    localStorage.setItem("User", JSON.stringify(usersave));

    const googleLogin = document.getElementById("google-login");
    const pfp = document.getElementById("pfp");
    const pfp2 = document.getElementById("pfp2");

    pfp.src = usersave.profileURL;
    pfp2.src = usersave.profileURL;
    pfp.style.display = "flex";
    googleLogin.style.display = "none";

    const loading = document.getElementById("loading");
   
    loading.style.opacity = 0;
    setTimeout(() => {
        loading.style.display = "none";
    }, 500);


    const uid = user.uid;

    checkVerified(uid);

    const databaseRef = ref(database, `users/${uid}/data`);
    get(databaseRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                importData("auto");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

    const loginMessage = translations[language].logged_in + usersave.displayName + "</strong>.";
    showToast(loginMessage, 3000, "success");
}

function checkVerified(uid) {
    if(uid === "EtZpsXJIRgSH8REhDUB70uBE7vA2" || uid === "o9I99lWZuCRvLXpwo6engyUAh2J3" || save.verified == true) {
        const checkmark = document.getElementById("verified-check");
        checkmark.style.display = "flex";
    }
}

function successfulLogout() {
    const googleLogin = document.getElementById("google-login");
    const pfp = document.getElementById("pfp");
    const checkmark = document.getElementById("verified-check");

    googleLogin.style.display = "inline-flex";
    pfp.style.display = "none";
    checkmark.style.display = "none";

    showToast(translations[language].logged_out, 3000, "info");
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        successfulLogin(user);
    } else {
        showToast(translations[language].not_logged_in, 3000, "info");

        loading.style.opacity = 0;
        setTimeout(() => {
            loading.style.display = "none";
        }, 500);

        googleLogin.style.display = "inline-flex";

        googleLogin.addEventListener("click", function() {
            window.location.href = "/login.html";
        });
    }
});


const pfp = document.getElementById("pfp");
const popup = document.getElementById("pfpInfo");
const usernamePopup = document.getElementById("username");
const signoutButton = document.getElementById("signout");
const overlay = document.querySelector(".overlay");
const email = document.getElementById("email");
const creation = document.getElementById("created");

pfp.addEventListener("click", () => {
    let username = usersave.displayName;

    overlay.style.display = "block";
    popup.style.display = "block";
    usernamePopup.style.display = "block";

    let emailParts = usersave.email.split('@');
    let hiddenEmail = emailParts[0].replace(/./g, '*') + '@' + emailParts[1];

    email.innerHTML = 'Email: <span class="hidden-email" id="email-content">' + hiddenEmail + '</span>';

    const emailContent = document.getElementById("email-content");

    emailContent.addEventListener('click', () => {
        if (emailContent.classList.contains('hidden-email')) {
            emailContent.innerHTML = '<span class="revealed-email">' + usersave.email + '</span>';
            emailContent.classList.remove('hidden-email');
        } else {
            emailContent.innerHTML = '<span class="hidden-email">' + hiddenEmail + '</span>';
            emailContent.classList.add('hidden-email');
        }
    });

    creation.innerHTML = translations[language].created + timeSince(usersave.creationTime);
    usernamePopup.innerHTML = translations[language].username + username;
});


function timeSince(date) {
    const now = new Date();
    const past = new Date(date);
    const prefix = translations[language].ago;
    const secondsPast = Math.floor((now - past) / 1000);
    const minutesPast = Math.floor(secondsPast / 60);
    const hoursPast = Math.floor(minutesPast / 60);
    const daysPast = Math.floor(hoursPast / 24);
    const weeksPast = Math.floor(daysPast / 7);
    const monthsPast = Math.floor(daysPast / 30);
    const yearsPast = Math.floor(monthsPast / 12);

    if (yearsPast > 0) {
      return prefix + yearsPast + translations[language].year_ago;
    } else if (monthsPast > 0) {
      return prefix + monthsPast + translations[language].month_ago;
    } else if (weeksPast > 0) {
      return prefix + weeksPast + translations[language].week_ago;
    } else if (daysPast > 0) {
      return prefix + daysPast + translations[language].day_ago;
    } else if (hoursPast > 0) {
      return prefix + hoursPast + translations[language].hour_ago;
    } else if (minutesPast > 0) {
      return prefix + minutesPast + translations[language].minute_ago;
    } else {
      return prefix + translations[language].just_now;
    }
  }

signoutButton.addEventListener("click", () => {
    auth.signOut().then(() => {
        successfulLogout();
        popup.style.display = "none";
        overlay.style.display = "none";
    }).catch((error) => {
        console.error(error);
        showToast(translations[language].error, 3000, "warning");
    });
});

overlay.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
});

function exportData(type) {
    const jsonString = localStorage.getItem("Data");
    const jsonString2 = localStorage.getItem("User");
    const databaseObject = JSON.parse(jsonString) || {};
    const userObject = JSON.parse(jsonString2) || {};
    const user = auth.currentUser;

    if (user) {
        const uid = user.uid;
        const databaseRef = ref(database, `users/${uid}/data`);
        const databaseRef2 = ref(database, `users/${uid}/user`);
        set(databaseRef, databaseObject)
            .then(() => {
                if (type != "auto") {
                    showToast(translations[language].exported, 3000, "success");
                }
            })
            .catch((error) => {
                console.error("Error exporting data:", error);
                showToast(translations[language].error, 3000, "warning");
            });

        set(databaseRef2, userObject)
            .then(() => {
                if (type != "auto") {
                    showToast(translations[language].exported, 3000, "success");
                }
            })
            .catch((error) => {
                console.error("Error exporting data:", error);
                showToast(translations[language].error, 3000, "warning");
            });

    }
}

function importData(type) {
    const user = auth.currentUser;

    if (user) {
        const uid = user.uid;
        const databaseRef = ref(database, `users/${uid}/data`);
        get(databaseRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const databaseObject = snapshot.val();
                    localStorage.setItem("Data", JSON.stringify(databaseObject));
                    money = databaseObject.money;
                    upgradeMoney = databaseObject.upgradeMoney;
                    upgradeMoney2 = databaseObject.upgradeMoney2;
                    MPS = databaseObject.MPS;
                    MPC = databaseObject.MPC;
                    totalClicks = databaseObject.totalClicks;
                    playtimeSeconds = databaseObject.seconds;
                    playtimeMinutes = databaseObject.minutes;
                    playtimeHours = databaseObject.hours;
                    if (type != "auto") {
                        showToast(translations[language].imported, 3000, "success");
                    }
                } else {
                    showToast(translations[language].empty, 3000, "info");
                }
                popup.style.display = "none";
                overlay.style.display = "none";
            })
            .catch((error) => {
                console.error("Error importing data:", error);
                showToast(translations[language].error, 3000, "warning");
            });
    }
}

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState == 'hidden') { 
        exportData("auto");
    } else {
        importData("auto");
    }
});

window.onbeforeunload = exportData("auto");

window.addEventListener('beforeunload', function() {
    exportData("auto");
});

setInterval(function() {
    importData("auto");
},30000)

function showToast(message, duration, type) {
    const toast = document.getElementById("toast");
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
        setTimeout(() => {
            toast.style.display = "none";
        }, 1000);
    }, duration);
}

