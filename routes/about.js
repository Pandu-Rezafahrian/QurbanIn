const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('abouts/about', { user: req.session.user || null });
});

module.exports = router;