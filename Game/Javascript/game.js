// Created by TheVoidNexus on 31.01.2024

const MILLISECONDS_PER_SECOND = 1000;
const UPDATE_INTERVAL = 1000;

setInterval(function() {
  money += MPS;
  playtimeSeconds++;
  if (playtimeSeconds === 60) {
    playtimeSeconds = 0;
    playtimeMinutes++;
  }
  if (playtimeMinutes === 60) {
    playtimeMinutes = 0;
    playtimeHours++;
  }
  update();

  save.money = money;
  save.upgradeMoney = upgradeMoney;
  save.upgradeMoney2 = upgradeMoney2;
  save.MPS = MPS;
  save.MPC = MPC;
  save.totalClicks = totalClicks;
  save.seconds = playtimeSeconds;
  save.minutes = playtimeMinutes;
  save.hours = playtimeHours;
  const jsonString = JSON.stringify(save);
  localStorage.setItem(`Data`, jsonString);

}, UPDATE_INTERVAL);

window.onbeforeunload = function() {
  save.money = money;
  save.upgradeMoney = upgradeMoney;
  save.upgradeMoney2 = upgradeMoney2;
  save.MPS = MPS;
  save.MPC = MPC;
  save.totalClicks = totalClicks;
  save.seconds = playtimeSeconds;
  save.minutes = playtimeMinutes;
  save.hours = playtimeHours;
  const jsonString = JSON.stringify(save);
  localStorage.setItem(`Data`, jsonString);
  return null;
};

function moneyRounder(thisMoney) {
  const suffixes = [
    "", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Udc", 
    "Ddc", "Tdc", "Qt", "Qd", "Sd", "St", "Ocdc", "Nmdc", "Vg", "Uvg", "Dvg", 
    "Tvg", "Qav", "Qvg", "Svg", "Spv", "Ovg", "Nvg", "Tg"
  ];
  
  let index = 0;
  while (thisMoney >= 1000 && index < suffixes.length - 1) {
    thisMoney /= 1000;
    index++;
  }
  
  if (index === suffixes.length - 1 && thisMoney >= 1000) {
    thisMoney = "∞";
    save.verified = true;
  } else {
    thisMoney = thisMoney.toFixed(0);
  }

  return { amount: thisMoney, suffix: suffixes[index] };
}

function update() {
  requestAnimationFrame(function() {
    const formattedUpgradeMoney = moneyRounder(upgradeMoney);
    const formattedUpgradeMoney2 = moneyRounder(upgradeMoney2);

    setTimeout(function() {
    const formattedMoney = moneyRounder(money);
    const formattedMPS = moneyRounder(MPS);
    const formattedMPC = moneyRounder(MPC);

    const Button1 = document.getElementById(`Button1`);
    const Button2 = document.getElementById(`Button2`);
    const Button3 = document.getElementById(`Button3`);
    const balance = document.getElementById(`balance`);
    const mpc = document.getElementById(`mpc`);
    const mps = document.getElementById(`mps`);
    const playtime = document.getElementById(`playtime`);

    const BalanceT = translations[language].balance;
    const SecondT = translations[language].second;
    const ClickT = translations[language].click;
    const EarnMoneyT = translations[language].earn_money;
    const TotalClicksT = translations[language].total_clicks;
    const MoneyPerSecondT = translations[language].money_per_second;
    const CostT = translations[language].cost;
    const MoneyPerClickT = translations[language].money_per_click;
    const PlaytimeT = translations[language].playtime;

    const hoursIndex = playtimeHours < 10 ? "0" : "";
    const minutesIndex = playtimeMinutes < 10 ? "0" : "";
    const secondsIndex = playtimeSeconds < 10 ? "0" : "";
    const playtimeLog = `${PlaytimeT}: ${hoursIndex}${playtimeHours}h ${minutesIndex}${playtimeMinutes}m ${secondsIndex}${playtimeSeconds}s`;

    balance.innerHTML = `${BalanceT}: $${formattedMoney.amount}${formattedMoney.suffix}`;
    mps.innerHTML = `${SecondT}: $${formattedMPS.amount}${formattedMPS.suffix}`;
    mpc.innerHTML = `${ClickT}: $${formattedMPC.amount}${formattedMPC.suffix}`;
    playtime.innerHTML = `${playtimeLog}`
    Button1.innerHTML = `${EarnMoneyT}<br><br>${TotalClicksT}: <br>${totalClicks}`;
    Button2.innerHTML = `${MoneyPerSecondT}<br>${CostT}: <br>$${formattedUpgradeMoney.amount}${formattedUpgradeMoney.suffix}`;
    Button3.innerHTML = `${MoneyPerClickT}<br>${CostT}: <br>$${formattedUpgradeMoney2.amount}${formattedUpgradeMoney2.suffix}`;

    }, 100)
  });
}

