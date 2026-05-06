// CS30 Paper Trader
// Ben Francis
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let stockPrices;
let currentTime;
let price = undefined;

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
    getPrice();
  }
  if (price !== undefined) {
    text(price[2].price, width/2, height/2);
  }
}

async function getPrice() {
  try {
    stockPrices = await fetch('http://localhost:3000/prices');
    price = await stockPrices.json();
  }
  catch(error) {
    console.log("something went wrong " + error);
  }
} 