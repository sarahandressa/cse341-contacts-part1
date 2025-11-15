const express = require('express');
const router = express.Router();


router.use('/api-docs', require('./swagger'));

// Hello World
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World!');
});

// Contacts
router.use('/contacts', require('./contacts'));

module.exports = router;
