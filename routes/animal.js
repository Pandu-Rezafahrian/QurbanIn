const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');

// public — semua bisa lihat
router.get('/', isLoggedIn, animalController.index);
router.get('/:id', isLoggedIn, animalController.detail);

// admin only
router.get('/add', isAdmin, animalController.addPage);
router.post('/', isAdmin, animalController.create);
router.get('/:id/edit', isAdmin, animalController.editPage);
router.put('/:id', isAdmin, animalController.update);
router.delete('/:id', isAdmin, animalController.destroy);

module.exports = router;