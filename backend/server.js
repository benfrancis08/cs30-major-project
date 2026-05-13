// Setting up dotenv so values from .env can be used in code without exposing secrets
require('dotenv').config();

// Setting up libraries used in project
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const p5 = require('p5');

const app = express();

// Setting up stocks map
let stocks = new Map();
stocks.set('AAPL', {name: 'Apple Inc.'});
stocks.set('NVDA', {name: 'NVIDIA Corp.'});
stocks.set('AMZN', {name: 'Amazon Inc.'});
stocks.set('MSFT', {name: 'Microsoft Corp.'});
stocks.set('GOOG', {name: 'Google LLC'});
stocks.set('NOIS', {name: 'Noise'})

// Allows communictation between frontend and backend without errors
// http://127.0.0.1:5500 only used for local testing REMOVE BEFORE HANDING IN
app.use(cors({
    origin: ['https://benfrancis08.github.io', 'http://127.0.0.1:5500']
}));

// API Stock Calling - Uses Finnhub (60 api calls per min)
async function updatePrices() {
    for (let [key, value] of stocks) {
        let response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${key}&token=${process.env.FINNHUB_KEY}`);
        value.price = response.data.c;
        stocks.set(key, value);
    }
}

// Function to automatically fetch the stock price every 10 seconds
async function autoUpdatePrice() {
    await updatePrices();
    setTimeout(autoUpdatePrice, 10000);
}


let x = 0;
function noiseStock() {
    let




    setTimeout(noiseStock, 5000);
}

// '/prices' endpoint displays all stocks and its price
app.get('/prices', (req, res) => {
    // Creates a object consisting of all map keys and its coresponding value
    let object = Object.fromEntries(stocks);
    res.json(object);
})

// '/prices/:symbol' endpoint displays only requested stock (Ex. '/prices/aapl' will give only the price for apple)

// app.get('/prices/:symbol', (req, res) => {
//     let symbol = req.params.symbol.toUpperCase();
//     let stock = stockPrices.find(s => s.stock === symbol);
//     if (stock === undefined) {
//         res.json(`Stock not found. Please choose from this list: ${STOCKS}`);
//     }
//     else {
//         res.json(stock);
//     }
// });

// Creates a server that listens for above endpoints and starts the autoUpdatePrice loop function
app.listen(process.env.PORT, async () => {
    await autoUpdatePrice();
    noiseStock();
    console.log(`Started\nRunning on http://localhost:${process.env.PORT}`);
})
