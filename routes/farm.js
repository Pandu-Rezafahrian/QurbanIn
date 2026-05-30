const express = require('express');
const router = express.Router();
const FarmController = require('../controllers/farmController');

router.get('/', FarmController.index);
router.get('/add', FarmController.showForm);
router.post('/add', FarmController.add);
router.get('/:id/edit', FarmController.showEditForm);
router.post('/:id/edit', FarmController.update);
router.post('/:id/delete', FarmController.delete);

module.exports = router;