const { Farm } = require('../models');

class FarmController {
    static async index(req, res) {
        try {
            const farms = await Farm.findAll();
            res.render('farms/farm', { user: req.session.user || null, farms, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async showForm(req, res) {
        res.render('farms/farmForm', { user: req.session.user || null, farm: null, mode: 'add', errors: [] });
    }

    static async add(req, res) {
        try {
            const { name, location, description } = req.body;
            const userId = req.session.user ? req.session.user.id : null;
            await Farm.create({ name, location, description, userId }); // fix: userId bukan UserId
            res.redirect('/farms');
        } catch (err) {
            res.render('farms/farmForm', {
                user: req.session.user || null,
                farm: null,
                mode: 'add',
                errors: err.errors || [{ message: err.message }]
            });
        }
    }
}

module.exports = FarmController;
