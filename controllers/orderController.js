const easyinvoice = require("easyinvoice");
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
      // if (!req.session.user) {
      //     return res.redirect('/login');
      // }
      const whereClause = req.session.user
        ? { UserId: req.session.user.id }
        : {};
      const orders = await Order.findAll({
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
      // if (!req.session.user) {
      //     return res.redirect('/login');
      // }
      
      const order = await Order.findByPk(req.params.id, {
        include: [
          { model: User, include: UserProfile },
          { model: OrderItem, include: [{ model: Animal, include: Farm }] },
        ],
      });
      res.render("orders/orderDetail", {
        user: req.session.user,
        orders,
        errors: [],
      });
    } catch (err) {
      res.send(err.message);
    }
  }

  // ====== Easyinvoice (tp error) ======
//   static async generateInvoice(req, res) {
//     try {
//       const order = await Order.findByPk(req.params.id, {
//         include: [
//           { model: User, include: UserProfile },
//           { model: OrderItem, include: [{ model: Animal, include: Farm }] },
//         ],
//       });

//       if (!order) {
//         return res.status(404).send("Order tidak ditemukan");
//       }

    //   const data = {
    //     apiKey:
    //       "8tSlEwAv0AsTXjPVCVBxiddsH5e4cyt7npC06LXe27jyN5yawq9NBL4k8kSv7MXs",
    //     mode: "development",
    //     images: {
    //       // The logo on top of your invoice
    //       logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
    //       // The invoice background
    //       background:
    //         "https://public.budgetinvoice.com/img/watermark-draft.jpg",
    //     },
    //     settings: {
    //       locale: "id-ID",
    //       currency: "IDR",
    //     },

    //     sender: {
    //       company: "QurbanIn",
    //       address: "Cirebon, Jawa Barat",
    //       email: "admin@qurbanin.com",
    //     },
    //     client: {
    //       company: order.User.UserProfile.fullName,
    //       email: order.User.email,
    //       address: order.User.UserProfile.address || "-",
    //     },
    //     invoiceNumber: `INV-${order.id}`,
    //     invoiceDate: new Date(order.orderDate).toLocaleDateString("id-ID"),
    //     products: order.OrderItems.map((item) => ({
    //       quantity: "1",
    //       description: `${item.Animal.name} (${item.Animal.type})`,
    //       taxRate: 0,
    //       price: item.price,
    //     })),
    //     bottomNotice: "Terima kasih telah berqurban bersama QurbanIn.",
    //   };

    //   const result = await easyinvoice.createInvoice(data);
    //   const pdf = Buffer.from(result.pdf, "base64");
    //   res.send(pdf);
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   }
}

module.exports = OrderController;
