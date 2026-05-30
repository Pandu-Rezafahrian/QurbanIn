const { and } = require('sequelize');
const { Op } = require('sequelize');
const { Animal, Farm } = require('../models');

class AnimalController {
    static async catalog(req, res) {
        try {
            const { search, type, sort } = req.query;
            let options = { include: Farm };
            if (search) {
                options.where = {
                ...options.where,
                name: { [Op.iLike]: `%${search}%` }
                };
            }
            if (type) {
                options.where = {
                ...options.where,
                type: type
                };
            }
            if (sort) {
                if (sort === 'price_asc') {
                options.order = [['price', 'ASC']];
                } else if (sort === 'price_desc') {
                options.order = [['price', 'DESC']];
                } else if (sort === 'weight_desc') {
                options.order = [['weight', 'DESC']];
                }
            }
            const animals = await Animal.findAll(options);
            res.render('animals/animal', {
                user: req.session.user || null,
                animals,
                search,
                type,
                sort,
                errors: []
            });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async detail(req, res) {
        try {
            const animal = await Animal.findByPk(req.params.id, { include: Farm });
            res.render('animals/animalDetail', { user: req.session.user, animal, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }
    
    static async showForm(req, res) {
        try {
            const farms = await Farm.findAll();
            res.render('animals/form', {
                user: req.session.user || null,
                animal: null,
                farms,
                mode: 'add',
                errors: []
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async add(req, res) {
        try {
            const { name, type, weight, price, age, farmId } = req.body;
            await Animal.create({ name, type, weight, price, age, farmId });
            res.redirect('/animals');
        } catch (err) {
            const farms = await Farm.findAll();
            res.render('animals/form', { user: req.session.user, animal: null, farms, mode: 'add', errors: [{ message: err.message }] });
        }
    }

    
    static async showEditForm(req, res) {
        try {
            const animal = await Animal.findByPk(req.params.id, { include: Farm });
            const farms = await Farm.findAll();
            res.render('animals/form', { user: req.session.user || null, animal, farms, mode: 'edit', errors: [] });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async update(req, res) {
        try {
            const { name, type, weight, price, age, farmId } = req.body;
            await Animal.update(
                { name, type, weight, price, age, farmId },
                { where: { id: req.params.id } }
            );
            res.redirect('/animals');
        } catch (err) {
            const animal = await Animal.findByPk(req.params.id, { include: Farm });
            const farms = await Farm.findAll();
            res.render('animals/form', { user: req.session.user || null, animal, farms, mode: 'edit', errors: [{ message: err.message }] });
        }
    }

    static async delete(req, res) {
        try {
            await Animal.destroy({ where: { id: req.params.id } });
            res.redirect('/animals');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = AnimalController;