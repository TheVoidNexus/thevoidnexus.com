let roundedResult;

function calculate() {
    const expression = document.getElementById("input").value;
    const regex = /^[\d\+\-\*\/\.\\^\(\)\s\√]+$/;
 
    if(expression == "") {
        document.getElementById("result").innerHTML = t[language].empty;
        showToast(t[language].empty, "warning");
        return;
    }

    if (!regex.test(expression)) {
        document.getElementById("result").innerHTML = t[language].invalid;
        showToast(t[language].invalid, "warning");
        document.getElementById("input").value = "";
        return;
    }

    try {
        const result = evaluateExpression(expression);
        document.getElementById("result").innerHTML = `${expression}<br>=<br>${result}`;
        document.getElementById("input").value = "";
        showToast(t[language].toastresult + roundedResult, "success");
    } catch (error) {
        document.getElementById("result").innerHTML = `Error: ${error.message}`;
        showToast(error.message, "warning");
    }
}

function evaluateExpression(expression) {
    if(expression.includes('√')) {
    expression = expression.replace(/√/g, 'Math.sqrt(') + ')';
    }
    if(expression.includes('^')) {
    expression = expression.replace(/\^/g, '**');
    }
    const result = eval(expression);
    roundedResult = Math.round(result * 10 ** 3) / 10 ** 3;
    return result === roundedResult ? `${result}` : `${result}<br>~ ${roundedResult}`;
}

function addToInput(value) {
    document.getElementById("input").value += value;
    document.getElementById("input").focus();
}

document.getElementById("input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        calculate();
    }
});

const database = document.getElementById('database');
const voidclicker = document.getElementById('voidclicker');

database.addEventListener("click", function () {
    window.location.href = "/database.html";
});

voidclicker.addEventListener("click", function () {
    window.location.href = "/voidclicker.html";
});

let usersave = JSON.parse(localStorage.getItem("User"));
const googleLogin = document.getElementById("login");
const pfp = document.getElementById("pfp");

if(usersave.displayName) {
pfp.src = usersave.profileURL
pfp.style.display = "flex";
googleLogin.style.display = "none";
const login = t[language].logged_in + "<strong>" + usersave.displayName + "</strong>";
showToast(login, "success");

pfp.addEventListener("click", function() {
    showToast(t[language].not_available, "info");
})

} else {
 googleLogin.style.opacity = 0.8;
 googleLogin.style.borderColor = "darkgray"
 showToast(t[language].not_logged_in, "warning");

 googleLogin.addEventListener("click", function () {
     showToast(t[language].not_available, "info");
 });
}

function showToast(message, type) {
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
        }, 500);
    }, 2000);
}