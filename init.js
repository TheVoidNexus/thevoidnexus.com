const savedMoney = "savedMoney";
const savedUpgrade = "savedUpgrade";
const savedUpgrade2 = "savedUpgrade2";
const savedMPS = "savedMPS";
const savedMPC = "savedMPC";
const savedClicks = "savedClicks";


let jsonString = localStorage.getItem(`Saved`);
let save = JSON.parse(jsonString) || {};

let money = +save.money || 0;
let upgradeMoney = +save.upgradeMoney || 10;
let upgradeMoney2 = +save.upgradeMoney2 || 10;
let MPS = +save.MPS || 0;
let MPC = +save.MPC || 1;
let totalClicks = +save.totalClicks || 0;
let roundedMoney;
let moneySuffix = "";
let roundedMoney2;
let moneySuffix2 = "";
let roundedMoney3;
let moneySuffix3 = "";
let playtimeHours = +save.hours || 0;
let playtimeMinutes = +save.minutes || 0;
let playtimeSeconds = +save.seconds || 0;



document.addEventListener('DOMContentLoaded', function() {
      const signupForm = document.getElementById('signupForm');
      const loginForm = document.getElementById('loginForm');
 }
     
     
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = signupForm.signupEmail.value;
      const password = signupForm.signupPassword.value;
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User registered:", user);
          alert('Registration successful');
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error("Registration error:", errorMessage);
          alert(errorMessage);
        });
    });

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = loginForm.loginEmail.value;
      const password = loginForm.loginPassword.value;
      
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User logged in:", user);
          alert('Login successful');
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error("Login error:", errorMessage);
          alert(errorMessage);
        });
    });

