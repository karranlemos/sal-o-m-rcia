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

router.post('/contact', (req, res) => {
    res.redirect('/contact');
});

router.get('/credits', (req, res) => {
    res.render('credits');
});



router.post('/forms/contact', (req, res) => {
    if (!req.body || req.body.name === undefined || !req.body.email === undefined || !req.body.message === undefined)
        return res.status(400).json({message: "'name', 'email' and 'message' must be provided."});

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    // TODO send email
    
    return res.json({
        message: 'Message sent successfully!'
    });
});



router.use((req, res) => {
    res.status(404).send('Page Not Found');
})



module.exports = router;