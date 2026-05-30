const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/animalController');

router.get('/', AnimalController.catalog);
router.get('/add', AnimalController.showForm);
router.post('/add', AnimalController.add);
router.get('/:id', AnimalController.detail);
router.get('/:id/edit', AnimalController.showEditForm);
router.post('/:id/edit', AnimalController.update);
router.post('/:id/delete', AnimalController.delete);

module.exports = router;