// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let stockPrices;
let currentTime;
let price = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentTime = millis();
  textAlign(CENTER);
}

function draw() {
  background(220);
  if (millis() > currentTime + 5000) {
    currentTime = millis();
    getPrice();
    if (price !== undefined) {
      console.log(price);
      console.log(price[0].price);
    }
  }
  text(price[0].price, width/2, height/2);
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