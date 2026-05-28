const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'farm routes OK' });
});

module.exports = router;