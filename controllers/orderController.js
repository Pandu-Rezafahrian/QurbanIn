const { Order, User, UserProfile, OrderItem, Animal, Farm } = require('../models');

class OrderController {
    static async index(req, res) {
        try {
            // if (!req.session.user) {
            //     return res.redirect('/login');
            // }
            const whereClause = req.session.user ? { UserId: req.session.user.id } : {};
            const orders = await Order.findAll({ include: { model: User, include: UserProfile } });
            res.render('orders/order', { user: req.session.user, orders, errors: [] });
        } catch (err) {
            res.send(err.message)
        }
    }
    
    static async create(req, res) {
        try {
            const { animalId } = req.body;
            const animal = await Animal.findByPk(animalId);
            
            const order = await Order.create({
                userId: req.session.user.id,
                status: 'pending',
                totalPrice: animal.price,
                orderDate: new Date().toISOString()
            });

            await OrderItem.create({
                orderId: order.id,
                animalId: animal.id,
                price: animal.price
            });

            await animal.update({ status: 'terjual' });

            res.redirect('/orders');
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
                    { model: OrderItem, include: [{ model: Animal, include: Farm }] }
                ]
            });
            res.render('orders/orderDetail', { user: req.session.user, order, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async cancel(req, res) {
        try {
            const order = await Order.findByPk(req.params.id)
            await order.update({ status: 'cancelled' })
            res.redirect('/orders/' + req.params.id)
        } catch (err) {
            res.send(err.message)
        }
    }

    static async confirm(req, res) {
        try {
            const order = await Order.findByPk(req.params.id)
            await order.update({ status: 'confirmed' })
            res.redirect('/orders/' + req.params.id)
        } catch (err) {
            res.send(err.message)
        }
    }

    static async destroy(req, res) {
        try {
            await Order.destroy({ where: { id: req.params.id } })
            res.redirect('/orders')
        } catch (err) {
            res.send(err.message)
        }
    }
}

module.exports = OrderController;