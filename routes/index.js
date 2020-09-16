const express = require('express');
const router = express.Router();


router.use(express.static('public'));


router.get('/', (req, res) => {
    res.render('index', {
        headerContent: {
            page: 'home',
            title: 'Salão da Márcia',
            text: 'Exaltando a sua beleza natural.'
        }
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        headerContent: {
            page: 'about',
            title: 'Sobre Nós',
            text: 'Somos um salão de beleza especializado em exaltar a sua beleza com um sorriso no rosto.'
        }
    });
});

router.get('/services', (req, res) => {
    res.render('services', {
        headerContent: {
            page: 'services',
            title: 'Nossos Serviços',
            text: 'A nossa lista de serviços tem tudo o que você poderia procurar.'
        }
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        headerContent: {
            page: 'contact',
            title: 'Contato',
            text: 'Contate-nos!'
        }
    });
});

router.get('/credits', (req, res) => {
    res.render('credits');
});


router.use((req, res) => {
    res.status(404).send('Page Not Found');
})


module.exports = router;