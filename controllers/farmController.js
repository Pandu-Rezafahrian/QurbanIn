const { Farm } = require('../models');

class FarmController {
    static async index(req, res) {
        try {
            const farms = await Farm.findAll({ where: { UserId: req.session.user.id } });
            res.render('farms/farm', { user: req.session.user, farms, errors: [] });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async showForm(req, res) {
        res.render('farms/form', { user: req.session.user, farm: null, mode: 'add', errors: [] });
    }

    static async add(req, res) {
        try {
            const { name, location } = req.body;
            const userId = req.session.user ? req.session.user.id : null;
            await Farm.create({ name, location, userId: userId });
            res.redirect('/farms');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async showEditForm(req, res) {
        try {
            const farm = await Farm.findByPk(req.params.id);
            res.render('farms/form', { user: req.session.user, farm, mode: 'edit', errors: [] });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async update(req, res) {
        try {
            const { name, location } = req.body;
            await Farm.update({ name, location }, { where: { id: req.params.id } });
            res.redirect('/farms');
        } catch (err) {
            const farm = await Farm.findByPk(req.params.id);
            res.render('farms/form', { user: req.session.user, farm, mode: 'edit', errors: [{ message: err.message }] });
        }
    }

    static async delete(req, res) {
        try {
            await Farm.destroy({ where: { id: req.params.id } });
            res.redirect('/farms');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = FarmController;