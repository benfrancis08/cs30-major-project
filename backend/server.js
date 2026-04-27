// Setting up dotenv so values from .env can be used in code without exposing secrets
require('dotenv').config();

// Setting up libraries used in project
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const STOCKS = ['AAPL', 'NVDA', 'AMZN', 'MSFT', 'GOOG'];

let stockPrice = [];

app.use(cors());

// API Stock Calling - Uses Finnhub (60 api calls per min)
async function updatePrices() {
    let tempPrice = [];
    for (let stock of STOCKS) {
        let response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${process.env.FINNHUB_KEY}`);
        tempPrice.push({
            Stock: stock,
            Price: response.data.c,
        })
        stockPrice = tempPrice;
    }
}

// Code by gemini to create webserver accessible at localhost:3000 to make sure api calling works

// 2. Create an endpoint to see the data
app.get('/prices', (req, res) => {
    res.json(stockPrice);
});

// Run the fetcher and start server
app.listen(process.env.PORT, async () => {
    await updatePrices(); // Initial fetch on startup
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});