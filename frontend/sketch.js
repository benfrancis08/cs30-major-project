// CS30 Paper Trader
// Ben Francis
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let stockPrices;
let currentTime;
let price = undefined;
let stocks = new Map();

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentTime = millis();
  getPrice();
  textAlign(CENTER);
}

function draw() {
  background(220);
  if (millis() > currentTime + 10000) {
    currentTime = millis();
    getStocks();
    setupStocks();
  }
  // console.log(price);
  // if (price !== undefined) {
  //   text(price[2].price, width/2, height/2);
  // }
}

async function getStocks() {
  try {
    // Fetch from localhost for testing only. SWITCH TO "https://pine64.tailb67b61.ts.net" BEFORE HANDING IN/TESTING
    stockPrices = await fetch('http://localhost:3000/prices');
    price = await stockPrices.json();
  }
  catch(error) {
    console.log("something went wrong " + error);
  }
} 

function setupStocks() {
  for (let [symbol, value] of Object.entries(price)) {
    stocks.set(symbol, value);
  }
}