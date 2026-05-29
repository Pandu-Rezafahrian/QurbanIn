const {
  Order,
  User,
  UserProfile,
  OrderItem,
  Animal,
  Farm,
} = require("../models");

class OrderController {
  static async index(req, res) {
    try {
      const whereClause =
        req.session.user.role === "admin"
          ? {}
          : { userId: req.session.user.id };

      const orders = await Order.findAll({
        where: whereClause,
        include: { model: User, include: UserProfile },
      });
      res.render("orders/order", {
        user: req.session.user,
        orders,
        errors: [],
      });
    } catch (err) {
      res.send(err.message);
    }
  }

  static async detail(req, res) {
    try {
      const order = await Order.findByPk(req.params.id, {
        include: [
          { model: User, include: UserProfile },
          { model: OrderItem, include: [{ model: Animal, include: Farm }] },
        ],
      });
      if (!order)
        return res.status(404).render("404", {
          title: "Order Not Found",
          error: "Order tidak ditemukan",
        });
      res.render("orders/orderDetail", {
        user: req.session.user,
        order,
        errors: [],
      });
    } catch (err) {
      res.send(err.message);
    }
  }

  static async create(req, res) {
    try {
      const { animalId } = req.body;
      const animal = await Animal.findByPk(animalId);
      if (!animal) return res.redirect("/animals");
      if (animal.status === "terjual") {
        return res.redirect(`/animals/${animalId}`);
      }

      const order = await Order.create({
        userId: req.session.user.id,
        totalPrice: animal.price,
        status: "pending",
      });

      await OrderItem.create({
        orderId: order.id,
        animalId: animal.id,
        price: animal.price,
      });

      res.redirect("/orders");
    } catch (err) {
      res.send(err.message);
    }
  }

  static async confirm(req, res) {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) return res.redirect("/orders");
      await order.update({ status: "confirmed" });
      res.redirect("/orders/" + req.params.id);
    } catch (err) {
      res.send(err.message);
    }
  }

  // ======EasyInvoice======
  
}

module.exports = OrderController;
