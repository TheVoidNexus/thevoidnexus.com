const savedMoney = "savedMoney";
const savedUpgrade = "savedUpgrade";
const savedUpgrade2 = "savedUpgrade2";
const savedMPS = "savedMPS";
const savedMPC = "savedMPC";
const savedClicks = "savedClicks";

let jsonString = localStorage.getItem(`Data`);
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

let language = localStorage.getItem("PreferredLanguage") || "en";