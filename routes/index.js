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


router.use((req, res) => {
    res.status(404).send('Page Not Found');
})


module.exports = router;