const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');

router.get('/', ProfileController.index);
router.post('/', ProfileController.update)

module.exports = router;