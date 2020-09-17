const express = require('express');
const router = express.Router();


router.use(express.static('public'));


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/services', (req, res) => {
    res.render('services');
});


router.get('/contact', (req, res) => {
    res.render('contact');
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
    res.status(404).render('error', {
        errorMessage: 'Página não encontrada'
    });
})



module.exports = router;