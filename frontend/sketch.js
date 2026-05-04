// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let stockPrices;
let currentTime;
let price;

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentTime = millis();
}

function draw() {
  background(220);
  if (millis() > currentTime + 5000) {
    currentTime = millis();
    getPrice();
    console.log(price);
  }
  textAlign(CENTER);
  if (price !== undefined) {
    text(width/2, height/2, price[0].price);
  }
}

async function getPrice() {
  stockPrices = await fetch('http://localhost:3000/prices');
  price = await stockPrices.json();
} 