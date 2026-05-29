const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/animalController');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');

router.get('/', AnimalController.catalog);
router.get('/add', isAdmin, AnimalController.showForm);   
router.post('/add', isAdmin, AnimalController.add);
router.get('/:id', AnimalController.detail);

module.exports = router;
