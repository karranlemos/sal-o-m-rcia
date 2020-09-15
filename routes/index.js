const express = require('express');
const router = express.Router();


router.use(express.static('public'));


router.get('/', (req, res) => {
    res.render('main');
});

router.get('/about', (req, res) => {
    res.send('About');
});

router.get('/services', (req, res) => {
    res.send('Services');
});

router.get('/contact', (req, res) => {
    res.send('Contact');
});


router.use((req, res) => {
    res.status(404).send('Page Not Found');
})


module.exports = router;