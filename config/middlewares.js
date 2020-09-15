const express = require('express');
const expressLayouts = require('express-ejs-layouts');

module.exports = app => {
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    app.set('layout', 'layouts/main-layout.ejs');

    app.use(express.json())
    app.use(express.urlencoded({extended: true}));

    app.use((err, req, res, next) => {
        res.status(500).send('Internal Server Error');
    });
}