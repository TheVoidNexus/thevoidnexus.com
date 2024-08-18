// Created by TheVoidNexus on 22.04.2024

function redirect() {
    location.href = "https://thevoidnexus.com";
}

function redirect2() {
    location.href = "/calculator.html";
}

window.onbeforeunload = function() {
    saveDatabase();
};

function addValue() {
    let index = prompt("Enter an index:", "");
    if (index === "") {
        showToast("Index cannot be empty. Please enter a valid index.", 3000, "info")
        return;
    }
    let value = prompt("Enter a value:", "");
    if (value === "") {
        showToast("Value cannot be empty. Please enter a valid value.", 3000, "info")
        return;
    }
    database[index] = value;
    saveDatabase();
    showToast("Changes saved.", 3000, "success")
}

function removeValue() {
    let index = prompt("Enter an index:", "");
    if (index === "") {
        showToast("Index cannot be empty. Please enter a valid index.", 3000, "info")
        return;
    }

    if (!(index in database)) {
        showToast("This index does not exist in the database.", 3000, "warning")
        return;
    }

    delete database[index];
    showToast("Changes saved.", 3000, "success")
}

function getValue() {
    let index = prompt("Enter an index to get:", "");
    if (index === "") {
        showToast("Index cannot be empty. Please enter a valid index.", 3000, "info")
        return;
    }
    if (!(index in database)) {
        showToast("This index does not exist in the database.", 3000, "warning")
        return;
    }
    alert("Index: " + index + "\nValue: " + database[index]);
}

function modifyValue() {
    let index = prompt("Enter an index to modify:", "");
    if (index === "") {
        showToast("Index cannot be empty. Please enter a valid index.", 3000, "info")
        return;
    }
    if (!(index in database)) {
        showToast("This index does not exist in the database.", 3000, "warning")
        return;
    }
    let newValue = prompt("Enter the new value:", "");
    if (newValue === "") {
        showToast("Value cannot be empty. Please enter a valid value.", 3000, "info")
        return;
    }
    database[index] = newValue;
    saveDatabase();
    showToast("Changes saved.", 3000, "success")
}

function copyValue() {
    let sourceIndex = prompt("Enter the index to copy from:", "");
    if (sourceIndex === "") {
        showToast("Source index cannot be empty. Please enter a valid index.", 3000, "info")
        return;
    }
    if (!(sourceIndex in database)) {
        showToast("Source index does not exist in the database.", 3000, "warning")
        return;
    }
    let destinationIndex = prompt("Enter the index to copy to:", "");
    if (destinationIndex === "") {
        showToast("Destination index cannot be empty. Please enter a valid index.", 3000, "info")
        return;
    }
    let valueToCopy = database[sourceIndex];
    database[destinationIndex] = valueToCopy;
    saveDatabase();
    showToast("Changes saved.", 3000, "success")
}

function clearStorage() {
    if(confirm("Do you want to clear the storage?")){
    localStorage.setItem('Database', {});
    database = {};
    showToast("Storage cleared.", 3000, "success")
    } else {
        showToast("Cancelled the operation.", 3000, "info")
    }
}

function copyText() {
    let popup = window.open("", "Database Popup", "width=400,height=400,scrollbars=yes");
    let textToCopy = "";
    let listItems = popup.document.querySelectorAll("li");
    listItems.forEach(function(item) {
        textToCopy += item.textContent + "\n";
    });

    navigator.clipboard.writeText(textToCopy)
        .then(function() {
            alert("Successfully copied text.");
        })
        .catch(function(err) {
            console.error("Failed to copy text: ", err);
        });
}

let popup = null;

function showList() {
    if (!popup || popup.closed) {
        popup = window.open("", "Database Popup", "width=400,height=400,scrollbars=yes");
    } else {
        popup.focus();
        return;
    }

    let popupContent = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><link rel=\"icon\" type=\"image/png\" href=\"https://cdn-icons-png.flaticon.com/128/1602/1602309.png\" media=\"(prefers-color-scheme: light)\"><link rel=\"icon\" type=\"image/png\" href=\"https://i.ibb.co/zSjcMyb/image.png\" media=\"(prefers-color-scheme: dark)\"><title>Database</title><h2 unselectable=\"on\">Database Contents:</h2>";

    if (Object.keys(database).length !== 0) {
        popupContent += "<button onclick=\"copyText()\">Copy to clipboard</button><ul style='overflow-y: scroll; max-height: 300px;'>";
        for (let index in database) {
            if (database.hasOwnProperty(index)) {
                popupContent += "<li><strong>" + index + "</strong>: " + database[index] + "</li>";
            }
        }
        popupContent += "</ul>";
    } else {
        popupContent += "<p><strong>Empty.</strong><br>Try adding a new value to the system.</p>"
        let seconds = 10;
        for(let i = 1; i <= 10; i++) {
            setTimeout(function() {
                let output = popupContent + "<p>This window closes in <strong>" + seconds + (seconds === 1 ? " second" : " seconds") + "</strong>.</p>";
                popup.document.body.innerHTML = output;
                seconds--;
                
                if (!popup || popup.closed) {
                    return;
                }
                if(seconds === 1) {
                    setTimeout(function() {
                        let output = popupContent + "<p>This window closes <strong>now</strong>."
                        popup.document.body.innerHTML = output;
                        setTimeout(function() {popup.close();},1000)
                    },2000)
                }
            }, i * 1000);
        }
    }

    popupContent += "<script src=\"script.js\"></script>"

    popup.document.write(popupContent);
    popup.document.close();
}

function saveDatabase() {
    let jsonString = JSON.stringify(database);
    localStorage.setItem(`Database`, jsonString);
}

let jsonString = localStorage.getItem(`Database`);
let database = JSON.parse(jsonString) || {};

const importButton = document.getElementById("import");
importButton.addEventListener("click", () => {
    setTimeout(() => {
        jsonString = localStorage.getItem(`Database`);
        database = JSON.parse(jsonString) || {};
    }, 500);
});


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