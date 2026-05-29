const { Animal, Farm } = require('../models');

class AnimalController {
    static async catalog(req, res) {
        try {
            const animals = await Animal.findAll({ include: Farm });
            res.render('animals/animal', { user: req.session.user || null, animals, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async detail(req, res) {
        try {
            const animal = await Animal.findByPk(req.params.id, { include: Farm });
            if (!animal) return res.status(404).render('404', { title: 'Hewan Not Found', error: 'Hewan tidak ditemukan' });
            res.render('animals/animalDetail', { user: req.session.user || null, animal, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async showForm(req, res) {
        try {
            const farms = await Farm.findAll();
            res.render('animals/animalForm', { user: req.session.user || null, animal: null, farms, mode: 'add', errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async add(req, res) {
        try {
            const { name, type, weight, age, price, farmId } = req.body; // fix: tambah age
            await Animal.create({ name, type, weight, age, price, farmId });
            res.redirect('/animals');
        } catch (err) {
            const farms = await Farm.findAll();
            res.render('animals/animalForm', {
                user: req.session.user || null,
                animal: null,
                farms,
                mode: 'add',
                errors: err.errors || [{ message: err.message }]
            });
        }
    }
}

module.exports = AnimalController;
