const express = require('express');
const router = express.Router();
const FarmController = require('../controllers/farmController');
const { isAdmin } = require('../middlewares/auth');

router.get('/', FarmController.index);
router.get('/add', isAdmin, FarmController.showForm);
router.post('/add', isAdmin, FarmController.add);

module.exports = router;