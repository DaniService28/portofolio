const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('profile', { title: 'Profile', activePage: 'profile' });
});

module.exports = router;