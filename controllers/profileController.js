const { User, UserProfile } = require('../models');

class ProfileController {
    static async index(req, res) {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        try {
            const user = await User.findByPk(req.session.user.id, { include: UserProfile });
            res.render('profiles/profile', { user, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async update(req, res) {
        try {
            const { fullName, phone, address } = req.body
            const existing = await UserProfile.findOne({ where: { userId: req.session.user.id } })
            if (existing) {
                await existing.update({ fullName, phone, address })
            } else {
                await UserProfile.create({ fullName, phone, address, userId: req.session.user.id })
            }
            res.redirect('/profile')
        } catch (err) {
            res.send(err.message)
        }
    }
}

module.exports = ProfileController;