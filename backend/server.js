const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

// API Stock Calling - Use Finnhub (60 api calls per min)