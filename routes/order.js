const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const { isLoggedIn } = require("../middlewares/auth");

router.get("/", isLoggedIn, OrderController.index);
router.post("/", isLoggedIn, OrderController.create);
router.get("/:id", isLoggedIn, OrderController.detail);
router.post('/:id/confirm', isLoggedIn, OrderController.confirm);
// router.get('/:id/invoice', isLoggedIn, OrderController.generateInvoice);

module.exports = router;
