const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.get('/', OrderController.index);
router.post('/', OrderController.create);
router.get('/:id', OrderController.detail);
router.post('/:id/cancel', OrderController.cancel)
router.post('/:id/confirm', OrderController.confirm)
router.post('/:id/delete', OrderController.destroy)

module.exports = router;