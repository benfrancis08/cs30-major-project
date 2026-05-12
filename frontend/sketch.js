// CS30 Paper Trader
// Ben Francis
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let currentTime;
let price;
let buttons;
let clicked = undefined;

let stocks = new Map();

async function setup() {
  createCanvas(windowWidth, windowHeight);
  currentTime = millis();
  await getStocks();
  setupStocks();

  buttons = [
    {x: width/2, y: height*1/6, w: width/6, h: height/15},
    {x: width/2, y: height*1/3, w: width/6, h: height/15},
    {x: width/2, y: height*1/2, w: width/6, h: height/15},
    {x: width/2, y: height*2/3, w: width/6, h: height/15},
    {x: width/2, y: height*5/6, w: width/6, h: height/15}
  ];
  
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
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

  if (clicked !== undefined) {
    let tempPrice = stocks.get(clicked);
    text(`${clicked}\n${tempPrice.price}`, width/2, height/2);
  }
  else {
    createButtons();
  }
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
  let index = 0;
  for (let [key, value] of stocks) {
    if (mouseIsInButton(buttons[index])) {
      buttons[index].w = width/6 + 25;
      buttons[index].h = height/15 + 25;
    }
    else {
      buttons[index].w = width/6;
      buttons[index].h = height/15;
    }

    fill(255);
    rect(buttons[index].x, buttons[index].y, buttons[index].w, buttons[index].h);
    fill(0);
    text(value.name, buttons[index].x, buttons[index].y);

    buttons[index].i = key;
    index ++;
  }
}

function mouseIsInButton(btn) {
  return mouseX > btn.x - btn.w/2 &&
         mouseX < btn.x + btn.w/2 &&
         mouseY > btn.y - btn.h/2 &&
         mouseY < btn.y + btn.h/2;
}

function mouseReleased() {
  for (let button of buttons) {
    if (mouseIsInButton(button)) {
      clicked = button.i;
    }
  }
}