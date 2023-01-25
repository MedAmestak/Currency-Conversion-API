const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = '4bb3c4d6be8f40f98afb815c7bbe09b9'; // Replace with your Open Exchange Rates App ID

app.get('/convert', async (req, res) => {
    const { from, to, amount } = req.query;

    // Fetch exchange rates from Open Exchange Rates
    const exchangeRates = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`);

    // Calculate the conversion
    const conversion = amount * (exchangeRates.data.rates[to] / exchangeRates.data.rates[from]);

    res.json({
        success: true,
        conversion: conversion.toFixed(2),
        from,
        to
    });
});

app.listen(3000, () => {
    console.log('API listening on port 3000!');
});