function clicker() {
  money += MPC;
  totalClicks += 1;
  update();
}

function clickerUpgrade() {
  if (money >= upgradeMoney) {
    money -= upgradeMoney;
    if(MPS == 0) {MPS += 1} else {MPS *= 1.5}
    upgradeMoney *= 1.5;
    MPS = Math.round(MPS);
    upgradeMoney = Math.round(upgradeMoney);
    update();
    transition();
  }
}

function clickerUpgrade2() {
  if (money >= upgradeMoney2) {
    money -= upgradeMoney2;
    if(MPC != 1) {MPC *= 1.55} else {MPC += 1}
    upgradeMoney2 *= 1.5;
    upgradeMoney2 = Math.round(upgradeMoney2);
    MPC = Math.round(MPC);
    update();
    transition();
  }
}

function gameReset() {
  const overlay = document.getElementById('overlay2');
  const popup = document.getElementById('popup');

  overlay.addEventListener("click", function() {
    popup.style.display = "none";
    overlay.style.display = "none";
  })

  popup.style.display = "flex";
  overlay.style.display = "flex";
}

function resetProgress() {
  const overlay = document.getElementById('overlay2');
  const popup = document.getElementById('popup');
  popup.style.display = "none";
  overlay.style.display = "none";

    money = 0;
    MPS = 0;
    MPC = 1;
    upgradeMoney = 10;
    upgradeMoney2 = 10;
    totalClicks = 0;

    update();
    transition();
}

function closePopup() {
  const overlay = document.getElementById('overlay2');
  const popup = document.getElementById('popup');
  popup.style.display = "none";
  overlay.style.display = "none";
}

const title = document.querySelector(".ClickerTitle");
title.addEventListener("click", function() {
  window.location.href = "/index.html";
});

function redirect() {
  window.location.href = "/database.html";
}

function redirect2() {
  window.location.href = "/calculator.html";
}

function redirect3() {
  window.location.href = "/privacy.html";
}

function redirect4() {
  window.location.href = "/tvn-manager.html";
}

function redirect5() {
  window.location.href = "https://github.com/TheVoidNexus";
}

function redirect6() {
  window.location.href = "https://discord.com/invite/U4aZrk32Yv";
}

function toggleIndex() {
  let textElement = document.getElementById('indexText');
  if (textElement.style.display === "none" || textElement.style.display === "") {
    textElement.style.display = "block";
  } else {
    textElement.style.display = "none";
  }
}

setInterval(function() {
  const Button2 = document.getElementById(`Button2`);
  const Button3 = document.getElementById(`Button3`);
  if(money >= upgradeMoney) {
   Button2.style.animation = "red-green 1s forwards";
  }

  if(money >= upgradeMoney2) {
    Button3.style.animation = "red-green 1s forwards";
  }

}, 200)

function transition() {
  const Button2 = document.getElementById(`Button2`);
  const Button3 = document.getElementById(`Button3`);
  if(money < upgradeMoney) {
    Button2.style.animation = "green-red 1s forwards";
  }
  if(money < upgradeMoney2) {
    Button3.style.animation = "green-red 1s forwards";
  }
}

setTimeout(function() {
  let indexText = document.getElementById("indexText");
  let lines = indexText.innerHTML.split("<br>");
  let tableHTML = "<table>";

  lines.forEach(function(line) {
      let parts = line.split("-");
      tableHTML += "<tr><td class=\"indexElement\">" + parts[0].trim() + "</td><td class=\"indexElement\">" + parts[1].trim() + "</td></tr>";
  });

  tableHTML += "</table>";
  indexText.innerHTML = tableHTML;

}, 250);

function updateMaxHeight(indexText) {
  let contentHeight = indexText.clientHeight;
  let windowHeight = window.innerHeight;
  let maxHeightPercentage = 79;
  let maxHeight = (windowHeight * maxHeightPercentage / 100) + "px";
  
  if (contentHeight >= windowHeight) {
      indexText.style.overflowY = "hidden";
  } else {
      indexText.style.overflowY = "auto";
  }
  
  indexText.style.maxHeight = maxHeight;
}

window.addEventListener("resize", function() {
  updateMaxHeight(document.getElementById('indexText'));
});

window.addEventListener("load", function() {
  updateMaxHeight(document.getElementById('indexText'))
})

function openNav() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth <= 768) {
    sidebar.style.width = "80%";
  } else {
    sidebar.style.width = "400px";
  }
  overlay.style.display = "flex";
  overlay.addEventListener("click", function() {
    closeNav();
  })
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  overlay.style.display = "none";
}

document.getElementById("menuIcon").addEventListener("click", function() {
  if (document.getElementById("sidebar").style.width === "400px" || document.getElementById("sidebar").style.width === "80%") {
      closeNav();
  } else {
      openNav();
  }
});
