const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');

// pembeli — buat & lihat order sendiri
router.get('/', isLoggedIn, orderController.index);
router.get('/:id', isLoggedIn, orderController.detail);
router.post('/', isLoggedIn, orderController.create);

// admin only — konfirmasi & cancel order
router.put('/:id', isAdmin, orderController.update);
router.delete('/:id', isAdmin, orderController.destroy);

module.exports = router;