// CS30 Paper Trader
// Ben Francis
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let currentTime;
let price;
let stocks = new Map();

async function setup() {
  createCanvas(windowWidth, windowHeight);
  currentTime = millis();
  await getStocks();
  setupStocks();
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

  createButtons();
}

async function getStocks() {
  try {
    // Fetch from localhost for testing only. SWITCH TO "https://pine64.tailb67b61.ts.net" BEFORE HANDING IN/TESTING ON SERVER
    let stockPrices = await fetch('http://localhost:3000/prices');
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

function createButtons() {

  for (let [key, value] of stocks) {
    
  }

  rectMode(CENTER);
  fill(255);
  rect(width/2, height*(1/6), width/6, height/15);
  rect(width/2, height*(1/3), width/6, height/15);
  rect(width/2, height*(1/2), width/6, height/15);
  rect(width/2, height*(2/3), width/6, height/15);
  rect(width/2, height*(5/6), width/6, height/15);
}