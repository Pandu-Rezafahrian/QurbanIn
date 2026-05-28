const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/animalController');

router.get('/', AnimalController.catalog);
router.get('/add', AnimalController.showForm);
router.post('/add', AnimalController.add);
router.get('/:id', AnimalController.detail);

module.exports = router;