const express = require('express');
const expressLayouts = require('express-ejs-layouts');

module.exports = app => {
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    app.set('layout', 'layouts/main-layout.ejs');
    app.use((req, res, next) => {
        setVarsEJS(req, res);
        next();
    });

    app.use(express.json())
    app.use(express.urlencoded({extended: true}));

    app.use((err, req, res, next) => {
        res.status(500).send('Internal Server Error');
    });
}

function setVarsEJS(req, res) {
    res.locals = Object.assign(res.locals, {
        siteTitle: "Salão da Márcia",
        isCurrentPath: (link) => {
            var path = req.path;
            path = (path.slice(-1) === '/' && path.length > 1) ? path.slice(0, -1) : path;
            return (path === link);
        },
        menuLinks: {
            primary: {
                '/': 'Início',
                '/about': 'Sobre',
                '/services': 'Serviços',
                '/contact': 'Contato'
            },
            secondary: {
                '/credits': 'Créditos'
            }
        },
        horariosFuncionamento: {
            'Segunda': '10h-18h',
            'Terça': '10h-18h',
            'Quarta': '10h-18h',
            'Quinta': '10h-18h',
            'Sexta': '10h-18h',
            'Sábado': '10h-14h',
            'Domingo': 'Fechado',
        },
        contact: {
            address: 'Rua Marechal João da Silva, 171, Botafogo - Rio de Janeiro/RJ.',
            phone: '(21) 4032-3232',
            email: 'salao.marcia@example.com'
        }
    });
}