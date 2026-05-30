const { User } = require('../models');
const bcrypt = require('bcryptjs');

class AuthController {
    static async showRegister(req, res) {
        res.render('auth/register', { user: null, errors: [] });
    }

    static async register(req, res) {
        try {
            const { email, password, role } = req.body;
            const hashed = bcrypt.hashSync(password, 10);
            const user = await User.create({ email, password: hashed, role });
            req.session.user = { id: user.id, email: user.email, role: user.role };
            res.redirect('/home');
        } catch (err) {
            res.render('auth/register', { 
                user: null, 
                errors: err.errors || [{ message: err.message }]
            });
        }
    }

    static async showLogin(req, res) {
        res.render('auth/login', { user: null, errors: [] });
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: {email} });
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = { id: user.id, email: user.email, role: user.role };
                res.redirect('/home');
            } else {
                res.render('auth/login', { user: null, errors: [{ message: 'Invalid email or password'}] });
            }
        } catch (err) {
            res.render('auth/login', { user: null, errors: [{ message: err.message }] });
        }
    }

    static async logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
}

module.exports = AuthController;